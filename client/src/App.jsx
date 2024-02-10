import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./assets/css/style.css";
import Main from "./layout/Main";
import NoPage from "./pages/NoPage";
import Home from "./components/Dashboard/Home";
import Create from "./components/Dashboard/Create";
import New from "./components/Dashboard/New";
import Progress from "./components/Dashboard/Progress";
import Completed from "./components/Dashboard/Completed";
import Canceled from "./components/Dashboard/Canceled";
import EmailVerification from "./components/Account Recover/EmailVerification";
import OTPVerify from "./components/Account Recover/OTPVerify";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { getToken } from "./Helper/SessionHelper";
import ProfilePage from "./pages/ProfilePage";
import ConfirmPass from "./components/Account Recover/ConfirmPass";

function App() {
if(getToken()){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main/> }>
          <Route index element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/new" element={<New />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/completed" element={<Completed />} />
          <Route path="/canceled" element={<Canceled />} />
          <Route path="/profile" element={<ProfilePage/>} />
          <Route path="*" element={<NoPage />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}
else{
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Navigate to="/login" replace/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/emailVerify" element={<EmailVerification/>} />
        <Route path="/verifyOtp" element={<OTPVerify/>} />
        <Route path="/restPass" element={<ConfirmPass/>} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}
}

export default App;
