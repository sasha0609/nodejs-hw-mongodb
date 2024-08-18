import { ContactsCollection } from '../models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({ page, perPage, sortBy, sortOrder }) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const [contacts, count] = await Promise.all([
    ContactsCollection.find()
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit)
      .exec(),
    ContactsCollection.countDocuments(),
  ]);

  const paginationData = calculatePaginationData(count, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};
export const getContactById = async (contactId) => {
  const contacts = await ContactsCollection.findById(contactId);
  return contacts;
};

export const createContact = async (payload) => {
  const contact = await ContactsCollection.create(payload);
  return contact;
};

export const updateContact = async (contactId, payload, options = {}) => {
  const rawResult = await ContactsCollection.findByIdAndUpdate(
    contactId,
    payload,
    {
      new: true,
      ...options,
    },
  );
  if (!rawResult) return null;
  return {
    contact: rawResult,
    isNew: false,
  };
};

export const deleteContact = async (contactId) => {
  const contact = await ContactsCollection.findOneAndDelete({ _id: contactId });
  return contact;
};
