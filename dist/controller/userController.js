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
exports.getOneUser = exports.getAllUser = exports.signUser = exports.verifiedUser = exports.createUser = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const token = crypto_1.default.randomBytes(3).toString("hex");
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashed = yield bcrypt_1.default.hash(password, salt);
        const user = yield userModel_1.default.create({
            email,
            token,
            password: hashed,
        });
        return res.status(201).json({
            message: "error creating user",
            data: user,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "error creating user",
        });
    }
});
exports.createUser = createUser;
const verifiedUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const user = yield userModel_1.default.findById(userID);
        if (user) {
            const updatedUser = yield userModel_1.default.findByIdAndUpdate(userID, {
                verify: true,
            }, { new: true });
            return res.status(200).json({
                message: "verifying user",
                data: updatedUser,
            });
        }
        else {
            return res.status(404).json({
                message: "Something went wrong",
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: "Error creating user",
        });
    }
});
exports.verifiedUser = verifiedUser;
const signUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, token } = req.body;
        const getUser = yield userModel_1.default.findOne({ email });
        if (getUser) {
            if (getUser.token === token) {
                if (getUser.verify) {
                    const encrypt = jsonwebtoken_1.default.sign({ id: getUser._id }, process.env.JWT_SECRET, {
                        expiresIn: "1d",
                    });
                    // req.session.isAuth = true;
                    // req.session.userID = getUser._id;
                    return res.status(200).json({
                        message: "welcome back",
                        data: encrypt,
                    });
                }
                else {
                    return res.status(404).json({
                        message: "Account has not yet been verified",
                    });
                }
            }
            else {
                return res.status(404).json({
                    message: "Error reading token",
                });
            }
        }
        else {
            return res.status(404).json({
                message: "Error reading user",
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: "Error creating user",
        });
    }
});
exports.signUser = signUser;
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.default.find();
        return res.status(404).json({
            message: "error creating user",
            data: user,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "error creating user",
        });
    }
});
exports.getAllUser = getAllUser;
const getOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const user = yield userModel_1.default.findById(userID);
        let count = 0;
        const countValue = {
            email: user === null || user === void 0 ? void 0 : user.email,
            fullName: user === null || user === void 0 ? void 0 : user.fullName,
            address: user === null || user === void 0 ? void 0 : user.address,
            phone: user === null || user === void 0 ? void 0 : user.phone,
            avatar: user === null || user === void 0 ? void 0 : user.avatar,
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
    }
    catch (error) {
        return res.status(404).json({
            message: "error creating user",
        });
    }
});
exports.getOneUser = getOneUser;
