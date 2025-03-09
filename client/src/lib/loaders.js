import { defer } from "react-router-dom";
import apiRequest from "./apiRequest";

export const singlePageLoader = async ({ request, params }) => {
  try {
    const res = await apiRequest(`/posts/${params.id}`);
    return res.data;
  } catch (error) {
    console.error("Error in singlePageLoader:", error);
    throw error; // Throw the error to trigger the router's error handling
  }
};

export const listPageLoader = async ({ request, params }) => {
  try {
    const query = request.url.split("?")[1];
    const postPromise = apiRequest("/posts?" + query);
    return defer({
      postResponse: postPromise,
    });
  } catch (error) {
    console.error("Error in listPageLoader:", error);
    throw error;
  }
};

export const profilePageLoader = async () => {
  try {
    const postPromise = apiRequest("/users/profilePosts");
    const chatPromise = apiRequest("/chats");
    return defer({
      postResponse: postPromise,
      chatResponse: chatPromise,
    });
  } catch (error) {
    console.error("Error in profilePageLoader:", error);
    throw error;
  }
};
