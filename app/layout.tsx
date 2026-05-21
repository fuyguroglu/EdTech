import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EdTech - High School Supplemental Learning",
  description: "Connect with expert instructors for personalized high school education",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
