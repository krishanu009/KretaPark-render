import React, { useRef, useEffect, useState, useContext } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Form } from "react-bootstrap";
import "../styling/meeting.css";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";
import { io } from "socket.io-client";
import axios from "axios";
import { ThemeContext } from "../context/ThemeContext";
function ChatRoom({ user, setLoading }) {
  // console.log("user", user);
  const { theme, setTheme } = useContext(ThemeContext);
  const messagesContainerRef = useRef(null);
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState();
  const [messageRoomId, setMessageRoomId] = useState("");
  const [messagesRecieved, setMessagesReceived] = useState([]);
  const [messageRooms, setmessageRooms] = useState([]);
  const [roomMembers, setRoomMembers] = useState([]);
  const [show, setShow] = useState(false);
  const [showNewMem, setShowNewMem] = useState(false);
  const [newChanelName, setNewChanelName] = useState();
  const [newMemEmail, setNewMemEmail] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [newMemMessage, setNewMemMessage] = useState("");
  useEffect(() => {
    if (!socket) return;
    socket.on("receive_message", (data) => {
      console.log("receive_message", data);
      setMessagesReceived((state) => [
        ...state,
        {
          userId: data.userId,
          message: data.message,
          username: data.username,
          __createdtime__: data.__createdtime__,
        },
      ]);
    });
    // Remove event listener on component unmount
    return () => socket.off("receive_message");
  }, [socket]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(process.env.REACT_APP_FIND_ROOM_BY_MEMBER_ID + "/" + user.id, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        //  setAllScript(res.data);
        if(!res.data.length) return;
        setmessageRooms(res.data);
        setMessageRoomId(res.data[0]._id || "");
        setRoomMembers(res.data[0].members || []);
        console.log("my rooms", res.data);
      })
      .catch((e) => {
        console.log(e);
      });
      setLoading(false);
  }, []);

  useEffect(() => {
    // Scroll to the bottom when new messages are added
    messagesContainerRef.current.scrollTop =
      messagesContainerRef.current.scrollHeight;
  }, [messagesRecieved]);

  const sendMessage = () => {
    if (message !== "") {
      const __createdtime__ = Date.now();
      let username = user.userName;
      let room = messageRoomId;
      // Send message to server. We can't specify who we send the message to from the frontend. We can only send to server. Server can then send message to rest of users in room
      socket.emit("send_message", {
        userId: user.id,
        username,
        room,
        message,
        __createdtime__,
      });

      setMessage("");
    }
  };

  function formatDateFromTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseNewMem = () => setShowNewMem(false);
  const handleShowNewMem = () => setShowNewMem(true);
  const addNewMember = async () => {
    if (!newMemEmail) {
      setNewMemMessage("Please Enter an Email");
      return;
    }
    let payload = {
      roomId: messageRoomId,
      email: newMemEmail,
    };

    await axios
      .post(process.env.REACT_APP_ADD_TO_ROOM, payload, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        //  setAllScript(res.data);
        axios
          .get(process.env.REACT_APP_FIND_ROOM_BY_MEMBER_ID + "/" + user.id, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((res) => {
            //  setAllScript(res.data);
            setmessageRooms(res.data);
            // setRoomMembers(messageRooms);
            console.log("my rooms", res.data);
            setNewMemEmail("");
            setShowNewMem(false);
          })
          .catch((e) => {
            console.log(e);
          });

        console.log("nnew member", res.data);
      })
      .catch((e) => {
        console.log("error", e);
        // console.log("error",e.response.data.error);
        if (e.response.data) {
          setNewMemMessage(e.response.data.error);
        }
      });
  };
  const createNewChanel = async () => {
    if (!newChanelName) {
      setErrorMessage("Please Enter a Chanel Name!");
      return;
    }

    let payload = {
      roomName: newChanelName,
      memberId: user.id,
      memberName: user.userName,
    };
    await axios
      .post(process.env.REACT_APP_CREATE_A_ROOM, payload, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        //  setAllScript(res.data);
        axios
          .get(process.env.REACT_APP_FIND_ROOM_BY_MEMBER_ID + "/" + user.id, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((res) => {
            //  setAllScript(res.data);
            setmessageRooms(res.data);
            console.log("my rooms", res.data);
          })
          .catch((e) => {
            console.log(e);
          });

        console.log("new chanel", res.data);
      })
      .catch((e) => {
        console.log(e);
      });

    setNewChanelName("");
    setShow(false);
  };
  // useEffect(()=>{
  //   console.log('called',messageData.text);
  //   if(!messageData.text) return;
  //   sendMessage(messageData);
  //   setMessageData('');
  // },[messageData]);

  useEffect(() => {
    // const s = io("http://localhost:3001");
    const s = io();
    setSocket(s);
    // console.log("socket", s);
    // console.log("user", user);
    if (messageRoomId !== "" && user.userName !== "") {
      let userName = user.userName;
      s.emit("join_room", { username: userName, room: messageRoomId });
      console.log("join room emitted");
      //   s.emit("get_all_messages", messageRoomId);

      // s.on("all_messages", (data) => {
      //   console.log("all_messages",data);
      //   setMessageData(data);
      // });
    }
    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!messageRoomId || !socket) return;
    socket.emit("join_room", { username: user.userName, room: messageRoomId });
    socket.emit("get_all_messages", messageRoomId);

    socket.on("all_messages", (data) => {
      console.log("all_messages hrer", data);
      setMessagesReceived(data);
    });
  }, [socket, messageRoomId, messageRooms]);

  // useEffect(()=> {
  //   let data = {
  //     user:{name:'rajesh',id:'345345'},
  //     text:message,
  //     time:'2/07/2028'
  //   }
  // socket.emit('send-message',data);

  // },[message])

  return (
    <>
      <Modal show={show} onHide={handleClose} data-bs-theme={theme}>
        <Modal.Header closeButton>
          <Modal.Title>New Chanel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            size="sm"
            type="text"
            placeholder="#Chanel Name"
            value={newChanelName}
            onChange={(e) => {
              setNewChanelName(e.target.value);
              console.log(newChanelName);
            }}
          />
          <p>{errorMessage}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="light" onClick={createNewChanel}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showNewMem} onHide={handleCloseNewMem} data-bs-theme={theme}>
        <Modal.Header closeButton>
          <Modal.Title>New Member</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            size="sm"
            type="text"
            placeholder="Member Email.."
            value={newMemEmail}
            onChange={(e) => {
              setNewMemEmail(e.target.value);
            }}
          />
          <p>{newMemMessage}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseNewMem}>
            Close
          </Button>
          <Button variant="light" onClick={addNewMember}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Row>
        <Col lg="3" className="chat-sideBar">
          <div className="newChanelButtonDiv">
            <Button onClick={handleShow} className="button">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-plus-square"
                viewBox="0 0 16 16"
              >
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
              </svg>{" "}
              NEW CHANEL
            </Button>
          </div>
          <div className="chanelList">
            <br></br>
            {messageRooms.map((item, index) => (
              <div
                className={item._id === messageRoomId ? "chanelSelected" : " "}
                onClick={(e) => {
                  setMessageRoomId(item._id);
                  setRoomMembers(item.members);
                  console.log("members", item.members);
                }}
              >
                #{item.roomName}
              </div>
            ))}
          </div>
          <br></br>
        </Col>
        <Col lg="9" className="chat-area">
          <div className="chatAreaHeader">
            <Row>
              <Col lg="9"></Col>

              <Col lg="1">
                <div className="participantsIcon">
                  <Dropdown>
                    <Dropdown.Toggle
                      className="addMemberButton"
                      id="dropdown-basic"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-people-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
                      </svg>
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="addMemberButton">
                      {roomMembers.map((item, index) => (
                        <Dropdown.Item className="addMemberButton" key={index}>
                          {item.name}
                        </Dropdown.Item>
                      ))}

                      {/* onClick={()=>{
                  setShowNewMem(true) */}
                      <Dropdown.Item className="addMemberButton">
                        <div
                          onClick={() => {
                            setShowNewMem(true);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-person-plus"
                            viewBox="0 0 16 16"
                          >
                            <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                            <path
                              fill-rule="evenodd"
                              d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5"
                            />
                          </svg>
                        </div>
                      </Dropdown.Item>

                      {/* <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">
                    Another action
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-3">
                    Something else
                  </Dropdown.Item> */}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </Col>
            </Row>
          </div>
          <div className="messagesShow" ref={messagesContainerRef}>
            {messagesRecieved.map((item, index) => (
              <div
                key={index}
                className={
                  item.userId === user.id ? "yourMessage" : "otherMessage"
                }
              >
                <span className="senderName">{item.username}</span>
                {item.message}
                <span className="receivedTime">
                  {formatDateFromTimestamp(item.__createdtime__)}
                </span>
              </div>
            ))}
          </div>

          <div className="writeMessage">
            <Row>
              <Col lg="10">
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                    data-bs-theme={theme}
                  >
                    <Form.Control
                      as="textarea"
                      rows={1}
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                      }}
                    />
                  </Form.Group>
                </Form>
              </Col>
              <Col lg="2">
              <Button variant="success"> 
              <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="white"
                    class="bi bi-send"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                  </svg>
              </Button>
                {/* <div className="sendButton" onClick={sendMessage}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50"
                    height="50"
                    fill="white"
                    class="bi bi-send"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                  </svg>
                </div> */}
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default ChatRoom;
