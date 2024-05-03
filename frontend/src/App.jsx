import { BrowserRouter, Routes, Route } from "react-router-dom";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/emailVerify/:token" element={<EmailVerify />} />
        <Route path="/optVerify/:email" element={<OptVerify />} /> */}
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
