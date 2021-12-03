import request from "supertest";
import runServer from "../../index.js";
import { ROLES } from "../../constants/roles.js";
import User from "../../models/user.js";
import Role from "../../models/role.js";

describe("/api/users/deposit", () => {
  let server;
  let sellerToken;
  let buyerToken;
  let buyer;
  let body;

  const exec = (token) => {
    return request(server)
      .patch("/api/users/deposit")
      .set("Authorization", token)
      .send(body);
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

    body = {
      deposit: 10,
    };
  });

  afterEach(async () => {
    await server.close();
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
    body = {};
    const res = await exec(buyerToken);
    expect(res.status).toBe(400);
  });

  it("should return 200 if requset is valid", async () => {
    const res = await exec(buyerToken);
    expect(res.status).toBe(200);
  });

  it("should increment User deposit with the input value", async () => {
    await exec(buyerToken);

    const updatedUser = await User.findById(buyer._id);
    const expectedDeposit = buyer.deposit + body.deposit;

    expect(updatedUser.deposit).toEqual(expectedDeposit);
  });

  it("should return new deposit value after request completed", async () => {
    const res = await exec(buyerToken);

    expect(Object.keys(res.body)).toEqual(expect.arrayContaining(["deposit"]));
  });
});
