import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import EmailVerify from "./pages/EmailVerify";
import Todo from "./pages/Todo";
import { useSelector } from "react-redux";
import ManageTodo from "./pages/ManageTodo";
function App() {
  const user = useSelector((val) => val.login.value);

  return (
    <BrowserRouter>
      <Routes>
        {/* if usr -> /registration will be replaced */}
        {user?.email ? (
          <Route
            path="/registration"
            element={<Navigate replace to="/todo" />}
          />
        ) : (
          // if not usr -> registration is accessible
          <Route path="/registration" element={<Registration />} />
        )}
        {/* usr ? --> login will be replaced */}
        {user?.email ? (
          <Route path="/login" element={<Navigate replace to="/todo" />} />
        ) : (
          // if not usr -> login is accessible
          <Route path="/login" element={<Login />} />
        )}

        {/* usr ? --> todo is accessible*/}
        {user?.email ? (
          <>
            <Route path="/todo" element={<Todo />} />
            <Route path="/manage-todo" element={<ManageTodo />} />
          </>
        ) : (
          // if not usr and u r todo page -> todo is replaceable
          <Route path="/todo" element={<Navigate replace to="/login" />} />
        )}
        <Route path="/" element={<Navigate replace to="/registration" />} />
        <Route path="/emailVerify/:token" element={<EmailVerify />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
