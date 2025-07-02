const { Router } = require("express");
const { handleKycStart, handleKycCallback } = require("../controllers/kycController");
const kycRouter = Router();

kycRouter.get("/start", handleKycStart);
kycRouter.post("/callback/:authCode", handleKycCallback);

module.exports = kycRouter;
