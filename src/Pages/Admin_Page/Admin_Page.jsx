import AdminUsersPage from "../../Components/AdminPannel/AdminPannel";
import React, { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import Login from "../../Components/Login/Login";
import SidebarLayout from "../../Components/Siderbar/Sidebar";

const Admin_Page = () => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const EncryptedToken = sessionStorage.getItem("token");
    if (EncryptedToken) {
      try {
        const DecryptToken = CryptoJS.AES.decrypt(
          EncryptedToken,
          "encrypt009"
        ).toString(CryptoJS.enc.Utf8);
        setToken(DecryptToken);
      } catch (error) {
        console.error("Token decryption failed:", error);
        setToken(""); 
      }
    }
  }, []);

  return (
    <>
      {token ? (
        <article className="w-full flex">

          <section className="w-[16%]">
            <SidebarLayout/>
          </section>

          <section className="w-[calc(100%-16%)]">
          <AdminUsersPage />
          </section>

        </article>
        
      ) : (
        <Login />
      )}
    </>
  );
};

export default Admin_Page;
