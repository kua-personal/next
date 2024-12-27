import BookItem from "@/components/book-item";
import style from "./page.module.css";
import {BookData} from "@/types";
import {delay} from "@/util/delay";
import {Suspense} from "react";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";

// 특정 페이지의 유형을 강제로 Static, Dynamic 페이지로 설정
// export const dynamic = "auto" // default="auto"


async function AllBooks() {
    await delay(1500)
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
        {cache: "force-cache"}
    )
    if (!response.ok) {
        return <div>서버에서 도서 정보를 가져오지 못했습니다</div>
    }
    const allBooks: BookData[] = await response.json()

    return <div>
        {allBooks.map((book) => (
            <BookItem key={book.id} {...book} />
        ))}
    </div>
}

async function RecommendedBooks() {
    await delay(3000)
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`,
        {cache: "force-cache"}
    )
    if (!response.ok) {
        return <div>서버에서 도서 정보를 가져오지 못했습니다</div>
    }

    const recommendedBooks: BookData[] = await response.json()

    return <div>
        {recommendedBooks.map((book) => (
            <BookItem key={book.id} {...book} />
        ))}
    </div>
}

export default async function Home() {
    return (
        <div className={style.container}>
            <section>
                <h3>지금 추천하는 도서</h3>
                <Suspense fallback={<BookListSkeleton count={3}/>}>
                    <RecommendedBooks/>
                </Suspense>
            </section>
            <section>
                <h3>등록된 모든 도서</h3>
                <Suspense fallback={<BookListSkeleton count={10}/>}>
                    <AllBooks/>
                </Suspense>
            </section>
        </div>
    )
}
