'use server';
import { clerkClient } from "@clerk/nextjs/server"; 
import { parseStringify } from "../utils";
import { liveblocks } from "../liveblocks";

export const getClerkUsers = async ({ userIds }: { userIds: string[]}) => {
  try {
    const { data } = await (await clerkClient()).users.getUserList({
      userId: userIds,
    });

    const users = data.map((user) => ({
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.emailAddresses[0].emailAddress,
      avatar: user.imageUrl,
    }));

    const sortedUsers = userIds.map((userId) => users.find((user) => user.id === userId));
      
    return parseStringify(sortedUsers);
  } catch (error) {
    console.error(`Error fetching users: ${error}`);
  }
}

export const getClerkUsersByEmail = async ({ userEmails }: { userEmails: string[]}) => {
    try {
      const { data } = await (await clerkClient()).users.getUserList({
        emailAddress: userEmails
      });

      const users = data.map((user) => ({
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.emailAddresses[0].emailAddress,
        avatar: user.imageUrl,
      }));
  
      const sortedUsers = userEmails.map((email) => users.find((user) => user.email === email));
        
      return parseStringify(sortedUsers);
    } catch (error) {
      console.error(`Error fetching users: ${error}`);
    }
}

export const getDocumentUsers = async ({ roomId, currentUser, text }: { roomId: string, currentUser: string, text: string }) => {
  try {
    const room = await liveblocks.getRoom(roomId);
    const userEmails = Object.keys(room.usersAccesses).filter((email) => email !== currentUser);
    const usersData =  await getClerkUsersByEmail({ userEmails });

    if(text.length) {
      const lowerCaseText = text.toLowerCase();
      const filteredUsers = usersData
        .filter((item: User) => item.email.includes(lowerCaseText))
        .map((item: User) => item.id);
      return parseStringify(filteredUsers);
    }

    const users = usersData.map((item: User) => item.id);
    return parseStringify(users);
  } catch (error) {
    console.error(`Error fetching document users: ${error}`);
  }
}