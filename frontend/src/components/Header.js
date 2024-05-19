import React, { useContext } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ThemeContext } from "../context/ThemeContext";
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
          
          <img src ={ theme === "light" ? require('../assets/kretaParklogo.png') : require('../assets/kretaParklogo2.png')} width={150} style={{padding:'15px'}}></img>
        </Col>
        <Col lg="6"></Col>
        <Col lg="2">
          
          <Button
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
          </Button>
          <Button
            className="lightButton"
            style={{ float: "right", marginTop: "10px" }}
            onClick={logoutAction}
          >
            Log Out
          </Button>
        </Col>
      </Row>
    </div>
  );
}
