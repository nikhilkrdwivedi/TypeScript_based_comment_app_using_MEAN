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
exports.getComments = exports.login = void 0;
const db_1 = __importDefault(require("../db"));
const utility_1 = __importDefault(require("../utility"));
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            const { error } = yield utility_1.default.loginValidation(req.body);
            if (error) {
                return res.status(400).json({
                    errorMsg: error.details[0].message,
                    successMsg: "",
                    data: []
                });
            }
            try {
                const user = yield db_1.default.query(`SELECT * from user where user_email = '${email}';`);
                if (user && user.length) {
                    if (email === user[0].user_email && password === user[0].password) {
                        user[0].password = undefined;
                        return res.status(200).json({
                            errorMsg: "",
                            successMsg: "successfully login",
                            data: user
                        });
                    }
                    else {
                        return res.status(400).json({
                            errorMsg: "email/password is not matching",
                            successMsg: "",
                            data: []
                        });
                    }
                }
                else {
                    return res.status(200).json({
                        errorMsg: "user not found",
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
        }
        catch (error) {
            return res.status(500).json({
                errorMsg: "Internal Server Error",
                successMsg: "",
                data: []
            });
        }
    });
}
exports.login = login;
function getComments(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // const data = await TestModel.find({})
        console.log('okaa');
        const data = yield db_1.default.query('SELECT * FROM user_blogs');
        return res.status(200).json({
            message: "This is sample api testing data.",
            count: data.length,
            data: data
        });
    });
}
exports.getComments = getComments;
exports.default = { getComments, login };
