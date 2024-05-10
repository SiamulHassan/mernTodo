import { Avatar, Divider } from "antd";
import { BiTask } from "react-icons/bi";
import { Link } from "react-router-dom";
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
      <p className="text-[14px] text-[#BEBEBE] mb-5">Do what you want</p>
      <Link
        to="/manage-todo"
        className="bg-slate-400 font-bold px-6 py-2 rounded-md hover:text-white"
      >
        Manage Todo
      </Link>
      <Divider />
    </div>
  );
};

export default Header;
