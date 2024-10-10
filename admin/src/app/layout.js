import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

import Themed from "./themed";
export const metadata = {
  title: "Konnexu ACP",
  description: "Manage Konnexu settings from here",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >

        <Themed >

          {children}

        </Themed>

      </body>

    </html>
  );
}
