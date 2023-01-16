const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");
require("colors");

const contactsPath = path.resolve(__dirname, "./db/contacts.json");

async function readFile() {
  const contactsRaw = await fs.readFile(contactsPath);
  const contacts = JSON.parse(contactsRaw);
  return contacts;
}

async function writeFile(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

async function listContacts() {
  return await readFile();
}

async function getContactById(contactId) {
  const contacts = await readFile();
  const contact = contacts.find((contact) => contact.id === contactId);

  if (!contact) {
    throw new Error(`Contact with id:${contactId} not found`.bgRed);
  }

  return contact;
}

async function removeContact(contactId) {
  const contacts = await readFile();
  const updateContact = contacts.filter((contact) => contact.id !== contactId);
  await writeFile(updateContact);
}

async function addContact(name, email, phone) {
  const id = nanoid();
  const contact = { id, name, email, phone };

  const contacts = await readFile();
  contacts.push(contact);

  await writeFile(contacts);
  return contact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
