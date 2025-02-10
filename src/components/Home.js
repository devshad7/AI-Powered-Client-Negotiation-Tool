'use client'

import { motion } from "framer-motion";
import { Button } from "./ui/button";
import Link from "next/link";
import { BadgePercent, Bot, LayoutPanelTop, MoveRight } from "lucide-react";
import HomeNav from "./HomeNav";

const Home = () => {

    return (
        <>
            <HomeNav />
            <div className="md:py-40 py-16 flex flex-col items-center justify-center px-6 text-center">
                {/* Hero Section */}
                <motion.h1
                    className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-700 to-gray-800 text-transparent bg-clip-text"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    AI-Powered Negotiation Assistant
                </motion.h1>
                <p className="mt-4 text-lg text-gray-600 max-w-2xl">
                    Negotiate with confidence using AI-driven smart replies. Get better deals, faster and smarter. Join our beta now!
                </p>

                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <Link href={'/chat'}>
                        <Button type="submit" className="hover:bg-emerald-700 bg-emerald-600">
                            Get Started
                        </Button>
                    </Link>
                    <Link href={'/'} className='text-sm font-semibold leading-6 flex items-center gap-1'>
                        Learn more <MoveRight />
                    </Link>
                </div>

                {/* Features Section */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
                    <FeatureCard icon={<Bot />} title="AI Smart Replies" description="Negotiate smarter, not harder. Instantly craft persuasive, professional responses tailored to any deal." />
                    <FeatureCard icon={<BadgePercent />} title="Market-Based Pricing" description="Back your pricing with confidence. Get AI-driven insights to justify your rates and close better deals." />
                    <FeatureCard icon={<LayoutPanelTop />} title="Proposal Templates" description="Win clients faster! Use ready-made, high-converting proposal templates for seamless negotiations." />
                </div>
            </div>
        </>
    )
}

export default Home

function FeatureCard({ title, icon, description }) {
    return (
        <motion.div
            className="p-6 shadow-sm border border-slate-200 text-left rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h3 className="text-xl font-semibold text-gray-700 flex items-center gap-2">
                {icon}
                {title}
            </h3>
            <p className="text-gray-500 mt-2">{description}</p>
        </motion.div>
    );
}
