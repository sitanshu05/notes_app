import { Providers } from "../providers";
import { Appbar } from "./components/Appbar"
import './globals.css'


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"  className=" bg-[#121212]  text-white" >
        <body className="dark ">
          <Appbar />
          <Providers>
            {children}
          </Providers>
        </body>
    </html>
  );
}
