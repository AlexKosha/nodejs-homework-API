const { ctrlWrapper, HttpError } = require("../helpers");
const Contacts = require("../models/contacts");

const getContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;

  const filter = favorite ? { owner, favorite } : { owner };

  const data = await Contacts.find(filter, "", { skip, limit });
  res.status(200).json(data);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;

  const contact = await Contacts.findOne({ _id: contactId, owner });

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
  const { _id: owner } = req.user;

  const removedContact = await Contacts.findOneAndDelete({
    _id: contactId,
    owner,
  });
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
  const { _id: owner } = req.user;

  if (!body || Object.keys(body).length === 0) {
    throw HttpError(400, "missing field");
  }

  const updatedContact = await Contacts.findOneAndUpdate(
    { _id: contactId, owner },
    body,
    {
      new: true,
    }
  );

  if (!updatedContact) {
    throw HttpError(404);
  }

  res.status(200).json(updatedContact);
};

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const { _id: owner } = req.user;

  const updateStatus = await Contacts.findOneAndUpdate(
    { _id: contactId, owner },
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
