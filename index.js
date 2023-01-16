const { Command } = require("commander");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");
require("colors");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      try {
        const list = await listContacts();

        console.table(list);
      } catch (error) {
        console.log(error.message);
      }
      break;

    case "get":
      try {
        const contactById = await getContactById(id);

        console.log(`Contact with id:${id} was successfully`.bgGreen);
        console.table(contactById);
      } catch (error) {
        console.log(error.message);
      }
      break;

    case "add":
      try {
        const newContact = await addContact(name, email, phone);

        console.log("The contact was successfully".bgGreen);
        console.table(newContact);
      } catch (error) {
        console.log(error.message);
      }
      break;

    case "remove":
      try {
        const removeByID = await removeContact(id);

        console.log(" Success! You deleted this contact. ".bgGreen);
        console.table(removeByID);
      } catch (error) {
        console.log(error.message);
      }
      break;

    default:
      console.warn("❌", "\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
