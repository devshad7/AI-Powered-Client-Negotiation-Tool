"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useUser } from "@clerk/nextjs";
import { doc, updateDoc, arrayUnion, onSnapshot, serverTimestamp, setDoc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebase.config";
import { Send } from "lucide-react";
import remarkGfm from "remark-gfm";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";

export default function Chat({ chatId }) {
    const { user } = useUser();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [chatExists, setChatExists] = useState(null);
    const messagesEndRef = useRef(null);
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        if (!user?.id) return;

        const chatRef = doc(db, "users", user.id, "chats", chatId);

        const checkChatExists = async () => {
            const docSnap = await getDoc(chatRef);
            if (!docSnap.exists()) {
                setChatExists(false);
            } else {
                setChatExists(true);
            }
        };

        checkChatExists();

        const unsubscribe = onSnapshot(chatRef, (doc) => {
            if (doc.exists()) {
                setMessages(doc.data().messages || []);
            }
        });

        return () => unsubscribe();
    }, [user?.id]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim()) return;
        if (!user?.id) return;

        setLoading(true);
        setIsTyping(true);

        const userMessage = {
            role: "user",
            content: input,
            createdAt: new Date().toISOString()
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");

        try {
            const chatRef = doc(db, "users", user.id, "chats", chatId);
            await setDoc(chatRef, {
                messages: arrayUnion(userMessage),
                lastUpdated: serverTimestamp(),
            }, { merge: true });

            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: [...messages, userMessage] }),
            });

            const data = await response.json();
            const aiMessage = {
                role: "assistant",
                content: data?.message || "No response received",
                createdAt: new Date().toISOString(),
            };

            setMessages((prev) => [...prev, aiMessage]);
            await updateDoc(chatRef, {
                messages: arrayUnion(aiMessage),
                lastUpdated: serverTimestamp(),
            });
        } catch (error) {
            console.error("Error sending message:", error);
        } finally {
            setLoading(false);
            setIsTyping(false);
        }
    };

    if (chatExists === null) {
        return <div className="w-full h-[80vh] justify-center items-center flex"><div className="loader"></div></div>;
    }

    if (chatExists === false) {
        return (
            <div className="w-full flex h-[80vh] items-center justify-center">
                <h1 className="">404 | Not Found</h1>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto p-4 bg-white rounded-lg h-[85vh] flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide flex flex-col">
                {messages.map((msg, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`py-2 px-4 rounded-full max-w-[60%] whitespace-pre-wrap 
                ${msg.role === "user" ? "bg-primary-user self-end text-right" : "self-start text-left"}`}
                    >
                        <Markdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeRaw]}
                            className="prose max-w-none">
                            {msg.content.replaceAll("\n", "  \n")}
                        </Markdown>
                    </motion.div>
                ))}

                {isTyping && (
                    <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                        className="self-start text-left px-4 py-2 max-w-[60%]"
                    >
                        <span className="text-gray-600">thinking...</span>
                    </motion.div>
                )}
                <div ref={messagesEndRef} />
            </div>
            <div className="md:p-4 relative top-10 flex items-center gap-2">
                <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Type a message..."
                    className="flex-1 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-sm border-gray-200 py-6 px-5 rounded-xl"
                />
                <Button
                    onClick={sendMessage}
                    disabled={loading}
                    className="rounded-2xl py-6 px-5"
                >
                    <Send />
                </Button>
            </div>
        </div>

    );
}
