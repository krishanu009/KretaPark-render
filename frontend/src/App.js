import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import UploadPage from "./components/UploadPage";
import SideBar from "./components/SideBar";
import Header from "./components/Header";
import { Provider } from "react-redux";
import store from "./store";
import constants from "./constants.json";
import CalendarView from "./components/calenderView";
import BardApiComp from "./components/BardApiComp";
import ChatRoom from "./components/ChatRoom";
import Register from "./components/Register";
import Dashboard_ from "./components/Dashboard_";
import Login from "./components/Login";
import { ThemeContext } from "./context/ThemeContext";
function App() {
  const [theme, setTheme] = useState("dark");
  const value = {theme, setTheme};

  useEffect(() => {
    document.documentElement.style.setProperty("--bg-color", "rgb(34, 39, 46)");

    const rootStyles = getComputedStyle(document.documentElement);
    const bgColor = rootStyles.getPropertyValue("--main-color");
    document.body.style.backgroundColor = bgColor;
  }, []);
  useEffect(() => {
    if(theme === 'dark')
    {
      // document.documentElement.style.setProperty("--main-color", "rgb(34, 39, 46)");
      // document.documentElement.style.setProperty("--second-color","rgb(28,33,40)");
      // document.documentElement.style.setProperty("--text-color","rgb(255, 255, 255)");
      // document.documentElement.style.setProperty("--border-color","rgb(68,76,86)");
      // document.documentElement.style.setProperty("--highlight-color","#444C56");
      // // document.documentElement.style.setProperty("--highlight-color","rgb(2,100,126)");
      // document.documentElement.style.setProperty("--third-color","rgb(68,76,86)");
      // document.documentElement.style.setProperty("--chat-window","rgb(35, 32, 40)");
      document.documentElement.style.setProperty("--main-color", "rgb(8,17,37)");
      document.documentElement.style.setProperty("--second-color","rgb(15,23,42)");
      document.documentElement.style.setProperty("--text-color","rgb(250,250,250)");
      document.documentElement.style.setProperty("--border-color","rgb(68,76,86)");
      document.documentElement.style.setProperty("--highlight-color","#444C56");
      // document.documentElement.style.setProperty("--highlight-color","rgb(2,100,126)");
      document.documentElement.style.setProperty("--third-color","rgb(0,255,160)");
      document.documentElement.style.setProperty("--chat-window","rgb(35, 32, 40)");


    }
    else if(theme === 'light')
    {
      document.documentElement.style.setProperty("--main-color", "white");
      document.documentElement.style.setProperty("--second-color","rgb(246,248,250)");
      // document.documentElement.style.setProperty("--text-color","rgb(87,96,106)");
      document.documentElement.style.setProperty("--text-color","black");
      document.documentElement.style.setProperty("--border-color","rgb(208,215,222)");
      document.documentElement.style.setProperty("--highlight-color","rgb(204, 206, 208)");
      document.documentElement.style.setProperty("--third-color","white");
      document.documentElement.style.setProperty("--chat-window","rgb(242,238,231)");
    }
    const rootStyles = getComputedStyle(document.documentElement);
    const bgColor = rootStyles.getPropertyValue("--main-color");
    document.body.style.backgroundColor = bgColor;
  }, [theme]);

  return (
    <>
      {/* <Row>
        <Header></Header>
      </Row>
    
      <Row>
        <Col lg="1"><SideBar selectedPage = {selectedPage} setSelectedPage = {setSelectedPage}></SideBar></Col>
        <Col>{selectedPage === constants.PAGES.MEETING_ROOMS && <ChatRoom></ChatRoom>}{selectedPage === constants.PAGES.HOME && <BardApiComp></BardApiComp>}{selectedPage === constants.PAGES.UPLOAD && <UploadPage />}
        {selectedPage === constants.PAGES.CALENDERVIEW && <CalendarView></CalendarView>}</Col>
      </Row> */}
      {/* <Row>
       <Dashboard_></Dashboard_>
      </Row> */}
      <ThemeContext.Provider value={value}>
      <Router>
        <Routes>
          
          <Route exact path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard_ />} />
        </Routes>
      </Router>
      </ThemeContext.Provider>
      

      {/* <Col  >
    <UploadPage></UploadPage>
    </Col>
    <Col  >
    <UploadPage></UploadPage>
    </Col> */}
    </>
  );
}

export default App;
