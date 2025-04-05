"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignUpInput = void 0;
const zod_1 = require("zod");
exports.SignUpInput = zod_1.z.object({
    username: zod_1.z.string().min(10),
    password: zod_1.z.string().min(10),
});
