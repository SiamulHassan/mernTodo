import { Avatar, Divider } from "antd";
import { BiTask } from "react-icons/bi";

const Header = () => {
  return (
    <div className="text-center">
      <Avatar
        style={{
          backgroundColor: "#E1A0FF",
          color: "#fff",
        }}
        size={64}
        icon={<BiTask />}
      />
      <h2 className="text-[30px] font-bold text-[#444]">List of Task</h2>
      <p className="text-[14px] text-[#BEBEBE]">Do what you want</p>
      <Divider />
    </div>
  );
};

export default Header;
