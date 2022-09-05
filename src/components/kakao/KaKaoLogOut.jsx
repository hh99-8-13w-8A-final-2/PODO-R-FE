import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/modules/userSlice";
import { useSelector } from "react-redux";
// import { __getSingleUser } from "../../redux/modules/userSlice"
import axios from "axios";

const KaKaoLogOut = () => {

    const navigate = useNavigate();



    const onLogoutHandler = async () => {
      
        const { result, data, headers } = await axios({
          method: "post",
          url: `http://54.180.140.72:8080/api/member/logout`,
          headers: {
            Authorization: localStorage.getItem("Authorization"),
            RefreshToken: localStorage.getItem("RefreshToken"),
          },
        });
        // dispatch(logout());
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        localStorage.removeItem("id")
        localStorage.removeItem("nickname")
        // alert(message);
        navigate("/");
    };





    return (





        <div>
            <button onClick={()=> onLogoutHandler}>로그아웃</button>
        </div>
    
    
    );
};

export default KaKaoLogOut;