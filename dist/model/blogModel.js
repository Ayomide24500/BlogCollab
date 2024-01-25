"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_2 = require("mongoose");
const blogModel = new mongoose_2.Schema({
    title: {
        type: String,
    },
    category: {
        type: String,
    },
    displayImage: {
        type: String,
    },
    displaImageID: {
        type: String,
    },
    user: {
        type: mongoose_2.Types.ObjectId,
        ref: "users",
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("blogs", blogModel);
