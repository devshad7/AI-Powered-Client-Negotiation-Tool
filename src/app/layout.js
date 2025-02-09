import "./globals.css";

export const metadata = {
  title: "NegotiaAI | AI-Powered Negotiation Assistant",
  description: "NegotiaAI helps you close better deals with AI-generated smart responses, market-based pricing insights, and ready-made proposal templates. Elevate your negotiations effortlessly!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
