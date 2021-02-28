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
exports.deleteComment = exports.getComments = exports.postComment = void 0;
const db_1 = __importDefault(require("../db"));
const uuid_1 = require("uuid");
function postComment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { comment } = req.body;
            const userId = req.header('user_id');
            if (!comment && !comment.length) {
                return res.status(400).json({
                    errorMsg: "comment is missing",
                    data: []
                });
            }
            try {
                console.log(`INSERT INTO comments (user_id, comment,comment_id)
            VALUES (${userId},${comment},${uuid_1.v4()});`);
                const resComment = yield db_1.default.query(`INSERT INTO comments (user_id, comment,comment_id)
            VALUES ('${userId}','${comment}','${uuid_1.v4()}');`);
                console.log('comments ', resComment);
                return res.status(200).json({
                    successMsg: "comment addedd",
                    data: [resComment]
                });
            }
            catch (error) {
                return res.status(400).json({
                    errorMsg: "comment has not posted",
                    data: []
                });
            }
        }
        catch (error) {
            return res.status(500).json({
                errorMsg: "Internal Server Error !!!",
                data: []
            });
        }
    });
}
exports.postComment = postComment;
function getComments(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // const data = await TestModel.find({})
        console.log('okaa');
        const data = yield db_1.default.query(`SELECT comments.user_id, comments.comment, comments.comment_id ,comments.created_at,user.user_email,CONCAT(user.first_name , ' ' , user.last_name) AS full_name
    FROM comments
    INNER JOIN user ON comments.user_id=user.user_id ORDER BY comments.created_at;`);
        return res.status(200).json({
            successMsg: "returning list containing count and comments",
            data: [{
                    comments: data,
                    count: data.length
                }]
        });
    });
}
exports.getComments = getComments;
function deleteComment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { commentId } = req.params;
            const userId = req.header('user_id');
            if (!commentId && !commentId.length) {
                return res.status(400).json({
                    errorMsg: "comment_id is missing",
                    data: []
                });
            }
            try {
                const resComment = yield db_1.default.query(`DELETE FROM comments where comment_id  = '${commentId}' and user_id  = '${userId}';`);
                console.log('comments ', resComment);
                return res.status(200).json({
                    successMsg: "comment deleted",
                    data: [resComment]
                });
            }
            catch (error) {
                return res.status(400).json({
                    errorMsg: "comment has not deleted",
                    data: []
                });
            }
        }
        catch (error) {
            return res.status(500).json({
                errorMsg: "Internal Server Error !!!",
                data: []
            });
        }
    });
}
exports.deleteComment = deleteComment;
exports.default = { getComments, postComment, deleteComment };
