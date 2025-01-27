import React, { useState, useEffect } from "react";
import Card from "../../../../components/ui/Card";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link,useNavigate } from "react-router-dom";
import { API } from "../../../../host";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";

const UserProfile = ({ token,Current_user}) => {
  const navigate = useNavigate();
  const decodedToken = jwtDecode(token);

  const initialUserData = {
    userid: "",
    fname: "",
    lname: "",
    phone: "",
    email: "",
    // password: "",
    // newPassword: "",
    // confirmPassword: "",
  };

  const [userData, setUserData] = useState(initialUserData);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const decodedEmail = decodedToken.email;
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${API}/getemail?email=${decodedEmail}`
        );
        const responseData = response.data;
        setUserData(responseData);
        toast.success('Profile Updated Successfully')
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, [decodedToken.email]);

  return (
    <div>
      <div className="grid grid-cols-12 gap-6">
        <div className="lg:col-span-12 col-span-12">
          <Card title="User Info">
            <div className="  flex justify-around">
              <div className="flex space-x-3 rtl:space-x-reverse">
                <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                  <Icon icon="heroicons:user" />
                </div>
                <div className="flex-1">
                  <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                    UserID
                  </div>
                  <div className="text-base text-slate-600 dark:text-slate-50">
                    {userData.userid || "N/A"}
                  </div>
                </div>
              </div>
              <div className="flex space-x-3 rtl:space-x-reverse">
                <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                  <Icon icon="heroicons:users" />
                </div>
                <div className="flex-1">
                  <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                    Name
                  </div>
                  <div className="text-base text-slate-600 dark:text-slate-50">
                    {`${userData.fname} ${userData.lname}` || "N/A"}
                  </div>
                </div>
              </div>

              <div className="flex space-x-3 rtl:space-x-reverse">
                <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                  <Icon icon="heroicons:envelope" />
                </div>
                <div className="flex-1">
                  <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                    Email
                  </div>
                  <a
                    href="mailto:someone@example.com"
                    className="text-base text-slate-600 dark:text-slate-50"
                  >
                    {userData.email || "N/A"}
                  </a>
                </div>
              </div>

              <div className="flex space-x-3 rtl:space-x-reverse">
                <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                  <Icon icon="heroicons:phone-arrow-up-right" />
                </div>
                <div className="flex-1">
                  <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                    PHONE
                  </div>
                  <a
                    href="tel:0189749676767"
                    className="text-base text-slate-600 dark:text-slate-50"
                  >
                    {userData.phone || "N/A"}
                  </a>
                </div>
              </div>
            </div>
          </Card>
          {Current_user === "admin" && (
          <div className="ltr:text-right rtl:text-left mt-3">
            <Link  to={`/updateform?userid=${userData.userid}`}> 
            <button className="btn btn-dark text-center">
              UPDATE
            </button>
            </Link>
          </div>
          )}
        </div>
      </div>
      <br />
    </div>
  );
};

export default UserProfile;
