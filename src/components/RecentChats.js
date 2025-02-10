"use client";

import { useEffect, useState } from "react";
import { collection, query, orderBy, getDocs, deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { db } from "@/config/firebase.config";
import NewChat from "./NewChat";
import { Check, Pencil, Trash } from "lucide-react";
import toast from "react-hot-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { Input } from "./ui/input";

const RecentChats = () => {

    const { user } = useUser();
    const [chats, setChats] = useState([]);
    const [name, setName] = useState('')

    useEffect(() => {
        if (!user) return;

        const chatsRef = collection(db, "users", user.id, "chats");
        const q = query(chatsRef, orderBy("lastUpdated", "desc"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const chatList = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setChats(chatList);
        });

        return () => unsubscribe();
    }, [user]);

    const handleDelete = (id) => {
        const chatRef = doc(db, "users", user.id, "chats", id);

        deleteDoc(chatRef)
            .then(() => {
                setChats((prevChats) => prevChats.filter((chat) => chat.id !== id));
                toast.success('Chat deleted')
            })
            .catch((error) => {
                toast.error('Something went wrong...')
                console.error("Error deleting chat:", error);
            });
    };

    const handleUpdate = (id) => {
        const chatRef = doc(db, "users", user.id, "chats", id);

        if(name === '') return

        updateDoc(chatRef, {
            chatName: name,
        }).then((res) => {
            toast.success('Title updated...')
            setName('')
        }).catch((err) => {
            console.log('Error while updating title: ' + err);
            toast.error('Something went wrong...');
        })
    }

    return (
        <>
            <div className="2xl:max-w-4xl max-w-2xl mx-auto p-8">
                <h1 className="text-2xl font-semibold mb-4">Recent Chats</h1>
                <NewChat />
                {chats.length === 0 ? (
                    <p>No chats found.</p>
                ) : (
                    <ul className="space-y-2">
                        {chats.map((chat) => (
                            <li key={chat.id} className="border-b p-2 rounded flex justify-between items-center">
                                <Link href={`/chat/${chat.id}`} className="hover:underline">
                                    {chat.chatName}
                                </Link>
                                <div className="flex items-center gap-4">
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Pencil className="cursor-pointer" size={18} />
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Change chat title!</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    <Input
                                                        placeholder={chat.chatName}
                                                        onChange={(e) => setName(e.target.value)}
                                                        value={name}
                                                        className='focus-visible:ring-0 focus-visible:ring-offset-0 text-black'
                                                    />
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => handleUpdate(chat.id)}>
                                                    <Check />
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                    <Trash className="cursor-pointer" size={18} onClick={() => handleDelete(chat.id)} />
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    )
}

export default RecentChats