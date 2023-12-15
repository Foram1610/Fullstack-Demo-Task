import { useState, useEffect } from "react";
import UserForm from "../components/UserForm";
import UserData from "../components/UserData";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { getUser } from "../services/user";
import { generateErrorToast } from "../utils/errorToast";

const Layout = () => {
  const [userData, setUserData] = useState([]);
  function getUserData() {
    getUser()
      .then((res) => {
        toast.info(res.message);
        setUserData(res);
      })
      .catch((err) => generateErrorToast(err));
    // .finally(() => setIsDisabled(false));
  }

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="p-5">
      <ToastContainer />
      <UserForm getUserData={getUserData} />
      <UserData userData={userData} />
    </div>
  );
};

export default Layout;
