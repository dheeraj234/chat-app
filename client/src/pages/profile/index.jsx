import { useAppStore } from "@/store"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import {IoArrowBack}from "react-icons/io5"
const Profile=()=>{
    const {userInfo}=useAppStore()
    const [firstName,setFirstName]=useState("")
    const [lastName,setLastName]=useState("")
    const [image,setImage]=useState(null)
    const [hovered,setHovered]=useState(false)
    const [selectedcolor,setSelectedColor]=useState(0)
    const saveChanges=async()=>{}
    return (
    <div className="bg-[#1b1c24] h-[100vh] flex justify-center flex-col gap-10">
        <div className="flex flex-col gap-10 md:w-max">
            <div>
                <IoArrowBack className="text-4xl lg:text-6xl"/>
            </div>
        </div>
       
    </div>)
}
export default Profile