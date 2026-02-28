const request = require("supertest");
const express = require("express");
const cookieParser = require("cookie-parser");

const route = require("../routes/api/pedidos"); // AJUSTA
const PedidosModel = require("../models/PedidosModel");
const { getDecodedJwt } = require("../utils/getDecodedJwt");

// 🔥 Mocks
jest.mock("../models/PedidosModel");
jest.mock("../utils/getDecodedJwt");
jest.mock("../middleware/checkRole.js", () => ({
  checkRoleVentas: (req, res, next) => next()
}));

describe("Rutas /api/pedidos", () => {

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

  test("GET debe devolver lista de pedidos", async () => {

    getDecodedJwt.mockReturnValue({ enterprise: "empresa1" });

    PedidosModel.find.mockResolvedValue([
      {
        lista_pedidos: [
          { list_compra: [{ producto: "Martillo" }] }
        ]
      }
    ]);

    const res = await request(app)
      .get("/api/pedidos")
      .set("Cookie", ["token=fakeToken"]);

    expect(res.statusCode).toBe(200);
    expect(res.body.lista_pedidos.length).toBe(1);
  });

  test("GET debe manejar error", async () => {

    getDecodedJwt.mockReturnValue({ enterprise: "empresa1" });

    PedidosModel.find.mockRejectedValue(new Error("DB error"));

    const res = await request(app)
      .get("/api/pedidos")
      .set("Cookie", ["token=fakeToken"]);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Mal error");
  });

  // =========================
  // POST
  // =========================

  test("POST debe crear pedido correctamente", async () => {

    getDecodedJwt.mockReturnValue({ enterprise: "empresa1" });

    PedidosModel.findOneAndUpdate.mockResolvedValue({});

    const res = await request(app)
      .post("/api/pedidos")
      .set("Cookie", ["token=fakeToken"])
      .send({
        pedido: [
          { producto: "Taladro", cantidad: 2 }
        ]
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Se agrego la compra");
  });

  test("POST debe validar pedido vacío", async () => {

    getDecodedJwt.mockReturnValue({ enterprise: "empresa1" });

    const res = await request(app)
      .post("/api/pedidos")
      .set("Cookie", ["token=fakeToken"])
      .send({
        pedido: []
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Faltan datos");
  });

  test("POST debe manejar error de base de datos", async () => {

    getDecodedJwt.mockReturnValue({ enterprise: "empresa1" });

    PedidosModel.findOneAndUpdate.mockRejectedValue(new Error("DB error"));

    const res = await request(app)
      .post("/api/pedidos")
      .set("Cookie", ["token=fakeToken"])
      .send({
        pedido: [{ producto: "Martillo" }]
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Algo salió mal");
  });

});