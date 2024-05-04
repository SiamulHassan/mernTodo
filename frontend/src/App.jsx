import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import EmailVerify from "./pages/EmailVerify";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/emailVerify/:token" element={<EmailVerify />} />
        <Route index element={<Navigate replace to="/registration" />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/dashboard" element={<Dashboard />}>
          <Route path="addcategory" element={<AddCategory />} />
          <Route path="addsubcategory" element={<AddSubCategory />} />
          <Route path="viewcategory" element={<ViewCategory />} />
          <Route path="viewsubcategory" element={<ViewSubCategory />} />
        </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
