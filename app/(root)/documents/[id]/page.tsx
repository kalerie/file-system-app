import CollaborativeRoom from '@/components/CollaborativeRoom'
import { Editor } from '@/components/editor/Editor'
import Header from '@/components/Header'
import { getDocumentUsers } from '@/lib/actions/user.actions'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

const Document = async ({params: {id}}: SearchParamsProps) => {
  const clerkUser = await currentUser();
  if(!clerkUser) {
    redirect('/sign-in')
  }

  const room = await getDocumentUsers({
    roomId: id,
    userId: clerkUser.emailAddresses[0].emailAddress,
  });
  if(!room) {
    redirect('/');
  }

  return (
    <main className='flex w-full flex-col item-center'>
      <CollaborativeRoom 
        roomId={id} 
        roomMetadata={room.metadata} 
      />
    </main>
  )
} 

export default Document