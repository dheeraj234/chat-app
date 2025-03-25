import { useAppStore } from '@/store';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import React from 'react';
import { HOST } from '@/utils/constants';
import { getColor } from '@/lib/utils';

const ContactList = ({ contacts, isChannel = false }) => {
    const {
        selectedChatData,
        setSelectedChatData,
        setSelectedChatType,
        selectedChatMessages,
        setSelectedChatMessages
    } = useAppStore();

    const handleClick = (contact) => {
        setSelectedChatType(isChannel ? "channel" : "contact");
        setSelectedChatData(contact);

        if (selectedChatData && selectedChatData._id !== contact._id) {
            setSelectedChatMessages([]);
        }
    };

    return (
        <div className="mt-5 space-y-2 px-4">
            {contacts.map((contact) => (
                <div
                    key={contact._id}
                    className={`flex items-center gap-4 p-3 rounded-lg transition-all cursor-pointer shadow-sm 
                    ${selectedChatData && selectedChatData._id === contact._id
                        ? "bg-gradient-to-r from-purple-600 to-purple-800 text-white"
                        : "hover:bg-purple-700/30"
                    }`}
                    onClick={() => handleClick(contact)}
                >
                    {!isChannel ? (
                        <Avatar className="h-12 w-12 rounded-full shadow-md">
                            {contact.image ? (
                                <AvatarImage
                                    src={`${HOST}/${contact.image}`}
                                    alt="profile"
                                    className="object-cover w-full h-full"
                                />
                            ) : (
                                <div className={`h-12 w-12 flex items-center justify-center text-lg font-semibold rounded-full text-white ${getColor(contact.color)}`}>
                                    {contact.firstName ? contact.firstName.charAt(0) : contact.email.charAt(0)}
                                </div>
                            )}
                        </Avatar>
                    ) : (
                        <div className="bg-white/20 h-12 w-12 flex items-center justify-center rounded-full text-white text-lg font-bold">
                            #
                        </div>
                    )}
                    <span className="text-lg font-medium text-white">
                        {isChannel ? contact.name || "Unnamed Channel" : (contact.firstName ? `${contact.firstName} ${contact.lastName}` : contact.email)}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default ContactList;