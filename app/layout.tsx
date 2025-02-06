import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: "Evently",
  description: "Making Every Event Seamless and Special.",
  icons: {
    icon: '/assets/icons/favicon.ico'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider afterSignOutUrl='/'>
      <html lang="en">
        <body className={`${poppins.variable}  antialiased`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
