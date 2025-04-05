"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zodpackage_1 = require("zodpackage");
const username = "aaa3  rew ttrwt";
const password = "12we4r    trtg";
const inputs = zodpackage_1.SignUpInput.safeParse({ username, password });
console.log(inputs);
