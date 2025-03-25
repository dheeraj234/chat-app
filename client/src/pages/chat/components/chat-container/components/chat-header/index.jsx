import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { getColor } from '@/lib/utils';
import { useAppStore } from '@/store';
import { HOST } from '@/utils/constants';
import React from 'react';
import { RiCloseFill } from 'react-icons/ri';

const ChatHeader = () => {
  const { closeChat, selectedChatData, selectedChatType } = useAppStore();

  return (
    <div className="h-[10vh] bg-gradient-to-r from-purple-600 to-purple-800 shadow-lg px-6 flex items-center justify-between rounded-t-xl">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 relative">
          {selectedChatType === "contact" ? (
            <Avatar className="h-12 w-12 rounded-full overflow-hidden border-2 border-white shadow-lg">
              {selectedChatData.image ? (
                <AvatarImage
                  src={`${HOST}/${selectedChatData.image}`}
                  alt="profile"
                  className="object-cover w-full h-full"
                />
              ) : (
                <div
                  className={`uppercase h-12 w-12 flex items-center justify-center text-lg font-semibold rounded-full text-white ${getColor(selectedChatData.color)}`}
                >
                  {selectedChatData.firstName
                    ? selectedChatData.firstName[0]
                    : selectedChatData.email[0]}
                </div>
              )}
            </Avatar>
          ) : (
            <div className="bg-white/20 h-10 w-10 flex items-center justify-center rounded-full text-white text-lg font-semibold">
              #
            </div>
          )}
        </div>
        <div className="text-white font-semibold text-lg">
          {selectedChatType === "channel" && selectedChatData.name}
          {selectedChatType === "contact"
            ? `${selectedChatData.firstName} ${selectedChatData.lastName}`
            : selectedChatData.email}
        </div>
      </div>
      <button
        className="text-white hover:bg-white/20 p-2 rounded-full transition-all duration-300"
        onClick={closeChat}
      >
        <RiCloseFill className="text-3xl" />
      </button>
    </div>
  );
};

export default ChatHeader;
