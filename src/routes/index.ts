import express from "express";

import { jwtMiddleware } from "../middleware/auth";
import * as tradeRouter from "./trade";
import * as authRouter from "./auth";

const router = express.Router();

// login
router.get("/auth", authRouter.generateToken);
router.post("/auth/register", authRouter.register);
router.post("/auth/login", authRouter.login);

// trade
router.post("/massive/load", jwtMiddleware, tradeRouter.updateCSV, tradeRouter.readTrade);
router.get("/estate/filter", jwtMiddleware, tradeRouter.filterPriceMinAndMax);
router.get("/estate/filter/priceAverage", jwtMiddleware, tradeRouter.filterPriceAverage);
router.get("/estate/filter/map", jwtMiddleware, tradeRouter.filterLocation);

export default router;