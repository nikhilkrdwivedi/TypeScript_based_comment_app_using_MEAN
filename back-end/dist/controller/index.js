"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const utility_1 = __importDefault(require("../utility"));
const router = express_1.Router();
const comments_controller_1 = require("./comments.controller");
const auth_controller_1 = require("./auth.controller");
// comments calls
router.get('/comments', comments_controller_1.getComments);
router.post('/comments', utility_1.default.verifyRequest, comments_controller_1.postComment);
router.delete('/comments/:commentId', utility_1.default.verifyRequest, comments_controller_1.deleteComment);
//auth calls
router.post('/login', auth_controller_1.login);
exports.default = router;
