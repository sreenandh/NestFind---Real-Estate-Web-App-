import prisma from "../lib/prisma.js";

// Get all chats for the logged-in user
export const getChats = async (req, res) => {
  const tokenUserId = req.userId;
  try {
    const chats = await prisma.chat.findMany({
      where: {
        userIDs: {
          hasSome: [tokenUserId],
        },
      },
    });

    // Add receiver details to each chat
    for (const chat of chats) {
      const receiverId = chat.userIDs.find((id) => id !== tokenUserId);
      const receiver = await prisma.user.findUnique({
        where: { id: receiverId },
        select: { id: true, username: true, avatar: true },
      });
      chat.receiver = receiver;
    }

    res.status(200).json(chats);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get chats!" });
  }
};

// Get a specific chat by ID
export const getChat = async (req, res) => {
  const tokenUserId = req.userId;
  try {
    const chat = await prisma.chat.findUnique({
      where: {
        id: req.params.id,
        userIDs: { hasSome: [tokenUserId] },
      },
      include: { messages: { orderBy: { createdAt: "asc" } } },
    });

    if (!chat) {
      return res.status(404).json({ message: "Chat not found!" });
    }

    // Mark the chat as read
    await prisma.chat.update({
      where: { id: req.params.id },
      data: { seenBy: { push: [tokenUserId] } },
    });

    // Add receiver details
    const receiverId = chat.userIDs.find((id) => id !== tokenUserId);
    const receiver = await prisma.user.findUnique({
      where: { id: receiverId },
      select: { id: true, username: true, avatar: true },
    });

    res.status(200).json({ ...chat, receiver });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get chat!" });
  }
};

// Create or get an existing chat
export const createOrGetChat = async (req, res) => {
  const { receiverId } = req.body;
  const tokenUserId = req.userId;

  try {
    const existingChat = await prisma.chat.findFirst({
      where: { userIDs: { hasEvery: [tokenUserId, receiverId] } },
    });

    if (existingChat) return res.status(200).json(existingChat);

    const newChat = await prisma.chat.create({
      data: { userIDs: [tokenUserId, receiverId] },
    });

    res.status(200).json(newChat);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create or get chat!" });
  }
};

// Mark a chat as read
export const readChat = async (req, res) => {
  const tokenUserId = req.userId;
  try {
    await prisma.chat.update({
      where: { id: req.params.id },
      data: { seenBy: { push: [tokenUserId] } },
    });
    res.status(200).json({ message: "Chat marked as read" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to mark chat as read!" });
  }
};