import { Request, Response } from "express";
import userModel from "../model/userModel";
import blogModel from "../model/blogModel";
import { Types } from "mongoose";
import { stream } from "../utils/stream";

export const createBlog = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const { title, content, category } = req.body;
    const user = await userModel.findById(userID);

    const { secure_url, public_id }: any = await stream(req);

    if (user) {
      const blog = await blogModel.create({
        title,
        content,
        category,
        authorName: user.fullName,
        displayImage: secure_url,
        displayImageID: public_id,
      });
      user?.blog.push(new Types.ObjectId(blog._id));
      return res.status(201).json({
        message: "creating blog",
        data: blog,
        status: 201,
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Error creating blog",
      status: 404,
    });
  }
};
export const findAllBlog = async (req: Request, res: Response) => {
  try {
    const user = await userModel.find();
    return res.status(200).json({
      message: "viewing all blog",
      data: user,
      status: 201,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error viewing blog",
      status: 404,
    });
  }
};
export const viewOneUserBlog = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const blog = await userModel.findById(userID).populate({
      path: "blogs",
      options: {
        sort: {
          createdAt: -1,
        },
      },
    });
    return res.status(200).json({
      message: "viewing user blog blog",
      data: blog,
      status: 200,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error viewing user blog",
      status: 404,
    });
  }
};
