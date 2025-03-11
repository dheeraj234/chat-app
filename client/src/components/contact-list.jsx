import { useAppStore } from '@/store'
import { Content } from '@radix-ui/react-dialog';
import React from 'react'

const ContactList = ({contacts,isChannel=false}) => {
    const {
        selectedChatData,
        setSelectedChatData,
        setSelectedChatType,
        selectedChatType,
        setSelectedChatMessages
    }=useAppStore();
    const handleClick=(contact)=>{
        if(isChannel)setSelectedChatType("channel")
        else selectedChatType("contact");
        setSelectedChatData(contact);
        if(selectedChatData && selectedChatData._id!==contact._id){
            setSelectedChatMessages([])
        }
    }

  return (
    <div className='mt-5'>
        {contacts.map((contact)=>(
            <div key={contact._id} 
            className={`pl-10 py-2 transition-all duration cursor-pointer 
            ${selectedChatData & selectedChatData._id === contact._id
            ?"bg-[#8417ff] hover:bg-[#8417ff]":"hover:bg-[#8417ff]"}`}
            onClick={()=>handleClick(contact)}
            >{Content._id}</div>
        ))}
    </div>
  )
}

export default ContactList