import {ReactNode, useEffect, useState} from "react";
import SearchableLayout from "@/components/searchable-layout";
import BookItem from "@/components/book-item";
import fetchBooks from "@/lib/fetch-books";
import {useRouter} from "next/router";
import {BookData} from "@/types";
import Head from "next/head";

export default function Page() {
    const [books, setBooks] = useState<BookData[]>([]);

    const router = useRouter()
    const q = router.query.q as string;

    const fetchSearchResult = async () => {
        const data = await fetchBooks(q);
        setBooks(data);
    }

    useEffect(() => {
        if (q) {
            fetchSearchResult();
        }
    }, [q]);

    return <div>
        <Head>
            <title>한입북스 - 검색결과</title>
            <meta property="og:image" content={"/thumbnail.png"}/>
            <meta property="og:title" content={"한입북스 - 검색결과"}/>
            <meta property="og:description" content={"한입에 읽을 수 있는 책들을 소개합니다."}/>
        </Head>
        {books.map((book) => (
            <BookItem key={book.id} {...book} />
        ))}
    </div>
}


Page.getLayout = (page: ReactNode) => {
    return <SearchableLayout>{page}</SearchableLayout>
}