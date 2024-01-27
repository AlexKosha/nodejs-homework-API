const { Schema, model } = require("mongoose");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);

const Contacts = model("contacts", contactSchema, "contacts");

const listContacts = () => Contacts.find();

const getContactById = (contactId) => Contacts.findById(contactId);

const removeContact = (contactId) => Contacts.findByIdAndDelete(contactId);

const addContact = (body) => Contacts.create(body);

const updateContact = (contactId, body) =>
  Contacts.findByIdAndUpdate(contactId, body, { new: true });

const updateStatusContact = (contactId, { favorite }) =>
  Contacts.findByIdAndUpdate(contactId, { $set: { favorite } }, { new: true });

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
