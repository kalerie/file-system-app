'use server';

import { clerkClient } from "@clerk/clerk-sdk-node"; // TODO to migrate 
// import { clerkClient } from "@clerk/nextjs/server"; 
import { parseStringify } from "../utils";
import { liveblocks } from "../liveblocks";

export const getClerkUsers = async ({ userIds }: { userIds: string[]}) => {
  try {
    const { data } = await clerkClient.users.getUserList({
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
    console.log(`Error fetching users: ${error}`);
  }
}

export const getClerkUsersByEmail = async ({ userEmails }: { userEmails: string[]}) => {
    try {
      const { data } = await clerkClient.users.getUserList({
        emailAddress: userEmails,
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
      console.log(`Error fetching users: ${error}`);
    }
}

export const getDocumentUsers = async ({ roomId, currentUser, text }: { roomId: string, currentUser: string, text: string }) => {
  try {
    const room = await liveblocks.getRoom(roomId);

    const users = Object.keys(room.usersAccesses).filter((email) => email !== currentUser);

    console.log('-----getDocumentUsers', users)

    if(text.length) {
      const lowerCaseText = text.toLowerCase();

      const filteredUsers = users.filter((email: string) => email.toLowerCase().includes(lowerCaseText))


      console.log('----- filteredUsers: ', filteredUsers)


      return parseStringify(filteredUsers);
    }

    return parseStringify(users);
  } catch (error) {
    console.log(`Error fetching document users: ${error}`);
  }
}