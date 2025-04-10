"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SECRET = exports.authenticateJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET = "SECr3t"; // This should be in an environment variable in a real application
exports.SECRET = SECRET;
const authenticateJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jsonwebtoken_1.default.verify(token, SECRET, (err, payload) => {
            if (err) {
                return res.sendStatus(403);
            }
            const user = payload;
            if (user === null || user === void 0 ? void 0 : user.id) {
                req.headers.id = user.id;
                req.headers.token = token;
                next();
            }
            else {
                res.sendStatus(401);
            }
        });
    }
    else {
        res.sendStatus(401);
    }
};
exports.authenticateJwt = authenticateJwt;
