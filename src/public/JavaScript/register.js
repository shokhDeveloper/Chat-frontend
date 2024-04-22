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
const elForm = document.querySelector(".js-form");
const elFileInput = document.querySelector(".js-file-input");
const elTextInputs = document.querySelectorAll(".js-text-input");
const handleSub = (evt) => __awaiter(void 0, void 0, void 0, function* () {
    evt.preventDefault();
    try {
        if (!userData.avatar)
            throw new Error("Avatar required !");
        if (!userData.username)
            throw new Error("Username is required !");
        if (!userData.password)
            throw new Error("Password is required !");
        const userFormData = new FormData();
        userFormData.append("username", userData.username);
        userFormData.append("password", userData.password);
        userFormData.append("avatar", userData.avatar);
        console.log(userFormData.get("avatar"));
        const res = yield request("/auth/register", "POST", undefined, userFormData);
        if (res.accessToken && res.user) {
            setItem("chat-token", res.accessToken);
            setItem("chat-user", res.user);
            window.location.replace("/");
        }
        else {
            console.log(res);
        }
    }
    catch (error) {
        elErrorInfo.textContent = error.message;
    }
});
elForm.addEventListener("submit", handleSub);
const handleFileUpload = (evt) => {
    const elTarget = evt.target;
    if (elTarget.files && elTarget.files[0]) {
        userData = Object.assign(Object.assign({}, userData), { avatar: elTarget.files[0] });
        elErrorInfo.textContent = '';
    }
};
elFileInput.addEventListener("change", handleFileUpload);
elTextInputs.forEach((item) => {
    item.addEventListener("blur", handleChange);
    item.addEventListener("keyup", handleChange);
});
toCheckToken();
console.log(userData);
