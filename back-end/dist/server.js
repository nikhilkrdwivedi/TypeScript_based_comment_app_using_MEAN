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
const express_1 = __importDefault(require("express"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
// import cors from 'cors';
const cors = require('cors');
const convert_excel_to_json_1 = __importDefault(require("convert-excel-to-json"));
const router_1 = __importDefault(require("./router"));
// let __dirname = path.resolve(path.dirname(''));
const db_1 = __importDefault(require("./db"));
const app = express_1.default();
app.use(express_1.default.json());
app.use(express_fileupload_1.default({
    limits: { fileSize: 50 * 1024 * 1024 },
}));
var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
app.use('/', router_1.default);
app.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield db_1.default.query('SELECT * FROM user_blogs');
    console.log(data[0]['id']);
    console.log(data[0]['name']);
    res.send({
        data: 'A big Hi from AIF Matrix',
        dataa: data
    });
}));
app.post('/upload', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let sampleFile;
        let uploadPath;
        if (!req.files || Object.keys(req.files).length === 0) {
            res.status(400).send('No files were uploaded.');
            return;
        }
        console.log('req.files >>>', req.files); // eslint-disable-line
        sampleFile = req.files.formFile;
        uploadPath = __dirname + '/uploads/' + sampleFile.name;
        console.log('uploadPath ', uploadPath);
        sampleFile.mv(uploadPath, function (err) {
            if (err) {
                return res.status(500).send(err);
            }
            const result = convert_excel_to_json_1.default({
                sourceFile: uploadPath
            });
            console.log('res ', result);
            res.send('File uploaded to ' + uploadPath);
        });
    });
});
app.listen(3000, () => {
    console.log(`Server is running at port ${3000}`);
});
