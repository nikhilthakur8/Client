const { Router } = require("express");
const { handleGetProfile, handleSubscription } = require("../controllers/userController");

const userRouter = Router();

// userRouter.get("/auth/send")

userRouter.get("/profile",handleGetProfile);
userRouter.post("/subscribe",handleSubscription);



module.exports = userRouter;
