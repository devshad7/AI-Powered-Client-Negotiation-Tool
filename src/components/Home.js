'use client'

import { useState } from "react";
import { motion } from "framer-motion";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/config/firebase.config";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Home = () => {

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email) return;
        setLoading(true);

        addDoc(collection(db, "waitlist"), { email })
            .then(() => {
                setSuccess(true);
            })
            .catch((error) => {
                console.error("Error adding email: ", error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white flex flex-col items-center justify-center px-6 text-center">
                {/* Hero Section */}
                <motion.h1
                    className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    AI-Powered Negotiation Assistant
                </motion.h1>
                <p className="mt-4 text-lg text-gray-300 max-w-2xl">
                    Close better deals effortlessly with AI-generated smart responses. Join our waitlist now!
                </p>

                {/* Waitlist Form */}
                {success ? (
                    <p className="mt-6 text-green-400">You're on the waitlist! 🚀</p>
                ) : (
                    <form className="mt-6 flex flex-col md:flex-row gap-3" onSubmit={handleSubmit}>
                        <Input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="p-3 rounded-lg w-72 md:w-96 text-black"
                        />
                        <Button type="submit" className="bg-purple-500 hover:bg-purple-600" disabled={loading}>
                            {loading ? "Submitting..." : "Join Now"}
                        </Button>
                    </form>
                )}

                {/* Features Section */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
                    <FeatureCard title="AI Smart Replies" description="Instantly craft professional negotiation responses." />
                    <FeatureCard title="Market-Based Pricing" description="Justify your rates with AI-backed data." />
                    <FeatureCard title="Proposal Templates" description="Get ready-made proposals to win clients faster." />
                </div>
            </div>
        </>
    )
}

export default Home

function FeatureCard({ title, description }) {
    return (
        <motion.div
            className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-xl text-center border border-gray-700 hover:scale-105 transition-transform"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h3 className="text-xl font-semibold text-purple-400">{title}</h3>
            <p className="text-gray-300 mt-2">{description}</p>
        </motion.div>
    );
}
