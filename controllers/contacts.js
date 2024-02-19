const { ctrlWrapper, HttpError } = require("../helpers");
const Contacts = require("../models/contacts");

const getContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const data = await Contacts.find({ owner });
  res.status(200).json(data);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;

  const contact = await Contacts.findById(contactId);

  if (!contact) {
    throw HttpError(404);
  }

  res.status(200).json(contact);
};

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const newContact = await Contacts.create({ ...req.body, owner });
  return res.status(201).json(newContact);
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;

  const removedContact = await Contacts.findByIdAndDelete(contactId);
  if (!removedContact) {
    throw HttpError(404);
  }

  res.status(200).json({
    message: "contact deleted",
  });
};

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const { body } = req;

  if (!body || Object.keys(body).length === 0) {
    throw HttpError(400, "missing field");
  }

  const updatedContact = await Contacts.findByIdAndUpdate(contactId, body, {
    new: true,
  });

  if (!updatedContact) {
    throw HttpError(404);
  }

  res.status(200).json(updatedContact);
};

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  const updateStatus = await Contacts.findByIdAndUpdate(
    contactId,
    { $set: { favorite } },
    { new: true }
  );

  if (!updateStatus) {
    throw HttpError(404);
  }

  res.status(200).json(updateStatus);
};

module.exports = {
  getContacts: ctrlWrapper(getContacts),
  getContactById: ctrlWrapper(getContactById),
  add: ctrlWrapper(add),
  deleteContact: ctrlWrapper(deleteContact),
  updateById: ctrlWrapper(updateById),
  updateFavorite: ctrlWrapper(updateFavorite),
};
