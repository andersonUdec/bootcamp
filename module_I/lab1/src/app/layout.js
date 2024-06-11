import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import FooterComponent from "lab1/Components/Shared/Footer/page";
import HeaderComponent from "lab1/Components/Shared/Header/page";
import 'bootstrap/dist/css/bootstrap.min.css';
const nunito_Sans = Nunito_Sans({ weight: ["400"], subsets: ["cyrillic"] });

export const metadata = {
  title: "ProductWeb",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={nunito_Sans.className}>
      <HeaderComponent/>
      {children}
      <FooterComponent/></body>
    </html>
  );
}