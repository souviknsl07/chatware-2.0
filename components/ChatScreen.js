import { Avatar, Icon, IconButton } from "@material-ui/core";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import SendIcon from "@material-ui/icons/Send";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth, db } from "../firebase";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import { useCollection } from "react-firebase-hooks/firestore";
import firebase from "firebase";
import Message from "./Message";
import { useState } from "react";
import getRecipientEmail from "../utils/getRecipientEmail";
import TimeAgo from "timeago-react";
import { useRef } from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import dynamic from "next/dynamic";

const ChatScreen = ({ chat, messages }) => {
  const [user] = useAuthState(auth);
  const [input, setInput] = useState("");
  const [showEmojis, setShowEmojis] = useState(null);
  const router = useRouter();
  const endOfMessageRef = useRef(null);
  const inputRef = useRef(null);

  const Picker = dynamic(() => import("emoji-picker-react"), {
    ssr: false,
  });

  const [messagesSnapshot] = useCollection(
    db
      .collection("chats")
      .doc(router.query.id)
      .collection("messages")
      .orderBy("timestamp", "asc")
  );

  const [recipientSnapshot] = useCollection(
    db
      .collection("users")
      .where("email", "==", getRecipientEmail(chat.users, user))
  );

  const scrollToBottom = () => {
    endOfMessageRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleShowEmojis = () => {
    inputRef.current.focus();
    setShowEmojis(!showEmojis);
  };

  const onEmojiClick = (event, emojiObject) => {
    const ref = inputRef.current;
    ref.focus();
    const start = input.substring(0, ref.selectionStart);
    const end = input.substring(ref.selectionStart);
    const text = start + emojiObject.emoji + end;
    setInput(text);
  };

  const showBottom = () => {
    endOfMessageRef.current.scrollIntoView();
  };

  const showMessages = () => {
    if (messagesSnapshot) {
      return messagesSnapshot.docs.map((message) => (
        <Message
          key={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime(),
          }}
          bottom={showBottom()}
        />
      ));
    } else {
      return JSON.parse(messages).map((message) => (
        <Message key={message.id} user={message.user} message={message} />
      ));
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    //update the lastSeen
    db.collection("users").doc(user.uid).set(
      {
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    db.collection("chats").doc(router.query.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: user.email,
      photoURL: user.photoURL,
    });

    if (showEmojis) setShowEmojis(!showEmojis);

    setInput("");
    scrollToBottom();
  };

  const recipient = recipientSnapshot?.docs?.[0]?.data();
  const recipientEmail = getRecipientEmail(chat.users, user);

  const EmojiContainer = showEmojis ? EmojiList : HiddenList;

  return (
    <Container>
      <Header>
        <IconButton onClick={() => router.push("/")}>
          <ArrowBackIcon />
          {recipient ? (
            <Avatar src={recipient?.photoURL} />
          ) : (
            <Avatar>{recipientEmail[0]}</Avatar>
          )}
        </IconButton>

        <HeaderInformation>
          <h3>{recipientEmail}</h3>
          {recipientSnapshot ? (
            <p>
              Last active:{" "}
              {recipient?.lastSeen?.toDate() ? (
                <TimeAgo datetime={recipient?.lastSeen?.toDate()} />
              ) : (
                "Unavailable"
              )}
            </p>
          ) : (
            <p>Loading Last active...</p>
          )}
        </HeaderInformation>
        <HeaderIcons>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
        </HeaderIcons>
      </Header>
      <MessageContainer>
        {showMessages()}
        <EndOfMessage ref={endOfMessageRef} />
      </MessageContainer>
      <EmojiContainer>
        <Picker
          onEmojiClick={onEmojiClick}
          pickerStyle={{
            width: "100%",
            position: "sticky",
            bottom: "0",
          }}
        />
      </EmojiContainer>

      <InputContainer>
        <IconButton onClick={handleShowEmojis}>
          <InsertEmoticonIcon />
        </IconButton>
        <Input
          value={input}
          placeholder="Messages..."
          onChange={(e) => setInput(e.target.value)}
          ref={inputRef}
        />
        <IconButton disabled={!input} type="submit" onClick={sendMessage}>
          <SendIcon style={{ color: "#34c3eb" }} />
        </IconButton>
      </InputContainer>
    </Container>
  );
};

export default ChatScreen;

const Container = styled.div``;

const Input = styled.input`
  flex: 1;
  outline: 0;
  border: none;
  border-radius: 10px;
  background-color: whitesmoke;
  padding: 20px;
  margin-left: 15px;
  margin-right: 15px;
`;

const EmojiList = styled.div`
  display: inline;
`;

const HiddenList = styled.div`
  display: none;
`;

const Header = styled.div`
  position: sticky;
  background-color: white;
  z-index: 100;
  top: 0;
  display: flex;
  height: 80px;
  align-items: center;
  border-bottom: 1px solid whitesmoke;
`;

const HeaderInformation = styled.div`
  margin-left: 15px;
  flex: 1;
  > h3 {
    margin-bottom: 10px;
  }
  > p {
    font-size: 14px;
    color: gray;
  }
`;

const EndOfMessage = styled.div`
  margin-bottom: 1px;
`;

const HeaderIcons = styled.div``;

const MessageContainer = styled.div`
  padding: 30px;
  background-color: #e5ded8;
  min-height: 90vh;
`;

const InputContainer = styled.form`
  display: flex;
  align-items: center;
  padding: 10px;
  position: sticky;
  bottom: 0;
  background-color: white;
  z-index: 100;
`;
