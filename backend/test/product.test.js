const request = require("supertest");
const express = require("express");
const cookieParser = require("cookie-parser");

const route = require("../routes/api/product"); // AJUSTA
const { getInventario } = require("../utils/getInventario");
const { getDecodedJwt } = require("../utils/getDecodedJwt");
const InventarioModel = require("../models/InventarioModel");

jest.mock("../utils/getInventario");
jest.mock("../utils/getDecodedJwt");
jest.mock("../models/InventarioModel");
jest.mock("../middleware/checkRole.js", () => ({
  checkRoleInventory: (req, res, next) => next()
}));

describe("CRUD /api/product", () => {

  let app;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use(cookieParser());
    app.use(route);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("GET debe devolver producto por id", async () => {

    getInventario.mockResolvedValue({
      product_list: [
        { id: "1", name: "Martillo" },
        { id: "2", name: "Taladro" }
      ]
    });

    const res = await request(app)
      .get("/api/product/1")
      .set("Cookie", ["token=fakeToken"]);

    expect(res.statusCode).toBe(200);
    expect(res.body[0].name).toBe("Martillo");
  });

  test("GET debe manejar error", async () => {

    getInventario.mockRejectedValue(new Error("DB error"));

    const res = await request(app)
      .get("/api/product/1")
      .set("Cookie", ["token=fakeToken"]);

    expect(res.statusCode).toBe(400);
  });


  test("POST debe agregar producto", async () => {

    getDecodedJwt.mockReturnValue({ enterprise: "empresa1" });
    InventarioModel.findOneAndUpdate.mockResolvedValue({});

    const res = await request(app)
      .post("/api/product")
      .set("Cookie", ["token=fakeToken"])
      .send({
        name: "Sierra",
        description: "Corta madera",
        quantity: 5,
        price: 200,
        img_url: "url",
        unite_price: 40
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Se agregó el producto");
  });

  test("POST debe manejar error", async () => {

    getDecodedJwt.mockReturnValue({ enterprise: "empresa1" });
    InventarioModel.findOneAndUpdate.mockRejectedValue(new Error("DB error"));

    const res = await request(app)
      .post("/api/product")
      .set("Cookie", ["token=fakeToken"])
      .send({ name: "Sierra" });

    expect(res.statusCode).toBe(400);
  });

  test("PUT debe modificar producto", async () => {

    const mockDoc = {
      product_list: [
        { id: "1", name: "Martillo", quantity: 5 }
      ],
      save: jest.fn().mockResolvedValue(true)
    };

    getInventario.mockResolvedValue(mockDoc);

    const res = await request(app)
      .put("/api/product/1")
      .set("Cookie", ["token=fakeToken"])
      .send({ quantity: 10 });

    expect(res.statusCode).toBe(200);
    expect(mockDoc.save).toHaveBeenCalled();
  });

  test("PUT debe manejar error", async () => {

    getInventario.mockRejectedValue(new Error("DB error"));

    const res = await request(app)
      .put("/api/product/1")
      .set("Cookie", ["token=fakeToken"])
      .send({ quantity: 10 });

    expect(res.statusCode).toBe(400);
  });

  test("DELETE debe eliminar producto", async () => {

    const mockDoc = {
      product_list: [
        { id: "1", name: "Martillo" },
        { id: "2", name: "Taladro" }
      ],
      save: jest.fn().mockResolvedValue(true)
    };

    getInventario.mockResolvedValue(mockDoc);

    const res = await request(app)
      .delete("/api/product/1")
      .set("Cookie", ["token=fakeToken"]);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Se borro el producto");
    expect(mockDoc.save).toHaveBeenCalled();
  });

  test("DELETE debe manejar error", async () => {

    getInventario.mockRejectedValue(new Error("DB error"));

    const res = await request(app)
      .delete("/api/product/1")
      .set("Cookie", ["token=fakeToken"]);

    expect(res.statusCode).toBe(400);
  });

});