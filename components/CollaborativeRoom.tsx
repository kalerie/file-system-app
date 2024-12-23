"use client";

import { ClientSideSuspense, RoomProvider } from '@liveblocks/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import Header from './Header'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { Editor } from './editor/Editor'
import ActiveCollaborators from './ActiveCollaborators'
import { Input } from './ui/input';
import Image from 'next/image';
import { updateDocument } from '@/lib/actions/room.actions';
import Loader from './Loader';
import ShareModal from './ShareModal';

const CollaborativeRoom = ({roomId, roomMetadata, users, currentUserType}: CollaborativeRoomProps) => {
    const [documentTitle, setDocumentTitle] = useState(roomMetadata.title);
    const [editting, setEditing] = useState(false);
    const [loading, setLoading] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const updateTitleHandler = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleDocumentUpdate();
        }
    };
    
    const handleDocumentUpdate = useCallback(async () => {
        try {
            if (documentTitle !== roomMetadata.title) {
                setLoading(true);
                const updatedDocument = await updateDocument(roomId, documentTitle);
    
                if (updatedDocument) {
                    setEditing(false);
                }
            }
        } catch (error) {
            console.error(`Error occurred while updating title: ${error instanceof Error ? error.message : String(error)}`);
        } finally {
            setLoading(false);
            setEditing(false);
        }
    }, [documentTitle, roomId, roomMetadata.title]);
    
    useEffect(() => {
        const handleClickOutside = async (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                await handleDocumentUpdate();
            }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
    
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleDocumentUpdate]);
    

    useEffect(() => {
      if(editting && inputRef.current) {
        inputRef.current.focus();
      }
    }, [editting])

  return (
    <RoomProvider id={roomId}>
        <ClientSideSuspense fallback={<Loader />}>
            <div className="collaborative-room">
                <Header>
                    <div ref={containerRef} className="flex w-fit items-center justify-center gap-2 ">
                        {editting && !loading ? (
                            <Input 
                                type='text'
                                value={documentTitle}
                                ref={inputRef}
                                placeholder='Enter title'
                                onChange={(e) => setDocumentTitle(e.target.value)}
                                onKeyDown={(e) => updateTitleHandler(e)}
                                disabled={!editting}
                                className='document-title-input'
                            />
                        ) : (
                            <p className="document-title">{documentTitle}</p>
                        )}


                        {currentUserType === 'editor' && !editting && (
                            <Image 
                                src={'/assets/icons/edit.svg'}
                                alt='edit'
                                width={24}
                                height={24}
                                onClick={() => setEditing(true)}
                                className='pointer'
                            />
                        )}

                        {currentUserType !== 'editor' && !editting && (
                            <p className="view-only-tag">View only</p> 
                        )}

                        {loading && <p className='text-sm text-gray-400'>saving...</p>}
                    </div>
                    <div className="flex w-full flex-1 items-center justify-end gap-2 sm:gap-3">
                        <ShareModal 
                            roomId={roomId} 
                            collaborators={users} 
                            creatorId={roomMetadata.creatorId} 
                            currentUserType={currentUserType}
                        />
                        <ActiveCollaborators />
                        <SignedOut>
                            <SignInButton />
                        </SignedOut>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </div>
                </Header>
                <Editor 
                    roomId={roomId} 
                    currentUserType={currentUserType} />
            </div>
        </ClientSideSuspense>
    </RoomProvider>
  )
}

export default CollaborativeRoom