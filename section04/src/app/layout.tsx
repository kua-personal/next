import "./globals.css";
import Link from "next/link";
import style from "./layout.module.css";
import {BookData} from "@/types";

async function Footer() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`);
    if (!response.ok) {
        return <footer>제작 @kuass</footer>;
    }

    const books: BookData[] = await response.json();
    const bookCount = books.length;

    return <footer>제작 @kuass | {bookCount}개의 책이 등록되어 있습니다.</footer>;
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body>
        <div className={style.container}>
            <header>
                <Link href={"/"}>📚 ONEBITE BOOKS</Link>
            </header>
            <main>{children}</main>
           <Footer />
        </div>
        </body>
        </html>
    );
}