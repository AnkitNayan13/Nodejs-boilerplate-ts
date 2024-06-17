import User from "../schemas/userSchema";
import bcrypt from "bcryptjs";
import { UserType } from "./types";
import jwt from "jsonwebtoken";

/**
 *
 * @param userName - The username of the user.
 * @returns boolean - True if username is unique, false otherwise.
 */
export const uniqueUserName = async (userName: string) => {
    const user = await User.findOne({ userName });
    if (user) return false;
    return true;
};

/**
 *
 * @param email - The email of the user.
 * @returns boolean - True if email is unique, false otherwise.
 */
export const checkEmail = async (email: string) => {
    const user = await User.findOne({ email });
    if (user) return false;
    return true;
};

/**
 *
 * @param email - The email of the user.
 * @returns User
 */
export const getUserByEmail = async (email: string) => {
    const user: UserType | null = await User.findOne({ email });
    return user;
};

/**
 *
 * @param password - The password of the user.
 * @returns hashedPassword - The hashed password of the user.
 */
export const hashedPassword = async (password: string) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
};

/**
 *
 * @param password - The password entered by the user.
 * @param hashedPassword - Hasehd password of the user.
 * @returns boolean - True if passwords match, false otherwise.
 */
export const matchPassword = async (password: string, hashedPassword: string) => {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    if (!isMatch) return false;
    return true;
};

export const generateJWTToken = (userId: string) => {
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) return null;

    const token = jwt.sign(
        {
            userId: userId,
        },
        JWT_SECRET,
        {
            expiresIn: "7d",
            algorithm: "HS256",
        }
    );

    return token;
};
