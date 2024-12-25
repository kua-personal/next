import BookItem from "@/components/book-item";
import {BookData} from "@/types";

export default async function Page({searchParams,}: Readonly<{ searchParams: Promise<{ q?: string; }> }>) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${(await searchParams).q}`);
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
