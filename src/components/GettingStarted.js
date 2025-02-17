import React from 'react'
import Link from "next/link";

const GettingStarted = () => {
    return (
        <>
            <div className="max-w-5xl mx-auto px-8 pb-14 pt-8 space-y-12 text-gray-900">
                <header className="text-center">
                    <h1 className="text-3xl md:text-5xl font-extrabold">
                        NegotiaAI
                    </h1>
                    <p className="text-lg text-gray-600 mt-2">
                        <strong>Your AI-powered negotiation assistant</strong> for smarter deals.
                    </p>
                </header>

                <section className="space-y-6">
                    <h2 className="text-2xl md:ext-3xl font-semibold">What is <span className="underline">NegotiaAI</span>?</h2>
                    <p className="text-lg leading-relaxed">
                        <strong>NegotiaAI</strong> helps <em>freelancers, SaaS founders, real estate agents, and business
                            owners</em> craft <strong>persuasive responses</strong>, handle objections, and maximize deal value effortlessly.
                    </p>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl md:text-3xl font-semibold">How It Works</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 bg-white shadow-lg rounded-xl leading-relaxed">
                            <h3 className="text-xl font-semibold">1.Input Your Scenario</h3>
                            <p className="text-gray-600">Provide the conversation details or an offer you want to respond to.</p>
                        </div>
                        <div className="p-6 bg-white shadow-lg rounded-xl leading-relaxed">
                            <h3 className="text-xl font-semibold">2.AI-Powered Analysis</h3>
                            <p className="text-gray-600">NegotiaAI evaluates the message using <strong>sentiment analysis</strong> and negotiation tactics.</p>
                        </div>
                        <div className="p-6 bg-white shadow-lg rounded-xl leading-relaxed">
                            <h3 className="text-xl font-semibold">3.Receive Smart Suggestions</h3>
                            <p className="text-gray-600">Get AI-generated <strong>counteroffers</strong>, objection-handling responses, and deal-closing strategies.</p>
                        </div>
                        <div className="p-6 bg-white shadow-lg rounded-xl leading-relaxed">
                            <h3 className="text-xl font-semibold">4.Refine & Send</h3>
                            <p className="text-gray-600">Customize the response if needed and use it to <strong>maximize deal value</strong>.</p>
                        </div>
                    </div>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl md:text-3xl font-semibold">Example Scenarios</h2>
                    <div className="space-y-4">
                        <div className="border p-6 rounded-lg bg-gray-100">
                            <p className="font-medium text-lg">💼 <strong>Freelancer Negotiation</strong></p>
                            <p className="text-gray-700"><strong>Client:</strong> "Can you lower your rate for this project?"</p>
                            <p className="text-gray-700"><strong>NegotiaAI:</strong> <em>"I appreciate your interest in my services. Given the scope and quality of work, I can offer <strong>added value</strong> instead of reducing the price—would that work for you?"</em></p>
                        </div>
                        <div className="border p-6 rounded-lg bg-gray-100">
                            <p className="font-medium text-lg">📦 <strong>SaaS Pricing Negotiation</strong></p>
                            <p className="text-gray-700"><strong>Customer:</strong> "Your SaaS pricing seems a bit high."</p>
                            <p className="text-gray-700"><strong>NegotiaAI:</strong> <em>"Our pricing reflects the <strong>premium features</strong> and dedicated support we offer. However, I’d love to explore a plan that best fits your needs—let’s discuss what works for you."</em></p>
                        </div>
                        <div className="border p-6 rounded-lg bg-gray-100">
                            <p className="font-medium text-lg">🏡 <strong>Real Estate Deal</strong></p>
                            <p className="text-gray-700"><strong>Buyer:</strong> "I want a discount on this property."</p>
                            <p className="text-gray-700"><strong>NegotiaAI:</strong> <em>"This property is <strong>competitively priced</strong> based on market value. However, we can explore <strong>flexible payment options</strong> or additional benefits to make the deal more attractive."</em></p>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default GettingStarted