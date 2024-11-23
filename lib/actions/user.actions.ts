'use server';

import { clerkClient } from "@clerk/clerk-sdk-node"; // TODO to migrate
// import { clerkClient } from "@clerk/nextjs/server";
import { parseStringify } from "../utils";
import { liveblocks } from "../liveblocks";
import { error } from "console";

export const getClerkUsers = async ({ userIds }: { userIds: string[]}) => {
    try {
      const { data } = await clerkClient.users.getUserList({
        emailAddress: userIds,
      });
  
      const users = data.map((user) => ({
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.emailAddresses[0].emailAddress,
        avatar: user.imageUrl,
      }));
  
      const sortedUsers = userIds.map((email) => users.find((user) => user.email === email));
        
      return parseStringify(sortedUsers);
    } catch (error) {
      console.log(`Error fetching users: ${error}`);
    }
}

export const getDocumentUsers = async ({ roomId, userId, currentUser, text }: { roomId: string, userId: string, currentUser?: string, text?: string }) => {
  try {
    
    // const users = Object.keys(room.usersAccesses).filter((email) => email !== currentUser);

    // if(text.length) {
    //   const lowerCaseText = text.toLowerCase();

    //   const filteredUsers = users.filter((email: string) => email.toLowerCase().includes(lowerCaseText))

    //   return parseStringify(filteredUsers);
    // }

    // return parseStringify(users);
  } catch (error) {
    // console.error(`Error fetching document users: ${error}`);
  }
}