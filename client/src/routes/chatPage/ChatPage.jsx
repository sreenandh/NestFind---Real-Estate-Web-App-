import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import Chat from "../../components/chat/Chat";

function ChatPage() {
  const { id } = useParams(); // Get the chat ID from the URL
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchChat = async () => {
      try {
        const res = await apiRequest(`/chats/${id}`);
        const chatData = res.data;

        // Ensure the chat data includes a receiver property
        if (!chatData.receiver) {
          console.error("Chat data is missing the receiver property:", chatData);
          return;
        }

        // Wrap the chat data in an array to match the expected format
        setChats([chatData]);
      } catch (err) {
        console.log(err);
      }
    };

    fetchChat();
  }, [id]);

  return (
    <div className="chatPage">
      <Chat chats={chats} />
    </div>
  );
}

export default ChatPage;