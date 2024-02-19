const express = require("express");
const { contactValidator } = require("../../helpers");
const { validateBody, authenticate, isValidId } = require("../../middlewares");
const ctrl = require("../../controllers/contacts");
const router = express.Router();

router.get("/", authenticate, ctrl.getContacts);

router.get("/:contactId", authenticate, isValidId, ctrl.getContactById);

router.post(
  "/",
  authenticate,
  validateBody(contactValidator.postContactSchema),
  ctrl.add
);

router.delete("/:contactId", authenticate, isValidId, ctrl.deleteContact);

router.put(
  "/:contactId",
  authenticate,
  validateBody(contactValidator.putContactSchema),
  isValidId,
  ctrl.updateById
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  validateBody(contactValidator.patchContactSchema),
  isValidId,
  ctrl.updateFavorite
);

module.exports = router;
