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
exports.bulkUserUpload = void 0;
const db_1 = __importDefault(require("../db"));
const uuid_1 = require("uuid");
const convert_excel_to_json_1 = __importDefault(require("convert-excel-to-json"));
const path_1 = __importDefault(require("path"));
let reqPath = path_1.default.join(__dirname, '../');
function bulkUserUpload(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let sampleFile;
            let uploadPath;
            if (!req.files || Object.keys(req.files).length === 0) {
                return res.status(400).json({ errorMsg: 'File is missing' });
            }
            sampleFile = req.files.UserList;
            uploadPath = reqPath + '/uploads/' + sampleFile.name;
            sampleFile.mv(uploadPath, function (err) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        console.log('err ', err);
                        return res.status(500).json({ errorMsg: 'No files were uploaded.' });
                    }
                    let excelToJsonData = convert_excel_to_json_1.default({
                        sourceFile: uploadPath,
                        header: {
                            rows: 1
                        },
                        columnToKey: { A: 'First Name', B: 'Last Name', C: 'Email', D: 'Password', E: 'Mobile country code', F: 'Mobile' }
                    });
                    let correctRowArray = [];
                    for (let i = 0; i < excelToJsonData['Userlist'].length; i++) {
                        let tempRow = Object.values(excelToJsonData['Userlist'][i]);
                        tempRow.push(uuid_1.v4());
                        correctRowArray.push(tempRow.map(String));
                    }
                    try {
                        let stmt = "INSERT INTO user (first_name,last_name,user_email,password,mobile_country_code,mobile_number,user_id) VALUES ?";
                        let data = yield db_1.default.query(stmt, [correctRowArray]);
                        return res.status(200).json(excelToJsonData);
                    }
                    catch (error) {
                        return res.status(400).json({ errorMsg: 'Error occurred while uploading to db' + error.sqlMessage });
                    }
                });
            });
        }
        catch (error) {
            return res.status(500).json({ errorMsg: 'Internal Server Error' });
        }
    });
}
exports.bulkUserUpload = bulkUserUpload;
exports.default = { bulkUserUpload };
