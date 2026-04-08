import React, { memo } from "react";
import ChatContent from "../components/chat/ChatContent";
import { useSEO } from "../hooks/useSEO";

const Chat = memo(() => {
  useSEO({
    title: "Chat with Seller",
    description: "Message sellers directly on Noha's Automotive marketplace.",
  });
  return (
    <div className="h-full overflow-hidden">
      <ChatContent />
    </div>
  );
});

Chat.displayName = "Chat";

export default Chat;
