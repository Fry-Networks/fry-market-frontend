import React, { useState } from "react";
import ProfilePage from "../components/artistProfile/profilePage";
import ProfileSettingPage from "../components/artistProfile/profileSettingPage";
import Button from "../components/shared/button";

const ProfileData = () => {
  const [activePage, setActivePage] = useState("profile");

  const renderPage = () => {
    switch (activePage) {
      case "profile":
        return <ProfilePage />;
      case "profileSettings":
        return <ProfileSettingPage />;
      default:
        return <ProfilePage />;
    }
  };

  return (
    <>
      <div className="profileDataWrapper">
        <div className="container">
          <div className="mt-12 tabSection w-[236px] h-[50px] p-2 rounded-[10px] border border-3 border-solid border-[#E7E7E7]">
            <button
              className={`small font-medium font-Roboto w-[90px] h-[34px] ${
                activePage === "profile" ? "bg-red-500 text-white" : "darkBlack"
              }`}
              onClick={() => setActivePage("profile")}
            >
              Profile
            </button>

            <button
              className={`small font-medium font-Roboto w-[125px] h-[34px] ${
                activePage === "profileSettings"
                  ? "bg-red-500 text-white"
                  : "darkBlack"
              }`}
              onClick={() => setActivePage("profileSettings")}
            >
              Profile Settings
            </button>
          </div>
        </div>
        <div className="contentWrapper">{renderPage()}</div>
      </div>
    </>
  );
};

export default ProfileData;
