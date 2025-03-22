import { Libre_Franklin } from "next/font/google";
import "./globals.css";

const libreFranklin = Libre_Franklin({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata = {
  title: "LinkList - Collaborative Name Lists",
  description:
    "Create and share lists where users can join and see live updates. Lists automatically expire after 7 days.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={libreFranklin.className}>{children}</body>
    </html>
  );
}
