import React from "react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAppStore } from "@/store"
import { toast } from "sonner"
import ContainsContainer from "./components/contacts-container"
import EmptyChatContainer from "./components/empty-chat-container"
import ChatContainer from "./components/chat-container"

const Chat=()=>{
    const {userInfo}=useAppStore();
    const navigate= useNavigate();
    useEffect(()=>{
        if(!userInfo.profileSetup){
            toast("please Setup profile to continue");
            navigate("/profile")
        }
    },[userInfo,navigate])
    return <div className="flex h-[100vh] text-white overflow-hidden">
        <ContainsContainer/>
        <EmptyChatContainer/>
        <ChatContainer/>
    </div>
    }
 export default Chat