const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");
const Joi = require("joi");
const { RequestError } = require("../../helpers");
const router = express.Router();
const contactsSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});
router.get("/", async (req, res, next) => {
  try {
    res.json({
      code: 200,
      message: await listContacts(),
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await getContactById(contactId);
    if (!result) {
      throw RequestError(404, "Not Found");
    }
    res.json({ code: 200, message: result });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      throw RequestError(400, 'missing required name field');
    }
    const contact = await addContact(req.body);
    res.status(201).json({
      data: { contact },
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await removeContact(contactId);
    if (!result) {
      throw RequestError(404, "Not Found");
    }
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      throw RequestError(400, 'missing fields');
    }
    const { contactId } = req.params;
    const result = await updateContact(contactId, { ...req.body });
    if (!result) {
      throw RequestError(404, "Not Found");
    }
    res.status(200).json({ message: result });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
