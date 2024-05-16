import React, { useEffect } from "react";
import "../styling/scripts.css";
import { Container, Col, Row, Button } from "react-bootstrap";
import constants from "../constants.json";
import { useState } from "react";
import {v4 as uuidV4 } from "uuid"
import axios from "axios";
function Scripts({ selectedPage, setSelectedPage, setScriptId,userInfo, setLoading }) {
  const [allScript,setAllScript] = useState([]);
 
  // useEffect( ()=>{
  //    axios.get(process.env.REACT_APP_GET_ALL_SCRIPT, { headers:{Authorization: 'Bearer ' + localStorage.getItem('token')}})
  //   .then((res) => {
  //     setAllScript(res.data);
  //     console.log("all script",res.data);
  //   }).catch((e) => {
  //     console.log(e);
  //   })
  // },[]);
  useEffect(  ()=>{
    const fetchData = async () => {if(!userInfo.user.lastLogin) return;
      setLoading(true);
      await fetchScripts();
     setLoading(false);}
     fetchData();
 },[]);

 useEffect( ()=>{ const fetchData = async () => {if(!userInfo.user.lastLogin) return;
  setLoading(true);
  await fetchScripts();
 setLoading(false);}
 fetchData();
},[userInfo]);

const fetchScripts = async () => {
  await axios.get(process.env.REACT_APP_GET_SCRIPTS_BY_TEAMID + '/' + userInfo.user.lastLogin, { headers:{Authorization: 'Bearer ' + localStorage.getItem('token')}})
 .then((res) => {
   setAllScript(res.data);
   console.log("all script",res.data);
 }).catch((e) => {
   console.log(e);
 })

}
  const handleClick =() =>{
    setSelectedPage(constants.PAGES.TEXT_EDITOR);
    setScriptId(uuidV4());
    console.log("page",uuidV4());
  }
  return (
    <div className="script-container">
      <Row>
        <Col lg={2}>
          <div className="" onClick={handleClick}>
            <svg
             
              xmlns="http://www.w3.org/2000/svg"
              width="200"
              height="200"
              fill="currentColor"
              class="bi bi-file-earmark-plus newDoc"
              viewBox="0 0 16 16"
            >
              <path d="M8 6.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 .5-.5" />
              <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5z" />
            </svg>
          </div>
        </Col>
        {
          allScript.map((item) => (
            <Col lg={2}>
            <div className="docThumbnail" onClick={() => {
              setScriptId(item._id); setSelectedPage(constants.PAGES.TEXT_EDITOR);
              console.log('script id',item._id)}}>
                
                    <p className="docText"><b>Title:</b> {item.title}</p>
                    {/* <p className="docText">Status: {item._id}</p> */}
                
              </div>
              </Col>
          ))
        }
        
        {/* <Col lg={2}>
          <div className="docThumbnail"></div>
        </Col> */}
      </Row>
    </div>
  );
}

export default Scripts;
