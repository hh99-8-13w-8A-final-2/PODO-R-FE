import { atom } from "recoil";

const loginState = atom({
    key: "isLogin",
    default: localStorage.getItem("accessToken") ? true : false
})

export default loginState