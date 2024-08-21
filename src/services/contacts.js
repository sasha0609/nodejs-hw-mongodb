import { ContactsCollection } from '../models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({
  page,
  perPage,
  sortBy,
  sortOrder,
  userId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  ContactsCollection.find().where('userId').equals(userId);

  const [contacts, count] = await Promise.all([
    ContactsCollection.find({ userId })
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit)
      .exec(),
    ContactsCollection.countDocuments({ userId }),
  ]);

  const paginationData = calculatePaginationData(count, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};
export const getContactById = async (contactId, userId) => {
  const contacts = await ContactsCollection.findOne({
    _id: contactId,
    userId,
  });
  return contacts;
};

export const createContact = async (payload) => {
  const contact = await ContactsCollection.create({
    ...payload,
    userId: payload.userId,
  });
  return contact;
};

export const updateContact = async (
  contactId,
  userId,
  payload,
  options = {},
) => {
  const rawResult = await ContactsCollection.findOneAndUpdate(
    { _id: contactId, userId },
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

export const deleteContact = async (contactId, userId) => {
  const contact = await ContactsCollection.findOneAndDelete({
    _id: contactId,
    userId,
  });
  return contact;
};
