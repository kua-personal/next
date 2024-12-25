import BookItem from "@/components/book-item";
import style from "./page.module.css";
import {BookData} from "@/types";

async function AllBooks() {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
        { cache: "no-cache" }
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
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`,
        { cache: "force-cache" }
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
                <RecommendedBooks/>
            </section>
            <section>
                <h3>등록된 모든 도서</h3>
                <AllBooks/>
            </section>
        </div>
    );
}
