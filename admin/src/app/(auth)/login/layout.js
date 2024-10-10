import { Inter } from "next/font/google";
import ".././../globals.css";

const inter = Inter({ subsets: ["latin"] });


import { Roboto } from 'next/font/google'
 
const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})


import Themed from "./themed";
export const metadata = {
  title: "Konnexu - Admin Login",
  description: "This page is for showing Tailwind Material UI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" >
      <body className={roboto.className}>

        <Themed >

          {children}

        </Themed>

      </body>

    </html>
  );
}
