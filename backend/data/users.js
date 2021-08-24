import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
const users = [
  {
    id: "0",
    name: "Admin",
    email: "ahihi@test.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },

  {
    id: uuidv4(),
    name: "John Doe",
    email: "ahihi1@test.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },

  {
    id: uuidv4(),
    name: "Jim Doe",
    email: "ahihi2@test.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },
];

const matchPassword = async (enteredPassword, dbPassword) => {
  return await bcrypt.compare(enteredPassword, dbPassword);
};

const findUserByEmail = (email) => {
  return users.find((u) => u.email === email);
};

const findUserById = (id) => {
  return users.find((u) => u.id === id);
};

const createNewUser = (data) => {
  users.push(data);
  return data;
};

export default users;
export { createNewUser, findUserByEmail, matchPassword, findUserById };
