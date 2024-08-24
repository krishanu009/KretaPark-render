import React, { useContext } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ThemeContext } from "../context/ThemeContext";
import "../styling/header.css";
export default function Header() {
  const { theme, setTheme } = useContext(ThemeContext);

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
    localStorage.removeItem('token');
    navigate("/");
  };

  const handleTheme = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
    console.log("theme", theme);
  };
  return (
    <div className="header-body">
      <Row>
        <Col lg="4">
          <img className="logo" src={require("../assets/logoaug24.png")}></img>
          {/* <img src ={ theme === "light" ? require('../assets/kretaParklogo.png') : require('../assets/kretaParklogo2.png')} width={150} style={{padding:'15px'}}></img> */}
        </Col>
        <Col lg="6"></Col>
        <Col lg="2">

          {/* <Button
            // variant="dark"
            style={{ marginTop: "10px" }}
            onClick={handleTheme}
            className="lightButton"
          >
            {theme === "dark" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="white"
                class="bi bi-lightbulb"
                viewBox="0 0 16 16"
              >
                <path d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13a.5.5 0 0 1 0 1 .5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1 0-1 .5.5 0 0 1 0-1 .5.5 0 0 1-.46-.302l-.761-1.77a2 2 0 0 0-.453-.618A5.98 5.98 0 0 1 2 6m6-5a5 5 0 0 0-3.479 8.592c.263.254.514.564.676.941L5.83 12h4.342l.632-1.467c.162-.377.413-.687.676-.941A5 5 0 0 0 8 1" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="white"
                class="bi bi-lightbulb-fill"
                viewBox="0 0 16 16"
              >
                <path d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13h-5a.5.5 0 0 1-.46-.302l-.761-1.77a2 2 0 0 0-.453-.618A5.98 5.98 0 0 1 2 6m3 8.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1-.5-.5" />
              </svg>
            )}
          </Button> */}
          <div className="flex flex-wrap">
          <label class="ui-switch p-[8%]">
            <input
              onChange={handleTheme}
              checked={theme === "dark"}
              type="checkbox"
            />
            <div class="slider">
              <div class="circle"></div>
            </div>
          </label>

          {/* <button onClick={logoutAction} class="logout-Btn mt-[6%] ml-2">
            <div class="sign2">
              <svg viewBox="0 0 512 512">
                <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
              </svg>
            </div>

            <div class="text2">Logout</div>
          </button> */}
          </div>
          

          {/* <Button
            className="lightButton"
            style={{ float: "right", marginTop: "10px" }}
            onClick={logoutAction}
          >
            Log Out
          </Button> */}
         
        </Col>
      </Row>
    </div>
  );
}
