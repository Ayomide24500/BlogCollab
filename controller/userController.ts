import { Request, Response } from "express";
import userModel from "../model/userModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const token = crypto.randomBytes(3).toString("hex");
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    const user = await userModel.create({
      email,
      token,
      password: hashed,
    });
    return res.status(201).json({
      message: "error creating user",
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      message: "error creating user",
    });
  }
};

export const verifiedUser = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;

    const user = await userModel.findById(userID);

    if (user) {
      const updatedUser = await userModel.findByIdAndUpdate(
        userID,
        {
          verify: true,
        },
        { new: true }
      );
      return res.status(200).json({
        message: "verifying user",
        data: updatedUser,
      });
    } else {
      return res.status(404).json({
        message: "Something went wrong",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Error creating user",
    });
  }
};

export const signUser = async (req: any, res: Response) => {
  try {
    const { email, token } = req.body;

    const getUser = await userModel.findOne({ email });

    if (getUser) {
      if (getUser.token === token) {
        if (getUser.verify) {
          const encrypt = jwt.sign(
            { id: getUser._id },
            process.env.JWT_SECRET!,
            {
              expiresIn: "1d",
            }
          );

          // req.session.isAuth = true;
          // req.session.userID = getUser._id;

          return res.status(200).json({
            message: "welcome back",
            data: encrypt,
          });
        } else {
          return res.status(404).json({
            message: "Account has not yet been verified",
          });
        }
      } else {
        return res.status(404).json({
          message: "Error reading token",
        });
      }
    } else {
      return res.status(404).json({
        message: "Error reading user",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Error creating user",
    });
  }
};

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const user = await userModel.find();
    return res.status(404).json({
      message: "error creating user",
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      message: "error creating user",
    });
  }
};
export const getOneUser = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;

    const user = await userModel.findById(userID);
    let count: number = 0;
    const countValue = {
      email: user?.email,
      fullName: user?.fullName,
      address: user?.address,
      phone: user?.phone,
      avatar: user?.avatar,
    };

    const myValue = Object.keys(countValue);

    for (let i of myValue) {
      if (i !== undefined) {
        count++;
        console.log(i);
      }
    }
    console.log();
    return res.status(404).json({
      message: "error creating user",
      count: 5,
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      message: "error creating user",
    });
  }
};
