import React, { useState, useEffect } from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { FaPlus } from "react-icons/fa"
import { apiClient } from '@/lib/api-client'
import { CREATE_CHANNEL_ROUTE, GET_ALL_MESSAGES_ROUTE, SEARCH_CONTACTS_ROUTE } from '@/utils/constants'
import { useAppStore } from '@/store'
import { Button } from '@/components/ui/button'
import MultipleSelector from '@/components/ui/multipleselect'

const CreateChannel = () => {
    const { setSelectedChatType, setSelectedChatData, addChannel } = useAppStore()
    const [newChannelModal, setNewChannelModal] = useState(false);
    const [allContacts, setAllContacts] = useState([]);
    const [selectedContacts, setSelectedContacts] = useState([]);
    const [channelName, setChannelName] = useState("");
    const [searchedContacts, setSearchedContacts] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await apiClient.get(GET_ALL_MESSAGES_ROUTE, {
                    withCredentials: true
                });
                setAllContacts(response.data.contacts);
            } catch (error) {
                console.error("Error fetching contacts:", error);
            }
        };
        getData();
    }, []);

    const createChannel = async () => {
        try {
            if (channelName.length > 0 && selectedContacts.length > 0) {
                const response = await apiClient.post(
                    CREATE_CHANNEL_ROUTE,
                    {
                        name: channelName,
                        members: selectedContacts.map(contact => contact.value)
                    },
                    { withCredentials: true }
                );

                if (response.status === 201) {
                    setChannelName("");
                    setSelectedContacts([]);
                    setNewChannelModal(false);
                    addChannel(response.data.channel);
                }
            }
        } catch (error) {
            console.error("Error creating channel:", error);
        }
    };

    // const searchContacts = async (searchTerm) => {
    //     try {
    //         if (searchTerm.length > 0) {
    //             const response = await apiClient.post(
    //                 SEARCH_CONTACTS_ROUTE,
    //                 { searchTerm },
    //                 { withCredentials: true }
    //             );
    //             if (response.status === 200) {
    //                 setSearchedContacts(response.data.contacts);
    //             } else {
    //                 setSearchedContacts([]);
    //             }
    //         }
    //     } catch (error) {
    //         console.error("Error searching contacts:", error);
    //     }
    // };

    // const selectNewContact = (contact) => {
    //     setSelectedChatType("contact");
    //     setSelectedChatData(contact);
    //     setSearchedContacts([]);
    // };

    return (
        <>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <FaPlus
                            className="text-neutral-400 font-light text-opacity-90 text-start hover:text-neutral-100 cursor-pointer transition-all duration-300"
                            onClick={() => setNewChannelModal(true)}
                        />
                    </TooltipTrigger>
                    <TooltipContent className="bg-[#1c1b1e] border-none mb-2 p-3 text-white">
                        Create New Channel
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <Dialog open={newChannelModal} onOpenChange={setNewChannelModal}>
                <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex-col">
                    <DialogHeader>
                        <DialogTitle>Please fill in the details for the new channel</DialogTitle>
                        <DialogDescription />
                    </DialogHeader>
                    <div>
                        <Input
                            placeholder="Channel Name"
                            className="rounded-lg p-6 bg-[#2c2e3b] border-none"
                            onChange={(e) => setChannelName(e.target.value)}
                            value={channelName}
                        />
                    </div>
                    <div>
                        <MultipleSelector
                            className="rounded-lg bg-[#2c2e3b] border-none py-2 text-white"
                            defaultOptions={allContacts}
                            value={selectedContacts}
                            onChange={setSelectedContacts}
                            placeholder="Search Contacts"
                            emptyIndicator={
                                <p className="text-center text-lg leading-10 text-gray-600">No results found</p>
                            }
                        />
                    </div>
                    <div>
                        <Button
                            className="w-full bg-purple-700 hover:bg-purple-900 transition-all duration-300"
                            onClick={createChannel}
                        >
                            Create Channel
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default CreateChannel;