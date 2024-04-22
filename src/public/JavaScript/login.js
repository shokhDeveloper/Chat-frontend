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
const elLoginForm = document.querySelector(".js-form");
const elLoginTextInputs = elLoginForm.querySelectorAll(".js-input");
const handleLoginSub = (evt) => __awaiter(void 0, void 0, void 0, function* () {
    evt.preventDefault();
    try {
        if (!userData.username)
            throw new Error("Username is required !");
        if (!userData.password)
            throw new Error("Password is required !");
        const res = yield request("/auth/login", "POST", userData, undefined);
        if (res.accessToken && res.user) {
            setItem("chat-token", res.accessToken);
            setItem("chat-user", res.user);
            window.location.replace("/");
        }
    }
    catch (error) {
        elErrorInfo.textContent = error.message;
    }
});
console.log(elLoginTextInputs);
elLoginTextInputs.forEach((input) => {
    input.addEventListener("blur", handleChange);
    input.addEventListener("keyup", handleChange);
});
elLoginForm.addEventListener("submit", handleLoginSub);
toCheckToken();
