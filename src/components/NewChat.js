"use client";

import { useRouter } from "next/navigation";
import { collection, addDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useUser } from "@clerk/nextjs";
import { db } from "@/config/firebase.config";
import { Button } from "./ui/button";
import { FilePenLine } from "lucide-react";
import toast from "react-hot-toast";

const NewChat = () => {

    const { user } = useUser();
    const router = useRouter();

    const startNewChat = async () => {
        if (!user) return;

        const chatsRef = collection(db, "users", user.id, "chats");
        const newChat = await addDoc(chatsRef, {
            messages: [],
            chatName: "",
            lastUpdated: serverTimestamp(),
        }).then((res) => {
            updateDoc(res, {
                chatName: res.id
            }).catch((err) => {
                toast.error('Something went wrong...')
                console.log('Error while updating name: ' +err);
            })
            router.push(`/chat/${res.id}`);
        }).catch((err) => {
            console.log('Error while creating chat: ' +err);
        });

    };

    return (
        <>
            <Button className="bg-primary-user hover:bg-primary-user hover:shadow-sm border border-gray-200 text-black px-4 py-2 rounded-3xl mb-4 text-center w-full flex items-center" onClick={startNewChat}>
                Start New Chat
                <FilePenLine />
            </Button>
        </>
    )
}

export default NewChat