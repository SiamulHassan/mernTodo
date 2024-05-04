import { notification } from "antd";
import axios from "axios";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EmailVerify = () => {
  const [api, contextHolder] = notification.useNotification();
  const params = useParams();
  const navigate = useNavigate();
  const token = params.token;
  useEffect(() => {
    async function verifyMail() {
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/emailVerify",
        {
          token,
        }
      );
      api.open({
        message: data.message,
        duration: 0,
      });
      setTimeout(() => {
        navigate("/login");
      }, 2500);
    }
    verifyMail();
  }, [token, navigate, api]);
  return (
    <div>
      {contextHolder}
      <p>varifing...</p>
    </div>
  );
};

export default EmailVerify;
