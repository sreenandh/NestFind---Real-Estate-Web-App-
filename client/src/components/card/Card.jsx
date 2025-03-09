import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import "./card.scss";

function Card({ item }) {
  const navigate = useNavigate();

  // Handle saving a post
  const handleSave = async (e) => {
    e.stopPropagation(); // Prevent triggering parent click events
    if (!item.isSaved) {
      try {
        await apiRequest.post("/users/save", { postId: item.id });
        console.log("Post saved successfully!");
      } catch (err) {
        console.error("Error saving post:", err);
      }
    }
  };

  // Handle sending a message
  const handleChatClick = async (e) => {
    e.stopPropagation(); // Prevent triggering parent click events
    if (!item.userId) {
      console.error("User ID is missing for chat functionality.");
      return;
    }

    try {
      // Call the API to create or get the chat
      const res = await apiRequest.post("/chats/create-or-get", {
        receiverId: item.userId, // The property owner's ID
      });

      // Navigate to the chat page with the chat ID
      navigate(`/chat/${res.data.id}`);
    } catch (err) {
      console.error("Error creating or getting chat:", err);
    }
  };

  return (
    <div className="card">
      <Link to={`/${item.id}`} className="imageContainer">
        <img src={item.images[0]} alt="" />
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/${item.id}`}>{item.title}</Link>
        </h2>
        <p className="address">
          <img src="/pin.png" alt="" />
          <span>{item.address}</span>
        </p>
        <p className="price">$ {item.price}</p>
        <div className="bottom">
          <div className="features">
            <div className="feature">
              <img src="/bed.png" alt="" />
              <span>{item.bedroom} bedroom</span>
            </div>
            <div className="feature">
              <img src="/bath.png" alt="" />
              <span>{item.bathroom} bathroom</span>
            </div>
          </div>
          <div className="icons">
            <div className="icon" onClick={handleSave}>
              <img src="/save.png" alt="Save" />
            </div>
            <div className="icon" onClick={handleChatClick}>
              <img src="/chat.png" alt="Chat" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;