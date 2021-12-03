import mongoose from "mongoose";
import request from "supertest";
import runServer from "../../index.js";
import { ROLES } from "../../constants/roles.js";
import User from "../../models/user.js";
import Role from "../../models/role.js";
import Product from "../../models/product.js";

describe("/api/products", () => {
  let server;
  let sellerToken;
  let buyerToken;
  let seller;
  let body;
  const invalidToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2Mzg1Mzc1OTEsImV4cCI6MTYzODYyMzk5MX0.NeSaXXlrmqOq7RzeT7tX-DYfSBibgT3icM3SsLrPfG4";

  beforeEach(async () => {
    server = runServer();

    const sellerRole = new Role({ name: ROLES.SELLER });
    const buyerRole = new Role({ name: ROLES.BUYER });

    let token = new User({ role: buyerRole }).generateAuthToken();
    buyerToken = `Bearer ${token}`;

    seller = new User({
      username: "testUers",
      password: "testPass",
      deposit: 20,
      role: sellerRole,
    });

    await seller.save();

    token = seller.generateAuthToken();
    sellerToken = `Bearer ${token}`;

    body = {
      productName: "product1",
      cost: 10,
      amountAvailable: 2,
      seller: seller._id.toString(),
    };
  });

  afterEach(async () => {
    await server.close();
    await User.deleteMany({});
    await Product.deleteMany({});
  });

  describe("GET /", () => {
    it("should return all products", async () => {
      const products = [
        { productName: "product1", cost: 10, seller: seller._id.toString() },
        { productName: "product2", cost: 20, seller: seller._id.toString() },
      ];

      await Product.collection.insertMany(products);

      const res = await request(server).get("/api/products");

      expect(res.status).toBe(200);
      expect(res.body.totalDocs).toEqual(2);
      expect(
        res.body.docs.some((g) => g.productName === "product1")
      ).toBeTruthy();
      expect(
        res.body.docs.some((g) => g.productName === "product2")
      ).toBeTruthy();
    });
  });

  describe("GET /:id", () => {
    it("should return a product if a valid id is passed", async () => {
      const product = await Product.create({
        productName: "product1",
        cost: 10,
        seller: seller._id.toString(),
      });

      const res = await request(server).get(
        `/api/products/${product._id.toString()}`
      );

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("productName", product.productName);
    });

    it("should return 404 if invalid id is passed", async () => {
      const res = await request(server).get("/api/products/1");

      expect(res.status).toBe(404);
    });

    it("should return 404 if no product with the given id exists", async () => {
      const id = mongoose.Types.ObjectId();
      const res = await request(server).get(`/api/products/${id}`);

      expect(res.status).toBe(404);
    });
  });

  describe("POST /", () => {
    const exec = async (token) => {
      return await request(server)
        .post("/api/products")
        .set("Authorization", token)
        .send(body);
    };

    it("should return 401 if client is not logged in", async () => {
      const res = await exec("");

      expect(res.status).toBe(401);
    });

    it("should return 401 if auth token is not valid", async () => {
      const res = await exec(invalidToken);
      expect(res.status).toBe(401);
    });

    it("should return 403 if auth user is not a Seller", async () => {
      const res = await exec(buyerToken);
      expect(res.status).toBe(403);
    });

    it("should return 400 if requset body is not valid", async () => {
      body = {};
      const res = await exec(sellerToken);

      expect(res.status).toBe(400);
    });

    it("should save the product if it is valid", async () => {
      await exec(sellerToken);

      const product = await Product.find({ productName: "product1" });

      expect(product).not.toBeNull();
    });

    it("should return the product if it is valid", async () => {
      const res = await exec(sellerToken);
      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("productName", "product1");
    });
  });

  describe("PUT /", () => {
    let product;

    beforeEach(async () => {
      product = await Product.create(body);
    });

    afterEach(async () => {
      Product.deleteMany({});
    });

    let updatebody = {
      productName: "product2",
      cost: 10,
      amountAvailable: 2,
    };

    const exec = async (token, id, body = updatebody) => {
      return await request(server)
        .put(`/api/products/${id}`)
        .set("Authorization", token)
        .send(body);
    };

    it("should return 401 if client is not logged in", async () => {
      const res = await exec("");

      expect(res.status).toBe(401);
    });

    it("should return 401 if auth token is not valid", async () => {
      const res = await exec(invalidToken);
      expect(res.status).toBe(401);
    });

    it("should return 403 if auth user is not a Seller", async () => {
      const res = await exec(buyerToken);
      expect(res.status).toBe(403);
    });

    it("should return 404 if id is invalid", async () => {
      const res = await exec(sellerToken, 1);
      expect(res.status).toBe(404);
    });

    it("should return 400 if requset body is not valid", async () => {
      const res = await exec(sellerToken, product._id.toString(), {});

      expect(res.status).toBe(400);
    });

    it("should update the product if it is valid", async () => {
      await exec(sellerToken, product._id.toString());
      const updatedProduct = await Product.find({ productName: "product2" });

      expect(updatedProduct).not.toBeNull();
    });

    it("should return the product if it is valid", async () => {
      const res = await exec(sellerToken, product._id.toString());

      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("productName", "product2");
    });
  });

  describe("DELETE /", () => {
    let product;

    beforeEach(async () => {
      product = await Product.create(body);
    });

    afterEach(async () => {
      Product.deleteMany({});
    });

    const exec = async (token, id) => {
      return await request(server)
        .delete(`/api/products/${id}`)
        .set("Authorization", token)
        .send();
    };

    it("should return 401 if client is not logged in", async () => {
      const res = await exec("");

      expect(res.status).toBe(401);
    });

    it("should return 401 if auth token is not valid", async () => {
      const res = await exec(invalidToken);
      expect(res.status).toBe(401);
    });

    it("should return 403 if auth user is not a Seller", async () => {
      const res = await exec(buyerToken);
      expect(res.status).toBe(403);
    });

    it("should return 404 if id is invalid", async () => {
      const res = await exec(sellerToken, 1);
      expect(res.status).toBe(404);
    });

    it("should delete the product if it is valid", async () => {
      await exec(sellerToken, product._id.toString());
      const deletedProduct = await Product.findById(product._id);

      expect(deletedProduct).toBeNull();
    });

    it("should return the product if it is valid", async () => {
      const res = await exec(sellerToken, product._id.toString());
      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("productName", "product1");
    });
  });
});
