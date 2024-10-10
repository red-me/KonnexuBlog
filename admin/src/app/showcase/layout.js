
import themed from "./themed";
export const metadata = {
  title: "Tailwind Material Showcase Page",
  description: "This page is for showing Tailwind Material UI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >

        <themed>

          {children}

        </themed>
      </body>

    </html>
  );
}
