import { Inter } from "next/font/google";
import "./globals.css";
import FooterComponent from "lab1/Components/Shared/Footer/page";
import HeaderComponent from "lab1/Components/Shared/Header/page";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ProductWeb",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <HeaderComponent/>
        <main >{children}</main>
        <FooterComponent/>
      </body>
    </html>
  );
}