import style from "./index.module.css"
import {ReactNode} from "react";
import SearchableLayout from "@/components/searchable-layout";
import BookItem from "@/components/book-item";
import {InferGetStaticPropsType} from "next";
import fetchBooks from "@/lib/fetch-books";
import fetchRandomBooks from "@/lib/fetch-random-books";
import Head from "next/head";

export const getStaticProps = async () => {
    const [allBooks, recoBooks] = await Promise.all([
        fetchBooks(),
        fetchRandomBooks()
    ]);

    return {
        props: {
            allBooks,
            recoBooks
        },
        // revalidate: 10 // ISR
        // @/pages/api/revalidate.ts 에서 On-Demand ISR을 사용하도록 변경함
    }
}

export default function Home({allBooks, recoBooks}: Readonly<InferGetStaticPropsType<typeof getStaticProps>>) {
    return (
        <>
            <Head>
                <title>한입북스</title>
                <meta property="og:image" content={"/thumbnail.png"} />
                <meta property="og:title" content={"한입북스"} />
                <meta property="og:description" content={"한입에 읽을 수 있는 책들을 소개합니다."} />
            </Head>
            <div className={style.container}>
                <section>
                    <h3>지금 추천하는 도서</h3>
                    {recoBooks.map((book) => <BookItem key={book.id} {...book} />)}
                </section>
                <section>
                    <h3>등록된 모든 도서</h3>
                    {allBooks.map((book) => <BookItem key={book.id} {...book} />)}
                </section>
            </div>
        </>
    );
}

Home.getLayout = (page: ReactNode) => {
    return <SearchableLayout>{page}</SearchableLayout>
}