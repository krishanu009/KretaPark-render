import React, { useRef, useEffect, useState, useContext } from "react";
import { Row, Col, Button, ListGroup } from "react-bootstrap";
import { ThemeContext } from "../context/ThemeContext";
import axios from "axios";
import "../styling/team.css";
function TeamManage({ user, userInfo, changeLastLogin }) {
  console.log("user", user);
  console.log("userInfo", userInfo);
  const { theme, setTheme } = useContext(ThemeContext);
  const [myTeams, setMyTeams] = useState([]);
  const [currTeam, setCurrTeam] = useState([]);
  const [displayTeams, setDisplayTeams] = useState([]);
  const [displayedLogin, setDisplayedLogin] = useState("");
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_GET_MY_TEAMS + "/" + user.id, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        console.log("get my teams result", res.data);
        setMyTeams(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    if (userInfo) {
      setCurrentLogin();
    }
  }, [myTeams, userInfo]);

  useEffect(() => {
    prepareDisplayTeams();
    console.log("currTeam", currTeam);
  }, [myTeams, currTeam]);

  const setCurrentLogin = () => {
    console.log("set last login", userInfo.user.lastLogin);
    if (userInfo.user.lastLogin) {
      setCurrTeam(userInfo.user.lastLogin);
      let findObj = myTeams.find(
        (item) => item._id === userInfo.user.lastLogin
      );
      if (findObj) {
        setCurrTeam(findObj._id);
        setDisplayedLogin(findObj.title);
      } else if (myTeams.length) {
        setCurrTeam(myTeams[0]._id);
        setDisplayedLogin(myTeams[0].title);
      }
    } else {
      console.log("kk0");
      if (myTeams.length) {
        setCurrTeam(myTeams[0]._id);
        setDisplayedLogin(myTeams[0].title);
      }
    }
  };

  const prepareDisplayTeams = () => {
    let tempDisplayItems = myTeams.filter((item) => item._id != currTeam);
    setDisplayTeams(tempDisplayItems);
  };

  return (
    <div class="mainBody">
      <Row>
      <h1 className="title">TEAMS</h1>
      </Row>
      <Row>
        {/* <div class="card">
            <div class="container">
              <h4>
                <b>John Doe</b>
              </h4>
              
            </div>
          </div> */}

        <Col lg="6">
         
              <div className="teamListMain">
               
                <h2 className="currentLogin">Logged in {displayedLogin}</h2>
                <ListGroup className="listView" data-bs-theme={theme}>
                  {/* <ListGroup.Item>Cras justo odio</ListGroup.Item>
        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
        <ListGroup.Item>Morbi leo risus</ListGroup.Item>
        <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
        <ListGroup.Item>Vestibulum at eros</ListGroup.Item> */}
                  {displayTeams.map((item, index) => (
                    <ListGroup.Item
                      id={item._id}
                      onClick={(event) => {
                        changeLastLogin(event.target.id);
                        console.log(event.target.id);
                      }}
                    >
                      {item.title}{" "}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </div>
            
        </Col>
        <Col lg="6">
          <div class="card width100">
            <div class="container">
              <h4>
                <b>John Doe</b>
              </h4>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default TeamManage;
