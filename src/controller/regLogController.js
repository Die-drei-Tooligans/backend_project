import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import { verifyPassword } from "../utils/auth/verifyPassword.js";

const SECRET_KEY = process.env.SECRET_KEY;

export const login = async (req, res, next) => {

};


export const createUser = async (req, res, next) => {

};
