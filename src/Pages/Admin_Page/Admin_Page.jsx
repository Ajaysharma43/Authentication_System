import AdminUsersPage from "../../Components/AdminPannel/AdminPannel";
import React, { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import Login from "../../Components/Login/Login";
import SidebarLayout from "../../Components/Siderbar/Sidebar";
import { useNavigate } from "react-router-dom";
import { Drawer } from "@mui/material";
import Drawers from "../../Components/Drawer/Drawer";

const Admin_Page = () => {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);  // Added loading state
  const [Sidebar, setSidebar] = useState(294);
  const [Drawer,setDrawer] = useState('block')
  const [DrawerValue , setDrawerValue] = useState('Hide')
  const navigate = useNavigate();

  useEffect(() => {
    const EncryptedToken = sessionStorage.getItem("token");
    if (EncryptedToken) {
      try {
        const DecryptToken = CryptoJS.AES.decrypt(EncryptedToken, "encrypt009").toString(CryptoJS.enc.Utf8);
        setToken(DecryptToken);
      } catch (error) {
        console.error("Token decryption failed:", error);
        setToken(""); // Set token to empty string if decryption fails
      }
    } else {
      setToken(""); // If no token is found, set token to empty string
    }
    setLoading(false);  // Set loading to false once token decryption is done
  }, []);

  useEffect(() => {
    if (!loading && !token) {
      // If not loading and no token, navigate to the login page
      navigate("/Login");
    }
  }, [token, loading, navigate]);  // Dependencies include `token`, `loading`, and `navigate`

  if (loading) {
    return null;  
  }

  const DrawerState = () => {
    if(Drawer == 'block')
    {
      setDrawer('hidden')
      setDrawerValue('Show')
    }
    else
    {
      setDrawer('block')
      setDrawerValue('Hide')
    }
  }

  return (
    <article className="w-full flex">
      <section className="hidden lg:block sm:block" style={{ width: `${Sidebar}px` }}>
        <SidebarLayout Drawer={Drawer} />
      </section>

      <section className={`${Drawer} lg:hidden sm:hidden`}>
      <div>
      <Drawers />
      </div>
      </section>

      <section className="w-[calc(100%)]">
        <button className="fixed left-[93%] text-right lg:hidden sm:hidden" onClick={()=>DrawerState()}>{DrawerValue}</button>
        <AdminUsersPage />
      </section>
    </article>
  );
};

export default Admin_Page;
