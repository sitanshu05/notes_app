import { Providers } from "../providers";
import { Appbar } from "./components/Appbar"
import './globals.css'


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"  >
        <body className="dark bg-[#121212] min-w-screen min-h-screen text-white">
          <Appbar />
          <Providers>
            {children}
          </Providers>
        </body>
    </html>
  );
}
