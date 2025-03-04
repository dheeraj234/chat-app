import React from "react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAppStore } from "@/store"
import { toast } from "sonner"
const Chat=()=>{
    const {userInfo}=useAppStore();
    const navigate= useNavigate();
    useEffect(()=>{
        if(!userInfo.profileSetup){
            toast("please Setup profile to continue");
            navigate("/profile")
        }
    },[userInfo,navigate])
    return <div></div>
    }
 export default Chat