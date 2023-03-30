import { DataService } from "../services/data.service.js";
import { pathBuilder } from "../utils/utils.js";
import { v4 as uuid } from "uuid";
import bcrypt from "bcryptjs";
import { signupSchema } from "../middlewares/joi-validation-middleware.js";

class User {
  constructor(firstName, lastName, email, password) {
    this.id = uuid();
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }
}

const usersPath = pathBuilder(["..", "data", "users.json"]);

export class AuthModel {
  static async getAllUsers() {
    return DataService.readJSONFile(usersPath);
  }
  static async saveUsers(users) {
    await DataService.saveJSONFile(usersPath, users);
  }

  static async getUserById(userId) {
    const users = await this.getAllUsers();

    const foundUser = users.find((user) => user.id === userId);
    if (!foundUser) throw Error("User not found");
    return foundUser;
  }

  //   1. Register user
  static async registerUser(userData) {
    const users = await this.getAllUsers();

    const userExists = users.some((user) => user.email === userData.email);

    if (userExists) throw new Error("Email already exist");

    const validation = signupSchema.validate(userData);

    if (validation?.error) throw new Error(validation.error.details[0].message);

    const { firstName, lastName, email, password } = userData;

    const hashedPassword = await bcrypt.hash(password, 8);

    const newUser = new User(firstName, lastName, email, hashedPassword);

    const updatedUsers = [...users, newUser];

    await this.saveUsers(updatedUsers);

    const { password: userPassword, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }
  //2.Login user
  static async loginUser(credentials) {
    const { email, password } = credentials;
    const users = await this.getAllUsers();
    const foundUser = users.find((user) => user.email === email);

    if (!foundUser) throw new Error("Invalid credentials");
    const isPasswordValid = await bcrypt.compare(password, foundUser.password);

    if (!isPasswordValid) throw new Error("Invalid Credentials");

    const { password: userPassword, ...userWithoutPassword } = foundUser;

    return userWithoutPassword;
  }

  static async saveRefreshToken(userId, refreshToken) {
    const users = await this.getAllUsers();
    const updatedUsers = users.map((user) => {
      if (user.id === userId) {
        user.refreshToken = refreshToken;
        return user;
      }
      return user;
    });
    await this.saveUsers(updatedUsers);
  }
}
