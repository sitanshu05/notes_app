import { Providers } from "../providers";
import { Inter } from "next/font/google";
import './globals.css'


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body className="dark bg-[#121212] min-w-screen min-h-screen text-white">
          <Providers>
            {children}
          </Providers>
        </body>
    </html>
  );
}
