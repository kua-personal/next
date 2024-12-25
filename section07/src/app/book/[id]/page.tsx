import style from "./page.module.css";
import {BookData, ReviewData} from "@/types";
import React from "react";
import {notFound} from "next/navigation";
import ReviewItem from "@/components/review-item";
import ReviewEditor from "@/components/review-editor";

// generateStaticParams()에 없는 id로 접근하면 Dynamic 하게 생성되지 않기에 404로 처리되게됨
// export const dynamicParams = false // default=true

export function generateStaticParams() {
    return [{id: "1"}, {id: "2"}, {id: "3"}]
}

async function BookDetail({bookId}: Readonly<{ bookId: string }>) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${bookId}`);
    if (!response.ok) {
        if (response.status == 404) {
            notFound()
        }
        return <div>서버에서 도서 정보를 가져오지 못했습니다</div>;
    }

    const book: BookData = await response.json();

    const {title, subTitle, description, author, publisher, coverImgUrl} = book;

    return (
        <div>
            <div
                className={style.cover_img_container}
                style={{backgroundImage: `url('${coverImgUrl}')`}}
            >
                <img src={coverImgUrl} alt={"Book Cover Image"}/>
            </div>
            <div className={style.title}>{title}</div>
            <div className={style.subTitle}>{subTitle}</div>
            <div className={style.author}>
                {author} | {publisher}
            </div>
            <div className={style.description}>{description}</div>
        </div>
    );
}

async function ReviewList({bookId}: Readonly<{ bookId: string }>) {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/book/${bookId}`,
        {next: {tags: [`review-${bookId}`]}}
    )

    if (!response.ok) {
        throw new Error(`Review List fetch failed: ${response.statusText}`)
    }

    const reviews: ReviewData[] = await response.json()

    return <section>
        {reviews.map((review) => (
            <ReviewItem key={`review-item-${review.id}`} {...review} />
        ))}
    </section>
}

export default async function Page({ params }: Readonly<{ params: Promise<{ id: string }> }>) {
    const { id } = await params;

    return (
        <div className={style.container}>
            <BookDetail bookId={id} />
            <ReviewEditor bookId={id} />
            <ReviewList bookId={id} />
        </div>
    );
}