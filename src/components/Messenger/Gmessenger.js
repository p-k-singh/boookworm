import { ChatEngine } from "react-chat-engine";
import React from "react";
import "./Gmessenger.css";
import ChatFeed from "./ChatFeed";

const GMessenger = () => {
  return (
    // <ChatEngine
    //     height="100vh"
    //     projectID="91ce0c93-fad8-4573-9dc7-9758f4d3854a"
    //     userName="prashant_pk_010"
    //     userSecret= "12345678"
    //     renderChatFeed={(chatAppProps) => <ChatFeed  {...chatAppProps} />}
    //     onNewMessage={() => new Audio('https://chat-engine-assets.s3.amazonaws.com/click.mp3').play()}

    // />
 
    <ChatEngine
      height="100vh"
      userName="gauravmandal09"
      userSecret="1234567890"
      projectID="91ce0c93-fad8-4573-9dc7-9758f4d3854a"
       renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
    />

  );
};

export default GMessenger;
