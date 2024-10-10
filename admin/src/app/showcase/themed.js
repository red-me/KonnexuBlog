"use client";
import { ThemeProvider } from "@material-tailwind/react";

/* export const metadata = {
  title: "Tailwind Material Showcase Page",
  description: "This page is for showing Tailwind Material UI",
}; */

export default function themed({ children }) {
  return (
    <html lang="en">
      <body className="blue-gray-50" >
        <ThemeProvider>

          {children}

        </ThemeProvider>
      </body>

    </html>
  );
}
