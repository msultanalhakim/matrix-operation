import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "Matrix Operations | Fast & Easy Matrix Calculator",
    template: "%s | Matrix Operations",
  },
  description: "Calculate matrix addition, subtraction, multiplication, inverse, determinant, and transpose quickly and accurately. An online tool for students and professionals.",
  
  keywords: ["matrix calculator", "matrix operations", "linear algebra", "matrix addition", "matrix inverse", "determinant calculator", "matrix multiplication", "transpose matrix", "kalkulator matriks"],
  
  creator: "Muhammad Sultan Alhakim",

  openGraph: {
    title: "Matrix Operations Calculator",
    description: "An easy-to-use online tool for all your matrix calculation needs.",
    siteName: "Matrix Operations",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}