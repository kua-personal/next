import BookItem from "@/components/book-item";
import {BookData} from "@/types";
import {delay} from "@/util/delay";
import {Suspense} from "react";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";

async function SearchResult({q}: Readonly<{ q: string }>) {
    await delay(2000)
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`,
        {cache: "force-cache"}
    );
    if (!response.ok) {
        return <div>서버에서 도서 정보를 가져오지 못했습니다</div>;
    }

    const books: BookData[] = await response.json();

    return (
        <div>
            {books.map((book) => (
                <BookItem key={book.id} {...book} />
            ))}
        </div>
    );
}

export default function Page({searchParams}: Readonly<{ searchParams: { q?: string; } }>) {
    const searchQuery = searchParams.q ?? "";
    return <Suspense key={searchQuery} fallback={<BookListSkeleton count={5}/>}>
        <SearchResult q={searchQuery}/>
    </Suspense>
}