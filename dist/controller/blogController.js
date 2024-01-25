"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBlog = exports.updateBlogInfo = exports.viewOneUserBlog = exports.findAllBlog = exports.createBlog = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const blogModel_1 = __importDefault(require("../model/blogModel"));
const mongoose_1 = require("mongoose");
const stream_1 = require("../utils/stream");
const createBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const { title, content, category } = req.body;
        const user = yield userModel_1.default.findById(userID);
        const { secure_url, public_id } = yield (0, stream_1.stream)(req);
        if (user) {
            const blog = yield blogModel_1.default.create({
                title,
                content,
                category,
                authorName: user.fullName,
                displayImage: secure_url,
                displayImageID: public_id,
            });
            user === null || user === void 0 ? void 0 : user.blog.push(new mongoose_1.Types.ObjectId(blog._id));
            return res.status(201).json({
                message: "creating blog",
                data: blog,
                status: 201,
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: "Error creating blog",
            status: 404,
        });
    }
});
exports.createBlog = createBlog;
const findAllBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.default.find();
        return res.status(200).json({
            message: "viewing all blog",
            data: user,
            status: 201,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error viewing blog",
            status: 404,
        });
    }
});
exports.findAllBlog = findAllBlog;
const viewOneUserBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const blog = yield userModel_1.default.findById(userID).populate({
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
    }
    catch (error) {
        return res.status(404).json({
            message: "Error viewing user blog",
            status: 404,
        });
    }
});
exports.viewOneUserBlog = viewOneUserBlog;
const updateBlogInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID, blogID } = req.params;
        const user = yield userModel_1.default.findById(userID);
        const blog = yield blogModel_1.default.findById(blogID);
        const { title, category, content } = req.body;
        if (user) {
            if (blog) {
                const updatedBlog = yield blogModel_1.default.findByIdAndUpdate(blogID, {
                    title,
                    category,
                    content
                }, { new: true });
                return res.status(200).json({
                    message: "Blog Updated Successfully",
                    data: updatedBlog,
                    status: 201,
                });
            }
            else {
                return res.status(404).json({
                    message: "Blog does not exist",
                    status: 404,
                });
            }
        }
    }
    catch (error) {
        return res.status(404).json({
            message: "User does not exist",
            status: 404,
        });
    }
});
exports.updateBlogInfo = updateBlogInfo;
const deleteBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { blogID } = req.params;
        const blog = yield blogModel_1.default.findByIdAndDelete(blogID);
        return res.status(201).json({
            message: "Blog successfully deleted",
            status: 201
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Blog does not exist",
            status: 404
        });
    }
});
exports.deleteBlog = deleteBlog;
