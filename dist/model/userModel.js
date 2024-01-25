"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_2 = require("mongoose");
const userModel = new mongoose_2.Schema({
    fullName: {
        type: String,
    },
    email: {
        type: String,
    },
    token: {
        type: String,
    },
    address: {
        type: String,
    },
    verify: {
        type: Boolean,
    },
    password: {
        type: String,
    },
    bio: {
        type: String,
    },
    phone: {
        type: String,
    },
    avatar: {
        type: String,
    },
    avatarID: {
        type: String,
    },
    blog: [
        {
            type: mongoose_2.Types.ObjectId,
            ref: "blogs",
        },
    ],
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("users", userModel);
