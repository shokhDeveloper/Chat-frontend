"use strict";
const getItem = (key) => window.localStorage.getItem(key);
const setItem = (key, value) => window.localStorage.setItem(key, typeof value == "object" ? JSON.stringify(value) : value);
const elErrorInfo = document.querySelector(".js-error-info");
const BECKEND_URL = "http://192.168.1.107:4000";
let userData = {};
const toCheckToken = () => {
    if (getItem("chat-token"))
        return window.location.replace("/");
};
const handleChange = (evt) => {
    const elTarget = evt.target;
    if (!elTarget.value.length) {
        elErrorInfo.textContent = elTarget.id.charAt(0).toUpperCase() + elTarget.id.slice(1) + " Required !";
    }
    else {
        elErrorInfo.textContent = '';
    }
    ;
    if (elTarget.id == "username" && elTarget.value.length) {
        userData = Object.assign(Object.assign({}, userData), { username: elTarget.value });
    }
    if (elTarget.id == "password" && elTarget.value.length) {
        userData = Object.assign(Object.assign({}, userData), { password: elTarget.value });
    }
};
