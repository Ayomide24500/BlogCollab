"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const blogController_1 = require("../controller/blogController");
const router = (0, express_1.Router)();
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)().single("upload");
router.route("/create-blog/:userID").post(upload, blogController_1.createBlog);
router.route("/view-my-blog/:userID").get(blogController_1.viewOneUserBlog);
router.route("/view-all-blog").get(blogController_1.findAllBlog);
router.route("/update-blog/:blogID").patch(blogController_1.updateBlogInfo);
router.route("/delete-blog/:blogID").delete(blogController_1.deleteBlog);
exports.default = router;
