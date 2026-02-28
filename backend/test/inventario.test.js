const request = require("supertest");
const express = require("express");
const cookieParser = require("cookie-parser");

const route = require("../routes/api/inventario");
const InventarioModel = require("../models/InventarioModel");
const jwt = require("jsonwebtoken");


jest.mock("../models/InventarioModel");
jest.mock("jsonwebtoken");

// Mock del middleware
jest.mock("../middleware/checkRole.js", () => ({
  checkRoleInventory: (req, res, next) => next()
}));

describe("GET /api/inventario", () => {

  let app;

  beforeEach(() => {
    app = express();
    app.use(cookieParser());
    app.use(route);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Debe devolver toda la lista de productos", async () => {

    jwt.decode.mockReturnValue({ enterprise: "empresa1" });

    InventarioModel.findOne.mockResolvedValue({
      product_list: [
        { name: "Martillo" },
        { name: "Taladro" }
      ]
    });

    const res = await request(app)
      .get("/api/inventario")
      .set("Cookie", ["token=fakeToken"]);

    expect(res.statusCode).toBe(200);
    expect(res.body.product_list.length).toBe(2);
    expect(res.body.product_list[0].name).toBe("Martillo");
  });

  test("Debe filtrar productos por nombre", async () => {

    jwt.decode.mockReturnValue({ enterprise: "empresa1" });

    InventarioModel.findOne.mockResolvedValue({
      product_list: [
        { name: "Martillo" },
        { name: "Taladro" }
      ]
    });

    const res = await request(app)
      .get("/api/inventario?name=mart")
      .set("Cookie", ["token=fakeToken"]);

    expect(res.statusCode).toBe(200);
    expect(res.body.product_list.length).toBe(1);
    expect(res.body.product_list[0].name).toBe("Martillo");
  });

});

//Nota: la neta apenas estoy aprendiendo a usar esto, asi que no me pregunte 
// de esto porque o se me olvida pq es la primera vez usando o me muero de pensar