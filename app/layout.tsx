import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Elegy - A space to grieve who you used to be",
  description: "Sebuah web app refleksi diri yang intim.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="antialiased min-h-screen font-sans bg-background text-text-primary">
        {children}
      </body>
    </html>
  );
}
