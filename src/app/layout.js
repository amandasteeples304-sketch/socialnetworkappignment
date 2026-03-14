import { ClerkProvider } from "@clerk/nextjs";
import { Unna } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";

const unna = Unna({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "Animal Travels",
  description: "What animals have you seen?",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${unna.className} antialiased`}>
        <ClerkProvider>
          <header className="flex justify-end items-center p-4 gap-4 h-16">
            <NavBar />
          </header>
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
