import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const MyDetailInfo = () => {

    const param = useParams();
    console.log(param)

  const URI = {
    BASE: process.env.REACT_APP_BASE_URL,
  };

  const [data, setData] = useState();

  const MyDetailReview = async () => {
    const response = await axios({
      method: "get",
      url: `${URI.BASE}/api/mypage/musicalId/reviews`,
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    });
    setData(response.data);
  };

  useEffect(() => {
    MyDetailReview();
  }, []);

  return <div></div>;
};

export default MyDetailInfo;
