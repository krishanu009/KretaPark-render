import React, { useState } from "react";
import constants from "../constants.json";
import "../styling/sidebar.css";
import { FaBars, FaHome, FaCog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
function SideBar({ selectedPage, setSelectedPage }) {
  const handleIconClick = (param) => (event) => {
    setSelectedPage(param);
  };

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };
  const navigate = useNavigate();
  const logoutAction = () => {
    // axios.post('/api/logout',{}, { headers:{Authorization: 'Bearer ' + localStorage.getItem('token')}})
    // .then((r) => {
    //     localStorage.setItem('token', "")
    //    navigate("/");
    // })
    // .catch((e) => {
    //     console.log(e)
    // });
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className={`sidebar ${isExpanded ? "expanded" : ""}`}>
      <div className="top-icon" onClick={toggleSidebar}>
        <FaBars />
      </div>
      <div className="menu-items">
        {/* <div
          className={`menu-item ${
            selectedPage === constants.PAGES.HOME ? "active" : ""
          }`}
          onClick={handleIconClick(constants.PAGES.HOME)}
        >
          <FaHome className="icon" />
          <span className="menu-text">Home</span>
        </div> */}
        <div
          className={`menu-item ${
            selectedPage === constants.PAGES.SCRIPTS ||
            selectedPage === constants.PAGES.TEXT_EDITOR
              ? "active"
              : ""
          }`}
          onClick={handleIconClick(constants.PAGES.SCRIPTS)}
        >
          <svg
            style={{ marginLeft: "5px", marginTop: "4px" }}
            className="icon"
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
            class="bi bi-house"
            viewBox="0 0 16 16"
          >
            <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5z" />
          </svg>
          <span className="menu-text">Scripts</span>
        </div>

        <div
          className={`menu-item ${
            selectedPage === constants.PAGES.POST_VIEW ? "active" : ""
          }`}
          onClick={handleIconClick(constants.PAGES.POST_VIEW)}
        >
          <svg
            style={{ marginLeft: "5px", marginTop: "4px" }}
            className="icon"
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
            class="bi bi-list-task"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M2 2.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5zM3 3H2v1h1z"
            />
            <path d="M5 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M5.5 7a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1zm0 4a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1z" />
            <path
              fill-rule="evenodd"
              d="M1.5 7a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5zM2 7h1v1H2zm0 3.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm1 .5H2v1h1z"
            />
          </svg>
          <span className="menu-text">Board</span>
        </div>

        <div
          className={`menu-item ${
            selectedPage === constants.PAGES.MEETING_ROOMS ? "active" : ""
          }`}
          onClick={handleIconClick(constants.PAGES.MEETING_ROOMS)}
        >
          <svg
            style={{ marginLeft: "5px", marginTop: "4px" }}
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
            class="bi bi-chat-dots"
            viewBox="0 0 16 16"
          >
            <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
            <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.437 10.437 0 0 1-.524 2.318l-.003.011a10.722 10.722 0 0 1-.244.637c-.079.186.074.394.273.362a21.673 21.673 0 0 0 .693-.125zm.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6c0 3.193-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-2" />
          </svg>
          <span className="menu-text">Message</span>
        </div>

        <div
          className={`menu-item ${
            selectedPage === constants.PAGES.TEAM ? "active" : ""
          }`}
          onClick={handleIconClick(constants.PAGES.TEAM)}
        >
          <svg
            style={{ marginLeft: "5px", marginTop: "4px" }}
            className="icon"
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
            class="bi bi-people"
            viewBox="0 0 16 16"
          >
            <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4" />
          </svg>
          <span className="menu-text">Team</span>
        </div>

        <div
          className={`menu-item`}
          onClick={logoutAction}
        >
          <svg
          style={{ marginLeft: "5px", marginTop: "4px" }}
          className="icon"
           xmlns="http://www.w3.org/2000/svg"  width="25"
           height="25" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
  <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
</svg>
          <span className="menu-text">Log Out</span>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
