"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const cors_1 = __importDefault(require("cors"));
const router_1 = __importDefault(require("./router"));
const config_1 = require("./config");
const app = express_1.default();
//middleware
app.use(express_1.default.json());
app.use(express_fileupload_1.default({ limits: { fileSize: 50 * 1024 * 1024 } }));
let corsOptions = { origin: 'http://localhost:4200', optionsSuccessStatus: 200 };
app.use(cors_1.default(corsOptions));
//routes
app.use('/', router_1.default);
//test api
app.get('/', (req, res, next) => {
    return res.status(200).send({ successMsg: 'A big Hi from AIF Matrix' });
});
//run server
app.listen(config_1.config.port || 3000, () => {
    console.log(`Server is running at port ${config_1.config.port}`);
});
