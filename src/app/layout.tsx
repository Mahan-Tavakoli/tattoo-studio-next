import "./globals.css";
import { Roboto_Condensed } from "next/font/google";
import { Encode_Sans } from "next/font/google";

const roboto_condensed = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["600"],
  display: "swap",
  variable: "--font-roboto-condensed",
});

const encode_sans = Encode_Sans({
  subsets: ["latin"],
  weight: ["400", "300", "700"],
  display: "swap",
  variable: "--font-encode_sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${roboto_condensed.variable} ${encode_sans.variable}`}>
      <body className={`antialiased bg-carbon-black ${encode_sans.className}`}>
        {children}
      </body>
    </html>
  );
}
