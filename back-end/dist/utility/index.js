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
//VALIDATION 
const joi_1 = __importDefault(require("@hapi/joi"));
const db_1 = __importDefault(require("../db"));
//Register validaion
const registerValidation = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const schema = joi_1.default.object({
        firstName: joi_1.default.string().min(2).required(),
        lastName: joi_1.default.string().min(2).required(),
        email: joi_1.default.string().min(6).required().email(),
        password: joi_1.default.string().min(4).required(),
        contact: joi_1.default.string().max(10).min(10).required()
    });
    return schema.validate(data);
});
//login validation
const loginValidation = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const schema = joi_1.default.object({
        email: joi_1.default.string().min(6).required().email(),
        password: joi_1.default.string().min(4).required()
    });
    return schema.validate(data);
});
// module.exports.registerValidation = registerValidation
// module.exports.loginValidation = loginValidation
const verifyRequest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("req.header",req);
    const userId = req.header('user_id');
    // console.log("token", token)
    if (!userId)
        return res.status(401).json({ errorMsg: "Access Denied", data: [] });
    // try {
    //     const verified = verify(token, process.env.TOKEN_SECRET);
    //     req.userCxt = verified.userCxt;
    //     console.log("req.Cxt: ", req.userCxt)
    //     return next();
    // } catch (error) {
    //     res.status(400).send('Invalid Token!!');
    // }
    try {
        const user = yield db_1.default.query(`SELECT user_id from user where user_id = '${userId}';`);
        if (user && user.length) {
            if (userId === user[0].user_id) {
                next();
            }
            else {
                return res.status(400).json({
                    errorMsg: "user_id is missing/wrong",
                    successMsg: "",
                    data: []
                });
            }
        }
        else {
            return res.status(400).json({
                errorMsg: "bad request",
                successMsg: "",
                data: []
            });
        }
    }
    catch (error) {
        console.log('err ', error.sqlMessage);
        return res.status(400).json({
            errorMsg: error.sqlMessage,
            data: []
        });
    }
});
exports.default = { registerValidation, loginValidation, verifyRequest };
