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
const token = getItem("chat-token") ? getItem("chat-token") : null;
const AUTH_PATH = ["/auth/register", "/auth/login"];
const BASIC_METHODS = ["POST", "PUT"];
const request = (path, reqMethod, reqJsonBody, reqFormDataBody) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let contentType = BASIC_METHODS.includes(reqMethod) ? { "Content-Type": "application/json" } : undefined;
        let headers = !AUTH_PATH.includes(path) ? Object.assign({ token: token }, contentType) : undefined;
        if (AUTH_PATH.includes(path) && path == "/auth/login") {
            headers = { "Content-type": "application/json" };
        }
        let reqBody = reqJsonBody && Object.keys(reqJsonBody).length ? JSON.stringify(reqJsonBody) : reqFormDataBody instanceof FormData ? reqFormDataBody : undefined;
        const req = yield fetch(BECKEND_URL + path, {
            method: reqMethod,
            headers,
            body: reqBody
        });
        if (req.ok) {
            const res = yield req.json();
            return res;
        }
    }
    catch (error) {
        console.log(error);
    }
});
