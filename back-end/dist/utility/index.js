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
const joi_1 = __importDefault(require("@hapi/joi"));
const db_1 = __importDefault(require("../db"));
//login validation
const loginValidation = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const schema = joi_1.default.object({
        email: joi_1.default.string().min(6).required().email(),
        password: joi_1.default.string().min(4).required()
    });
    return schema.validate(data);
});
//id user exists 
const verifyRequest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.header('user_id');
    if (!userId)
        return res.status(401).json({ errorMsg: "Access Denied", data: [] });
    try {
        const user = yield db_1.default.query(`SELECT user_id from user where user_id = '${userId}';`);
        if (user && user.length) {
            if (userId === user[0].user_id) {
                next();
            }
            else {
                return res.status(400).json({ errorMsg: "user_id is missing/wrong" });
            }
        }
        else {
            return res.status(400).json({ errorMsg: "you can't perform this action" });
        }
    }
    catch (error) {
        return res.status(400).json({ errorMsg: error.sqlMessage });
    }
});
exports.default = { loginValidation, verifyRequest };
