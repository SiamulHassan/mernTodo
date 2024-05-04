// import React from 'react'

import { useSelector } from "react-redux";

const Img = () => {
  const user = useSelector((val) => val.login.value);

  const BASE_URL = "http://localhost:8000";
  //   src={`${BASE_URL}${user.imgUrl}`}
  return (
    <div className="w-[40px] h-[40px] rounded-full overflow-hidden ml-auto">
      <img
        src={`${BASE_URL}${user.imgUrl}`}
        alt="user_img"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default Img;
