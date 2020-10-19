// import { IconButton } from "@material-ui/core";
// import React, { useState, useEffect } from "react";
// import MicNoneIcon from "@material-ui/icons/MicNone";
// import "./css/Chat.css";
// import Message from "./Message";
// import { selectChatName, selectChatId } from "./features/chatSlice";
// import { useSelector } from "react-redux";
// import db from "./firebase";
// import firebase from "firebase";
// import { selectUser } from "./features/userSlice";
// import FlipMove from "react-flip-move";

// function Chat() {
//   const [input, setInput] = useState("");
//   const chatName = useSelector(selectChatName);
//   const [messages, setMessages] = useState([]);
//   const chatId = useSelector(selectChatId);
//   const user = useSelector(selectUser);
//   useEffect(() => {
//     if (chatId) {
//       db.collection("chats")
//         .doc(chatId)
//         .collection("messages")
//         .orderBy("timestamp", "desc")
//         .onSnapshot((snapshot) =>
//           setMessages(
//             snapshot.docs.map((doc) => ({
//               id: doc.id,
//               data: doc.data(),
//             }))
//           )
//         );
//     }
//   }, [chatId]);

//   const sendMessage = (e) => {
//     e.preventDefault();
//     db.collection("chats").doc(chatId).collection("messages").add({
//       timestamp: firebase.firestore.FieldValue.serverTimestamp(),
//       message: input,
//       uid: user.uid,
//       photo: user.photo,
//       email: user.email,
//       displayName: user.displayName,
//     });

//     setInput("");
//   };
//   return (
//     <div className="chat">
//       <div className="chat__header">
//         <h4>
//           T0: <span className="chat__name">{chatName}</span>
//         </h4>
//         <strong>Details</strong>
//       </div>

//       <div className="chat__messages">
//         <FlipMove>
//           {messages.map(({ id, data }) => (
//             <Message key={id} content={data}></Message>
//           ))}
//         </FlipMove>
//       </div>

//       <div className="chat__input">
//         <form type="text">
//           <input
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             placeholder="iMessage"
//             type="text"
//           />
//           <button onClick={sendMessage}>send message</button>
//         </form>
//         <IconButton>
//           <MicNoneIcon className="chat__mic" />
//         </IconButton>
//       </div>
//     </div>
//   );
// }

// export default Chat;

import { IconButton } from "@material-ui/core";
import { MicNone } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./css/Chat.css";
import { selectChatId, selectChatName } from "./features/chatSlice";
import db from "./firebase";
import Message from "./Message";
import firebase from "firebase";
import { selectUser } from "./features/userSlice";
import FlipMove from "react-flip-move";

const Chat = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const chatName = useSelector(selectChatName);
  const chatId = useSelector(selectChatId);
  const user = useSelector(selectUser);

  useEffect(() => {
    if (chatId) {
      db.collection("chats")
        .doc(chatId)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    }
  }, [chatId]);

  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("chats").doc(chatId).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      uid: user.uid,
      photo: user.photo,
      email: user.email,
      displayName: user.displayName,
    });

    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <h4>
          TO: <span className="chat__name">{chatName}</span>
        </h4>
        <strong>Details</strong>
      </div>
      <div className="chat__messages">
        <FlipMove>
          {messages.map(({ id, data }) => (
            <Message key={id} contents={data} />
          ))}
        </FlipMove>
      </div>
      <div className="chat__input">
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="iMessage"
            type="text"
          />
          <button onClick={sendMessage}>send message</button>
        </form>
        <IconButton>
          <MicNone className="chat__mic" />
        </IconButton>
      </div>
    </div>
  );
};

export default Chat;
