import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import EmailVerify from "./pages/EmailVerify";
import Todo from "./pages/Todo";
import { useSelector } from "react-redux";
function App() {
  const userInfo = useSelector((val) => val.login.value);

  return (
    <BrowserRouter>
      <Routes>
        {userInfo?.email && <Route path="/todo" element={<Todo />} />}
        <Route index element={<Navigate replace to="/registration" />} />
        <Route path="/emailVerify/:token" element={<EmailVerify />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
