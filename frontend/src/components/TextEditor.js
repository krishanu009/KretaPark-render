import React, { useCallback, useEffect, useRef, useState } from "react";
import "../styling/scripts.css";
import "quill/dist/quill.snow.css";
import { Quill } from "react-quill";
import { io } from "socket.io-client";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import axios from "axios";
function TextEditor({scripId,title,setTitle,userInfo}) {
  console.log("Script",scripId);
  const [localScriptId, setLocalscriptId] = useState();
  
  const SAVE_INTERVAL_MS = 2000;
  const TOOLBAR_OPTIONS = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ align: [] }],
    ["image", "blockquote", "code-block"],
    ["clean"],
  ];
  const [socket, setSocket] = useState();
  const [quill, setQuill] = useState();
  useEffect(() => {
    setLocalscriptId(scripId);
    console.log("changes");
  }, []); 
  useEffect(() => {
    // const s = io("http://localhost:3001");
    const s = io('https://kretapark.onrender.com');
    setSocket(s);
    console.log("socket", s);
    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket == null || quill == null) return;
    const handler = (delta, oldDelta, source) => {
      //if the chnages are not made by current user return
      if (source != "user") return;
      //delta is not the whole thing it is just the small subset, whatever is the new change
      socket.emit("send-changes", delta);
    };
    quill.on("text-change", handler);
    return () => {
      quill.off("text-change", handler);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (socket == null || quill == null) return;
    const handler = (delta) => {
      quill.updateContents(delta);
    };
    socket.on("receive-changes", handler);
    return () => {
      socket.off("receive-changes", handler);
    };
  }, [socket, quill]);
  useEffect( () => {

    if(socket == null || quill == null) return;

    socket.once("load-document", document => {
      quill.setContents(document.data);
      setTitle(document.title);
      console.log('document',document);
      quill.enable();
    })

    socket.emit('get-document',scripId,userInfo);
    console.log('fetching');
  },[socket,quill,scripId]);

  useEffect(() => {
    if(socket == null || quill == null) return;

    const interval = setInterval(()=>{
      socket.emit('save-document', quill.getContents());

    },SAVE_INTERVAL_MS);

    return () => {
      clearInterval(interval);
    }

  }, [socket, quill]);

  useEffect(() => {
    if(socket == null || quill == null) return;
    socket.emit('save-title', title);
  },[title])

  //we can use useEffect here but useEffect with a return so that on each new load prev code geta cleared but it
  // sometime runs before loading the html elements, which caue it to fail as we are
  //trying to access wrapperRef so on new load, so we use useCallback and it doesnot require a return as we are doing
  // a innerHtml = '' on each lead
  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;
    wrapper.innerHtml = "";
    const editor = document.createElement("div");
    wrapper.append(editor);

    const q = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS },
    });
    q.disable();
    q.setText("Loading......");

    setQuill(q);
  }, []);

  
  return (

    <><div id="textContainer" ref={wrapperRef}>


      </div></>
  );
}

export default TextEditor;
