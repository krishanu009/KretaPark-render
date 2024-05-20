import React, { useState, useEffect, useContext } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import UploadPage from "./UploadPage";
import SideBar from "./SideBar";
import Header from "./Header";
import { Provider } from "react-redux";
import constants from "../constants.json";
import CalendarView from "./calenderView";
import BardApiComp from "./BardApiComp";
import ChatRoom from "./ChatRoom";
import { useNavigate } from "react-router-dom";
import Register from "./Register";
import axios from "axios";
import Scripts from "./Scripts";
import TextEditor from "./TextEditor";
import { Form } from "react-bootstrap";
import PostScheduleView from "./PostScheduleView";
import TeamManage from "./TeamManage";
import LoadingSpinner from "./LoadingSpinner";
import { jwtDecode } from 'jwt-decode';
import { ThemeContext } from "../context/ThemeContext";
function Dashboard_() {
  // const [theme, setTheme] = useState("light");
  const { theme, setTheme } = useContext(ThemeContext);
  // const [selectedPage, setSelectedPage] = useState(constants.PAGES.POST_VIEW);
  const [selectedPage, setSelectedPage] = useState();
  const [scripId, setScriptId] = useState();

  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [title, setTitle] = useState();
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (
      localStorage.getItem("token") == "" ||
      localStorage.getItem("token") == null
    ) {
      navigate("/");
    } else {
      getUser();
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchAndSetLocalData();
      const expirationTime = getTokenExpiration(token);
      // console.log("expirationTime",expirationTime);
      if (expirationTime) {
        const currentTime = Date.now();
        const timeLeft = expirationTime - currentTime;
        // console.log("time left",timeLeft);
        if (timeLeft > 0) {
          // Set a timeout to log the user out when the token expires
          setTimeout(() => {
            autoLogout();
          }, timeLeft);
        } else {
          autoLogout(); // Token already expired
        }
      }
    }
  }, []);
  useEffect(()=>{
    changeLoacalData();

  },[theme,selectedPage]);
  const fetchAndSetLocalData = async () => {
    let localInfo = JSON.parse(localStorage.getItem('userInfo'));


     if(localInfo)
      {
        console.log("localinfo",localInfo);
         setSelectedPage(localInfo.selectedPage);
        setTheme(localInfo.theme);
        
      }
      else{
        let newLocalInfo = {theme:'light',selectedPage:constants.PAGES.POST_VIEW};

    localStorage.setItem('userInfo', JSON.stringify(newLocalInfo));
    console.log("changed user data1", newLocalInfo);
      }
  }
  const changeLoacalData = () => {
    let localInfo = JSON.parse(localStorage.getItem('userInfo'));
    if(!selectedPage || !theme) return;
    let newLocalInfo = {theme,selectedPage};

    localStorage.setItem('userInfo', JSON.stringify(newLocalInfo));
    console.log("changed user data2", newLocalInfo);
  }
  const autoLogout = () =>
  {
    //console.log("auto logout");
    localStorage.removeItem('token');
    navigate("/");
  }
  const getTokenExpiration = (token) => {
    const decoded = jwtDecode(token);
    if (!decoded.exp) {
      return null;
    }
    //console.log("decoded",decoded);
    return decoded.exp * 1000; // exp is in seconds, convert to milliseconds
  };

  const getUser = async () => {
    axios
      .get("/user/current", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((r) => {
        setUser(r.data);
        getUserInfo(r.data.id);
      })
      .catch((e) => {
        console.log(e);
        navigate("/");
      });
  };

  const getUserInfo = (id) => {
    // console.log("id",id);
    axios
      .get("/user/userInfo/" + id, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((r) => {
        setUserInfo(r.data);
        console.log("user info", r.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const changeLastLogin = async (lastLogin) => {
    //console.log("invoked");
    let payload = {
      id: user.id,
      lastLogin: lastLogin,
    };
    //console.log(payload);
    //console.log(process.env.REACT_APP_UPDATE_LAST_LOGIN);
    await axios
      .put(process.env.REACT_APP_UPDATE_LAST_LOGIN, payload, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        console.log("res",res);
        getUserInfo(user.id);
      })
      .catch((e) => {
        
        // alert(e.data.errors);
        console.log("N", e);
       
      });
  };
  const backClick = () => {
    setSelectedPage(constants.PAGES.SCRIPTS);
    //console.log("here");
  };
  return (
    <>
      <Row>
        <Header></Header>
      </Row>

      <Row>
        <Col lg="1">
          <SideBar
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
          ></SideBar>
        </Col>
        <Col>
        
        {loading === true && (<LoadingSpinner></LoadingSpinner>)}
          {selectedPage === constants.PAGES.TEXT_EDITOR ? (
            <>
              <div className="backButton" onClick={backClick}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="white"
                  class="bi bi-arrow-left-circle backButton"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"
                  />
                </svg>
              </div>
              <div className="docTitle">
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Control
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  />
                </Form.Group>
              </div>
            </>
          ) : null}
          
          {selectedPage === constants.PAGES.MEETING_ROOMS && (
            <ChatRoom user={user} setLoading = {setLoading}></ChatRoom>
          )}
          {selectedPage === constants.PAGES.HOME && <BardApiComp></BardApiComp>}
          {selectedPage === constants.PAGES.UPLOAD && <UploadPage />}
          {selectedPage === constants.PAGES.CALENDERVIEW && (
            <CalendarView></CalendarView>
          )}
          {selectedPage === constants.PAGES.SCRIPTS && (
            <Scripts
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
              setScriptId={setScriptId}
              userInfo = {userInfo}
              setLoading = {setLoading}
            ></Scripts>
          )}
          {selectedPage === constants.PAGES.TEXT_EDITOR && (
            <TextEditor
              scripId={scripId}
              title={title}
              setTitle={setTitle}
              userInfo ={userInfo}
              setLoading = {setLoading}
            ></TextEditor>
          )}
          {selectedPage === constants.PAGES.POST_VIEW && (
            <PostScheduleView userInfo={userInfo} setLoading = {setLoading}> </PostScheduleView>
          )}
          {selectedPage === constants.PAGES.TEAM && (
            <TeamManage user={user} userInfo={userInfo} changeLastLogin = {changeLastLogin} setLoading = {setLoading}></TeamManage>
          )}
        </Col>
      </Row>

      {/* <Col  >
    <UploadPage></UploadPage>
    </Col> */}
    </>
  );
}

export default Dashboard_;
