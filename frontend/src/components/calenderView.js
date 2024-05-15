import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styling/calender.css";
import constants from "../constants.json";
import { useNavigate } from "react-router-dom"
import axios from 'axios';
const CalendarView = () => {
  let emptyDispObj = {
    id: "",
    date: "",
    title: "",
    Link: "",
    img: "../assets/download (1).jpg",
  };
  const [date, setDate] = useState(new Date());
  const [displayedInfo, setDisplayedInfo] = useState(emptyDispObj);
  const [allContent, setAllContent] = useState([]);
  const [scheduledContent, setScheduledContent] = useState([
    {
      id: "1",
      date: "Wed Nov 01 2023",
      title: "El dorado Mystery!",
      Link: "url//.com",
      img: "../assets/download (1).jpg",
    },
    {
      id: "2",
      date: "Fri Nov 03 2023",
      title: "Atlentis Mytery!",
      Link: "url//.com",
      img: "../assets/HD-wallpaper-movie-atlantis-the-lost-empire-thumbnail.jpg",
    },
    {
      id: "3",
      date: "Sun Nov 05 2023",
      title: "Kerla Mystery!",
      Link: "url//.com",
    },
  ]);
  const [notScheduledContent, setNotScheduledContent] = useState([
    {
      id: "4",
      date: "Mon Nov 06 2023",
      title: "Diwali History!",
      Link: "url//.com",
      img: "../assets/download (1).jpg",
    },
    {
      id: "5",
      date: "Tue Nov 07 2023",
      title: "Black Hawak Down!",
      Link: "url//.com",
      img: "../assets/HD-wallpaper-movie-atlantis-the-lost-empire-thumbnail.jpg",
    },
    {
      id: "6",
      date: "Wed Nov 08 2023",
      title: "Mosad Operation!",
      Link: "url//.com",
    },
  ]);
  useEffect(() => {
    fetchInfoOnDate(date.toDateString());
  }, [date]);

  useEffect(() => {
    getAllPost();
  }, []);
  useEffect(() => {
   filterScheduledAndNotScheduled();
    // fetchInfoOnDate(date.toDateString());
  }, [allContent]);
  useEffect(() => {
    // filterScheduledAndNotScheduled();
     fetchInfoOnDate(date.toDateString());
   }, [scheduledContent,notScheduledContent]);


  const getAllPost = async () => {
    await axios.get(process.env.REACT_APP_GET_ALL_POST, { headers:{Authorization: 'Bearer ' + localStorage.getItem('token')}})
    .then((res) => {
      setAllContent(res.data);
      console.log('get all post api',res.data);
      return res.data;
    })
    .catch((e) => {
      console.log(e);
      return Promise.reject(e);
    })
   
  };

  const filterScheduledAndNotScheduled = () => {
     let newScheduledContent = allContent.filter(obj => obj['scheduled'] === true);
     let newNotScheduledContent = allContent.filter(obj => obj['scheduled'] === false);
     console.log('scheduledContent' , newScheduledContent);
     console.log('not scheduledContent' , newNotScheduledContent);
     setScheduledContent(newScheduledContent);
     setNotScheduledContent(newNotScheduledContent);


  };

  const  updatePost = async post => {

    
    
    await axios.put(process.env.REACT_APP_UPDATE_POST + '/'+ post._id, post, { headers:{Authorization: 'Bearer ' + localStorage.getItem('token')}})
    .then((res) => {
      console.log("update put api",res.data);
      return res.data;
    })
    .catch((e) => {
      console.log(e);
      return Promise.reject(e);
    })
    
  }
  // let scheduledContent = [
  //   {
  //     date: "2023-11-02T18:30:00.000Z",
  //     title: "El dorado Mystery!",
  //     Link: "url//.com",
  //     img: "../assets/download (1).jpg"
  //   },
  //   {
  //     date: "2023-11-04T18:30:00.000Z",
  //     title: "Atlentis Mytery!",
  //     Link: "url//.com",
  //     img: "../assets/HD-wallpaper-movie-atlantis-the-lost-empire-thumbnail.jpg"
  //   },
  //   {
  //     date: "2023-11-06T18:30:00.000Z",
  //     title: "Kerla Mystery!",
  //     Link: "url//.com",
  //   },
  // ];

  function fetchInfoOnDate(date) {
    console.log('fetch info date', date);
    console.log('fetch info date scheduled content', scheduledContent);
    let foundObj = scheduledContent.find((item) => {
      return item.date === date;
    });

    if (foundObj) {
      setDisplayedInfo(foundObj);
    } else {
      emptyDispObj.date = date;
      setDisplayedInfo(emptyDispObj);
    }
    console.log('fetch indo obj found',foundObj);
  }
  function deleteObjectById(array, id) {
    let newArray = array.filter((item) => item._id !== id);
    return newArray;
  }
  function getDate() {
    const currentDate = new Date();
    currentDate.setHours(18, 30, 0, 0);
    const formattedDate = currentDate.toDateString();

    return formattedDate;
  }
  const handleDelete = (param, data) => async (event) => {
    let newNotScheduledContent = [...notScheduledContent];
    if (param === constants.CONTENT.SCHEDULED) {
      
      let content = displayedInfo;
      setDisplayedInfo(emptyDispObj);
      // let newScheduledContent = [...scheduledContent];
      // newScheduledContent = deleteObjectById(newScheduledContent, content.id);
      // newNotScheduledContent.push(content);
      // setDisplayedInfo(emptyDispObj);
      // setScheduledContent(newScheduledContent);
      // setNotScheduledContent(newNotScheduledContent);
      content.scheduled = false;
     await updatePost(content);
     await getAllPost();
       
    } else {
      newNotScheduledContent = deleteObjectById(
        newNotScheduledContent,
        data.id
      );
      console.log(newNotScheduledContent);
      setNotScheduledContent(newNotScheduledContent);
    }
  };


  function handleDrag(e, item) {
    e.dataTransfer.setData("item", JSON.stringify(item));
  }


  async function handleDrop(e) {
    let item = e.dataTransfer.getData("item");
    if (item) {
      item = JSON.parse(item);
    }
    console.log(item.title);
    // // handleDelete(constants.CONTENT.NOT_SCHEDULED,item);
    // let newNotScheduledContent = [...notScheduledContent];
   
    // newNotScheduledContent = deleteObjectById(newNotScheduledContent, item._id);
    // console.log('handle drop new not scheduled',newNotScheduledContent);
    // setNotScheduledContent(newNotScheduledContent);
    // item.date = date.toDateString();
    // item.scheduled = true;
    // setDisplayedInfo(item);
    // let newScheduledContent = [...scheduledContent];
    // newScheduledContent.push(item);
    // setScheduledContent(newScheduledContent);
    // console.log('handle drop new scheduled',newScheduledContent);
    
      item.date = date.toDateString();
    item.scheduled = true;
    
    try {
      let result = await updatePost(item);
      console.log("drop result ", result);
  
      // Now that updatePost is complete, call getAllPost
      await getAllPost();
  
      // Continue with the rest of your logic
      // setDisplayedInfo(item);
  
      // ... other logic ...
  
    } catch (error) {
      console.error("Error updating post:", error);
      // Handle the error if the update fails
    }

  }

  
  function handleDragOver(e) {
    e.preventDefault();
  }
  return (
    <>
      <div className="calendar-view-body">
        <Row>
          <Col lg="6">
            <div
              className="dateInfo"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <p className="text-center">
              <span className="bold"></span> {date.toDateString()}
            </p>
              {displayedInfo.id !== "" ? (
                <><div
                  className="delete-icon-scheduled"
                  id="scheduled"
                  onClick={handleDelete(constants.CONTENT.SCHEDULED, {})}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="grey"
                    class="bi bi-x-circle-fill"
                    viewBox="0 0 16 16"
                    id="scheduled"
                  >
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                  </svg>
                </div><div className="dateInfo-inner">

                    <Row>

                      <>
                        <Col lg="8">
                          <h1 className="title-text">
                            Title: {displayedInfo.title}
                          </h1>
                          <h1 className="title-text">
                            Scheduled: {displayedInfo.date}
                          </h1>
                        </Col>
                        <Col lg="4">
                          <img
                            class="cover-image"
                            src={require("../assets/download (1).jpg")}
                            alt="Your Image Description"
                          ></img>
                        </Col>
                      </>

                    </Row>
                  </div></>
               ) : null}
            </div>
          </Col>
          <Col>
            <div className="calendar-container">
              <Calendar onChange={setDate} value={date} />
            </div>
            
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="notScheduled">
              {notScheduledContent.map((item, index) => (
                <div
                  className="notScheduled-items"
                  draggable
                  onDragStart={(e) => handleDrag(e, item)}
                >
                  <div className="delete-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="grey"
                      class="bi bi-x-circle-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                    </svg>
                  </div>
                  <h1 className="notScheduled-items-title">{item.title}</h1>
                  {/* <h1 className="notScheduled-items-title">Prev Date: {item.date}</h1> */}
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default CalendarView;
