import React from "react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAppStore } from "@/store"
import { toast } from "sonner"
import ContainsContainer from "./components/contacts-container"
import EmptyChatContainer from "./components/empty-chat-container"
import ChatContainer from "./components/chat-container"

const Chat = () => {
    const {
        userInfo,
        selectedChatType,
        isUploading,
        isDownloading,
        fileUploadProgress,
        fileDownloadProgress,
    } = useAppStore();
    const navigate = useNavigate();
    useEffect(() => {
        console.log("userInfo",userInfo);
        
        if (!userInfo.profileSetup) {
            toast("please Setup profile to continue");
            navigate("/profile")
        }
    }, [userInfo, navigate])
    return <div className="flex h-[100vh] text-white overflow-hidden">
        {
            isUploading && <div className="h-[100vh] w-[100vw] fixed top-0 z-10 left-0 
            bg-black/80 flex items-center justify-center
            flex-col gap-5 backfrop-blur-lg">
                <h5 className="text-5xl animate-pulse">
                    Uploading File
                </h5>{fileUploadProgress}%
            </div>
        }
        {
            isDownloading && <div className="h-[100vh] w-[100vw] fixed top-0 z-10 left-0 
            bg-black/80 flex items-center justify-center
            flex-col gap-5 backfrop-blur-lg">
                <h5 className="text-5xl animate-pulse">
                    Downloading File
                </h5>{fileDownloadProgress}%
            </div>
        }
        <ContainsContainer />
        {
            selectedChatType === undefined ? (<EmptyChatContainer />) : (<ChatContainer />)
        }
        {/* <EmptyChatContainer/>
        <ChatContainer/> */}
    </div>
}
export default Chat