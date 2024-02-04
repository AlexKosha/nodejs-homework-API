const express = require("express");
const { validateBody, authenticate } = require("../../middlewares");
const ctrl = require("../../controllers/auth");

const { schemas } = require("../../models/user");

const router = express.Router();

router.post("/register", validateBody(schemas.reqisterSchema), ctrl.reqister);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch(
  "/",
  validateBody(schemas.subscriptionSchema),
  authenticate,
  ctrl.updateSubscription
);
module.exports = router;
