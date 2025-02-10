import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import AuthHandler from "@/components/AuthHandler";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "NegotiaAI | AI-Powered Negotiation Assistant",
  description: "NegotiaAI helps you close better deals with AI-generated smart responses, market-based pricing insights, and ready-made proposal templates. Elevate your negotiations effortlessly!",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        layout: {
          unsafe_disableDevelopmentModeWarnings: true,
        },
      }}>
      <html lang="en">
        <body suppressHydrationWarning>
          <AuthHandler />
          <Toaster />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
