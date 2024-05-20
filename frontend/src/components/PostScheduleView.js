import "../styling/postScheduleView.css";
import React, { useRef, useEffect, useState, useContext } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import axios from "axios";
import Badge from "react-bootstrap/Badge";
import { ThemeContext } from "../context/ThemeContext";
function PostScheduleView({ userInfo, setLoading }) {
  const { theme, setTheme } = useContext(ThemeContext);
  const [allContent, setAllContent] = useState([]);
  const [scheduledContent, setScheduledContent] = useState([]);
  const [availableUsers, setAvailableUsers] = useState([
   
  ]);
  const [notScheduledContent, setNotScheduledContent] = useState([]);
  const [toDoContent, setTodoContent] = useState([]);
  const [inProgressContent, setInProgressContent] = useState([]);
  const [doneContent, setdoneContent] = useState([]);
  const [newTask, setNewTask] = useState();
  const [taskTitle, setTaskTitle] = useState();
  const [currAssigned, setCurrAssigned] = useState();
  const [allAssigned, setAllAssigned] = useState([]);
  const [errorMessage, setErrorMessage] = useState();
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedRoleId, setSelectedRoleId] = useState("");
  const [status, setStatus] = useState("todo");
  const roles = ["editor", "lead", "member", "writer"];
  const [editId, setEditId] = useState();
  const [editMode, setEditMode] = useState(false);
  const [selectedScriptId, setSelectedScriptId] = useState({
    id: "",
    name: "",
  });
  const [availableScript, setAvailableScript] = useState([]);

  useEffect(() => {
    if(!userInfo.user) return;
    getAllScript();
    getTeamMembers();
  }, [userInfo]);
  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      await getAllPost();
      setLoading(true);
    };
    fetchPost();
  }, []);
  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      await getAllPost();
      setLoading(true);
    };
    fetchPost();
  }, [userInfo]);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await filterByStatus();
      setLoading(false);
    };

    fetchData();
  }, [allContent]);
  function isEmptyObject(obj) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false;
      }
    }
    return true; // Object is empty
  }

  const getAllPost = async () => {
    console.log("post user info", userInfo);
    console.log("post user info empt", isEmptyObject(userInfo));
    if (isEmptyObject(userInfo)) return;
    console.log("post user info last login", userInfo.user.lastLogin);

    await axios
      .get(process.env.REACT_APP_GET_ALL_POST + "/" + userInfo.user.lastLogin, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        setAllContent(res.data);
        console.log("get all post api", res.data);
        return res.data;
      })
      .catch((e) => {
        console.log(e);
        return Promise.reject(e);
      });
  };
  const getAllScript = async () => {
    await axios
      .get(process.env.REACT_APP_GET_SCRIPTS_BY_TEAMID +  '/' + userInfo.user.lastLogin, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        setAvailableScript(res.data);
        console.log("get all script api", res.data);
        return res.data;
      })
      .catch((e) => {
        console.log(e);
        return Promise.reject(e);
      });
  };

  const getTeamMembers = async () => {
    

    await axios
    .get(process.env.REACT_APP_GET_MEMBERS +  '/' + userInfo.user.lastLogin, {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    })
    .then((res) => {
      setAvailableUsers(res.data);
      console.log("get tem members", res.data);
      return res.data;
    })
    .catch((e) => {
      console.log(e);
      return Promise.reject(e);
    });

  }
  // const filterScheduledAndNotScheduled = () => {
  //   let newScheduledContent = allContent.filter(
  //     (obj) => obj["scheduled"] === true
  //   );
  //   let newNotScheduledContent = allContent.filter(
  //     (obj) => obj["scheduled"] === false
  //   );
  //   console.log("scheduledContent", newScheduledContent);
  //   console.log("not scheduledContent", newNotScheduledContent);
  //   setScheduledContent(newScheduledContent);
  //   setNotScheduledContent(newNotScheduledContent);
  // };

  const filterByStatus = async () => {
    let newToDoContent = allContent.filter((obj) => obj["status"] === "todo");

    let newInProgressContent = allContent.filter(
      (obj) => obj["status"] === "inprogress"
    );

    let newDoneContent = allContent.filter((obj) => obj["status"] === "done");

    setTodoContent(newToDoContent);
    setInProgressContent(newInProgressContent);
    setdoneContent(newDoneContent);
  };

  const updatePost = async (post) => {
    await axios
      .put(process.env.REACT_APP_UPDATE_POST + "/" + post._id, post, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        getAllPost();
        console.log("update put api", res.data);
        return res.data;
      })
      .catch((e) => {
        console.log(e);
        return Promise.reject(e);
      });
  };

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setAllAssigned([]);
    setTaskTitle("");
    setCurrAssigned();
    setShow(false);
    setErrorMessage("");
    setSelectedScriptId({ id: "", name: "" });
  };

  const handleShow = () => setShow(true);
  const handleUserChange = (event) => {
    let user = availableUsers.find((item) => {
      return item.id === event.target.value;
    });
    console.log(user);
    setCurrAssigned({ id: user.id, name: user.name, role: "" });
    setSelectedUserId(user.id);
  };
  const addAssigned = () => {
    if (!currAssigned) {
      setErrorMessage("Please select a user");
      return;
    }

    if (!selectedRoleId) {
      setErrorMessage("Please select a role");
      return;
    }
    console.log(currAssigned);
    let assigned = allAssigned;
    assigned.push(currAssigned);
    console.log(assigned);
    setAllAssigned(assigned);
    setCurrAssigned();
    setErrorMessage("");
    setSelectedRoleId("");
    setSelectedUserId("");
  };
  const handleRoleChange = (event) => {
    if (!currAssigned) {
      setErrorMessage("Please select a user");
      return;
    }
    let user = currAssigned;
    user.role = event.target.value;
    setCurrAssigned(user);
    setSelectedRoleId(user.role);
    setErrorMessage("");
  };

  const handleCreate = async () => {
    if (!taskTitle) {
      setErrorMessage("Please add a title");
      return;
    }

    if (editMode) {
      let payload = {
        _id: editId,
        title: taskTitle,
        scheduled: "no",
        scriptId: selectedScriptId,
        status: status,
        assigned: allAssigned,
        companyId: userInfo.user.lastLogin,
      };
      updatePost(payload);

      setShow(false);
      setCurrAssigned();
      setSelectedRoleId("");
      setSelectedUserId("");
      setStatus("todo");
      setEditMode(false);
      setEditId("");
      setSelectedScriptId({ id: "", name: "" });
      setTaskTitle("");
    } else {
      let payload = {
        title: taskTitle,
        scheduled: "no",
        scriptId: selectedScriptId,
        date: new Date(),
        status: status,
        assigned: allAssigned,
        companyId: userInfo.user.lastLogin,
      };
      await axios
        .post(process.env.REACT_APP_CREATE_NEW_POST, payload, {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          // setAllContent(res.data);
          getAllPost();
          console.log("create new post api", res.data);
          return res.data;
        })
        .catch((e) => {
          console.log(e);
          return Promise.reject(e);
        });
    }

    setShow(false);
    setCurrAssigned();
    setSelectedRoleId("");
    setSelectedUserId("");
    setStatus("todo");
    setSelectedScriptId("");
    setTaskTitle("");
  };
  const editContent = (id) => {
    // console.log(id);
    setEditId(id);
    setEditMode(true);
    setShow(true);
    let editObj = allContent.find((item) => item._id === id);
    setTaskTitle(editObj.title);
    setStatus(editObj.status);
    setAllAssigned(editObj.assigned);
    setSelectedScriptId(editObj.scriptId);
  };

  function handleDrag(e, item) {
    e.dataTransfer.setData("item", JSON.stringify(item));
  }

  async function handleDrop(e, dropArea) {
    let item = e.dataTransfer.getData("item");
    if (item) {
      item = JSON.parse(item);
    }
    if (dropArea === item.status) return;
    console.log(item.title);
    console.log(e);
    // item.date = date.toDateString();
    item.status = dropArea;

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
  const handleScriptChange = (e) => {
    let obj = availableScript.find((item) => item._id === e.target.value);
    if (!obj) {
      setSelectedScriptId({ id: "", name: "" });
      return;
    } else {
      setSelectedScriptId({ id: obj._id, name: obj.title });
    }
  };
  const formatDate = (date) =>
    new Date(date).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });

  return (
    <>
      <Modal show={show} onHide={handleClose} data-bs-theme={theme}>
        <Modal.Header closeButton>
          <Modal.Title>Content</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            size="sm"
            type="text"
            value={taskTitle}
            placeholder="Title/summery"
            onChange={(e) => {
              setTaskTitle(e.target.value);
            }}
          />
          <br></br>
          <Row>
            <Col lg="6">
              <Form.Select
                size="sm"
                value={selectedScriptId.id}
                onChange={(e) => {
                  handleScriptChange(e);
                }}
              >
                <option value="">select script</option>
                {availableScript.map((item) => (
                  <option value={item._id}>{item.title}</option>
                ))}
              </Form.Select>
            </Col>
            <Col lg="6">
              <Form.Select
                size="sm"
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
              >
                <option value="todo">To Do</option>
                <option value="inprogress">In Progress</option>
                <option value="done">Done</option>
              </Form.Select>
            </Col>
          </Row>
          <br></br>
          <Row>
            <Col lg="12">
              {allAssigned.map((item) => (
                <>
                  <Badge bg="secondary">
                    {item.name}({item.role})
                  </Badge>
                  <br></br>
                </>
              ))}
            </Col>
          </Row>
          <br></br>
          <Row>
            <Col lg="7">
              <Form.Select
                size="sm"
                value={selectedUserId}
                onChange={handleUserChange}
              >
                <option value="">select user</option>
                {availableUsers.map((item) => (
                  <option value={item.id}>{item.name}</option>
                ))}
              </Form.Select>
            </Col>
            <Col lg="3">
              <Form.Select
                size="sm"
                value={selectedRoleId}
                onChange={handleRoleChange}
              >
                <option value="">select role</option>
                {roles.map((item) => (
                  <option value={item}>{item}</option>
                ))}
              </Form.Select>
            </Col>
            <Col lg="2">
              <Button variant="secondary" onClick={addAssigned}>
                ADD
              </Button>
            </Col>
          </Row>
          <Row>{errorMessage}</Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="light" onClick={handleCreate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="mainView">
        <Row>
          <Col lg="2">
            <span className="titleText">Content Board</span>
          </Col>
          <Col lg="2">
            <Button variant="primary" onClick={handleShow}>
              Create
            </Button>
          </Col>
        </Row>
        <Row>
          <Col lg="3">
            <div className="listTitle">
              <span className="colTitle">To Do </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-hourglass-top"
                viewBox="0 0 16 16"
              >
                <path d="M2 14.5a.5.5 0 0 0 .5.5h11a.5.5 0 1 0 0-1h-1v-1a4.5 4.5 0 0 0-2.557-4.06c-.29-.139-.443-.377-.443-.59v-.7c0-.213.154-.451.443-.59A4.5 4.5 0 0 0 12.5 3V2h1a.5.5 0 0 0 0-1h-11a.5.5 0 0 0 0 1h1v1a4.5 4.5 0 0 0 2.557 4.06c.29.139.443.377.443.59v.7c0 .213-.154.451-.443.59A4.5 4.5 0 0 0 3.5 13v1h-1a.5.5 0 0 0-.5.5m2.5-.5v-1a3.5 3.5 0 0 1 1.989-3.158c.533-.256 1.011-.79 1.011-1.491v-.702s.18.101.5.101.5-.1.5-.1v.7c0 .701.478 1.236 1.011 1.492A3.5 3.5 0 0 1 11.5 13v1z" />
              </svg>
            </div>
          </Col>
          <Col lg="3">
            <div className="listTitle">
              <span className="colTitle">In Progress </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-hourglass-split"
                viewBox="0 0 16 16"
              >
                <path d="M2.5 15a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1zm2-13v1c0 .537.12 1.045.337 1.5h6.326c.216-.455.337-.963.337-1.5V2zm3 6.35c0 .701-.478 1.236-1.011 1.492A3.5 3.5 0 0 0 4.5 13s.866-1.299 3-1.48zm1 0v3.17c2.134.181 3 1.48 3 1.48a3.5 3.5 0 0 0-1.989-3.158C8.978 9.586 8.5 9.052 8.5 8.351z" />
              </svg>
            </div>
          </Col>
          <Col lg="3">
            <div className="listTitle">
              <span className="colTitle">Done </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="green"
                class="bi bi-check2"
                viewBox="0 0 16 16"
              >
                <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0" />
              </svg>
            </div>
          </Col>
        </Row>

        <Row className="taskView">
          <Col lg="3">
            <div
              className="toDoList"
              onDrop={(e) => handleDrop(e, "todo")}
              onDragOver={handleDragOver}
            >
              {toDoContent.map((item, index) => {
                const formattedDate = formatDate(item.date);
                return (
                  <div
                    key={index}
                    className="task"
                    draggable
                    onDragStart={(e) => handleDrag(e, item)}
                  >
                    <div
                      className="edit"
                      onClick={() => {
                        editContent(item._id);
                      }}
                    >
                      <svg
                        className="editPen"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-pencil-square"
                        viewBox="0 0 16 16"
                      >
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path
                          fill-rule="evenodd"
                          d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                        />
                      </svg>
                    </div>

                    <div className="taskTitle">{item.title}</div>

                    <div className="taskDate">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-calendar-check"
                        viewBox="0 0 16 16"
                      >
                        <path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0" />
                        <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
                      </svg>
                      &nbsp;{formattedDate}
                    </div>
                    <div className="taskScript">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-file-earmark-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2m5.5 1.5v2a1 1 0 0 0 1 1h2z" />
                      </svg>
                      &nbsp;{item.scriptId.name}
                    </div>

                    <div className="assigned">
                      {item.assigned &&
                        item.assigned.map((a, i) => (
                          <Badge bg="secondary">
                            {a.name}({a.role})
                          </Badge>
                        ))}

                      {/* <Badge bg="secondary">Secondary</Badge>
              <Badge bg="success">Success</Badge>
              <Badge bg="danger">Danger</Badge>
              <Badge bg="warning" text="dark">
                Warning
              </Badge>
              <Badge bg="info">Info</Badge>
              <Badge bg="light" text="dark">
                Light
              </Badge>
              <Badge bg="dark">Dark</Badge> */}
                    </div>
                  </div>
                );
              })}
              
            </div>
          </Col>
          <Col lg="3">
            <div
              className="inProgress"
              onDrop={(e) => handleDrop(e, "inprogress")}
              onDragOver={handleDragOver}
            >
              {inProgressContent.map((item, index) => {
                const formattedDate = formatDate(item.date);
                return (
                  <div
                    key={index}
                    className="task"
                    draggable
                    onDragStart={(e) => handleDrag(e, item)}
                  >
                    <div
                      className="edit"
                      onClick={() => {
                        editContent(item._id);
                      }}
                    >
                      <svg
                        className="editPen"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-pencil-square"
                        viewBox="0 0 16 16"
                      >
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path
                          fill-rule="evenodd"
                          d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                        />
                      </svg>
                    </div>
                    <div className="taskTitle">{item.title}</div>

                    <div className="taskDate">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-calendar-check"
                        viewBox="0 0 16 16"
                      >
                        <path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0" />
                        <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
                      </svg>
                      &nbsp;{formattedDate}
                    </div>
                    <div className="taskScript">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-file-earmark-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2m5.5 1.5v2a1 1 0 0 0 1 1h2z" />
                      </svg>
                      &nbsp;{item.scriptId.name}
                    </div>
                    <div className="assigned">
                      {item.assigned &&
                        item.assigned.map((a, i) => (
                          <span key={i} className="badge bg-primary">
                            {a.name}({a.role})
                          </span>
                        ))}

                      {/* <Badge bg="secondary">Secondary</Badge>
            <Badge bg="success">Success</Badge>
            <Badge bg="danger">Danger</Badge>
            <Badge bg="warning" text="dark">
              Warning
            </Badge>
            <Badge bg="info">Info</Badge>
            <Badge bg="light" text="dark">
              Light
            </Badge>
            <Badge bg="dark">Dark</Badge> */}
                    </div>
                  </div>
                );
              })}
              
            </div>
          </Col>
          <Col lg="3">
            <div
              className="done"
              onDrop={(e) => handleDrop(e, "done")}
              onDragOver={handleDragOver}
            >
              {doneContent.map((item, index) => {
                const formattedDate = formatDate(item.date);

                return (
                  <div
                    key={index}
                    className="task"
                    draggable
                    onDragStart={(e) => handleDrag(e, item)}
                  >
                    <div
                      className="edit"
                      onClick={() => {
                        editContent(item._id);
                      }}
                    >
                      <svg
                        className="editPen"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-pencil-square"
                        viewBox="0 0 16 16"
                      >
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path
                          fill-rule="evenodd"
                          d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                        />
                      </svg>
                    </div>
                    <div className="taskTitle">{item.title}</div>

                    <div className="taskDate">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-calendar-check"
                        viewBox="0 0 16 16"
                      >
                        <path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0" />
                        <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
                      </svg>
                      &nbsp;{formattedDate}
                    </div>
                    <div className="taskScript">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-file-earmark-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2m5.5 1.5v2a1 1 0 0 0 1 1h2z" />
                      </svg>
                      &nbsp;{item.scriptId.name}
                    </div>
                    <div className="assigned">
                      {item.assigned &&
                        item.assigned.map((a, i) => (
                          <span key={i} className="badge bg-success">
                            {a.name}({a.role})
                          </span>
                        ))}

                      {/* <Badge bg="secondary">Secondary</Badge>
            <Badge bg="success">Success</Badge>
            <Badge bg="danger">Danger</Badge>
            <Badge bg="warning" text="dark">
              Warning
            </Badge>
            <Badge bg="info">Info</Badge>
            <Badge bg="light" text="dark">
              Light
            </Badge>
            <Badge bg="dark">Dark</Badge> */}
                    </div>
                  </div>
                );
              })}
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default PostScheduleView;
