import request from "supertest";
import runServer from "../../index.js";
import { ROLES } from "../../constants/roles.js";
import User from "../../models/user.js";
import Role from "../../models/role.js";
import Product from "../../models/product.js";

describe("/api/buy", () => {
  let server;
  let sellerToken;
  let buyerToken;
  let buyer;
  let product;
  let checkout;

  const exec = (token) => {
    return request(server)
      .post("/api/buy")
      .set("Authorization", token)
      .send(checkout);
  };

  beforeEach(async () => {
    server = runServer();

    const sellerRole = new Role({ name: ROLES.SELLER });
    const buyerRole = new Role({ name: ROLES.BUYER });

    let token = new User({ role: sellerRole }).generateAuthToken();
    sellerToken = `Bearer ${token}`;

    buyer = new User({
      username: "testUers",
      password: "testPass",
      deposit: 20,
      role: buyerRole,
    });

    await buyer.save();

    token = buyer.generateAuthToken();
    buyerToken = `Bearer ${token}`;

    product = await Product.create({
      productName: "product",
      cost: 10,
      amountAvailable: 1,
      seller: sellerRole._id,
    });

    checkout = {
      products: [
        {
          productId: product._id.toString(),
          amount: 1,
        },
      ],
      totalCost: 10,
    };
  });

  afterEach(async () => {
    await server.close();
    await Product.deleteMany({});
    await User.deleteMany({});
  });

  it("should return 401 if client is not logged in", async () => {
    const res = await exec("");

    expect(res.status).toBe(401);
  });

  it("should return 401 if auth token is not valid", async () => {
    const res = await exec("");
    expect(res.status).toBe(401);
  });

  it("should return 403 if auth user is not Buyer", async () => {
    const res = await exec(sellerToken);
    expect(res.status).toBe(403);
  });

  it("should return 400 if requset body is not valid", async () => {
    checkout = {};
    const res = await exec(buyerToken);
    expect(res.status).toBe(400);
  });

  it("should return 400 if any of product doesn't exist in DB", async () => {
    checkout.products[0].productId = "61a64c4db7290c02dd4c5d2e";
    const res = await exec(buyerToken);
    expect(res.status).toBe(400);
  });

  it("should return 400 if any of product is out stock", async () => {
    product.amountAvailable = 0;
    await product.save();
    const res = await exec(buyerToken);
    expect(res.status).toBe(400);
  });

  it("should return 400 if required amount is bigger than stock", async () => {
    checkout.products[0].amount = 10;
    const res = await exec(buyerToken);
    expect(res.status).toBe(400);
  });

  it("should return 400 if total cost of products has changed meanwhile", async () => {
    product.cost = 5;
    await product.save();
    const res = await exec(buyerToken);
    expect(res.status).toBe(400);
  });

  it("should return 400 if total cost of products exceeds client budget", async () => {
    buyer.deposit = 5;
    await buyer.save();
    const res = await exec(buyerToken);
    expect(res.status).toBe(400);
  });

  it("should return 200 if requset is valid", async () => {
    const res = await exec(buyerToken);
    expect(res.status).toBe(200);
  });

  it("should decrement the product amountAvailable with the amount ordered", async () => {
    await exec(buyerToken);

    const updatedProduct = await Product.findById(product._id);
    const expectedAmount =
      product.amountAvailable - checkout.products[0].amount;

    expect(updatedProduct.amountAvailable).toEqual(expectedAmount);
  });

  it("should reset User deposit to zero after checkout completed", async () => {
    await exec(buyerToken);

    const updatedUser = await User.findById(buyer._id);

    expect(updatedUser.deposit).toEqual(0);
  });

  it("should return `amountSpent`, `products` and `change` after checkout completed", async () => {
    const res = await exec(buyerToken);

    expect(Object.keys(res.body)).toEqual(
      expect.arrayContaining(["amountSpent", "products", "change"])
    );
  });
});
