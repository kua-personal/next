import style from "./page.module.css";
import {BookData} from "@/types";
import React from "react";
import Image from "next/image";
import {notFound} from "next/navigation";

// generateStaticParams()에 없는 id로 접근하면 Dynamic 하게 생성되지 않기에 404로 처리되게됨
// export const dynamicParams = false // default=true

export function generateStaticParams() {
    return [{ id: "1" }, { id: "2" }, { id: "3" }]
}

export default async function Page({params}: Readonly<{ params: Promise<{ id: string | string[] }> }>) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${(await params).id}`);
    if (!response.ok) {
        if (response.status == 404) {
            notFound()
        }
        return <div>서버에서 도서 정보를 가져오지 못했습니다</div>;
    }

    const book: BookData = await response.json();

    const {title, subTitle, description, author, publisher, coverImgUrl} = book;

    return (
        <div className={style.container}>
            <div
                className={style.cover_img_container}
                style={{backgroundImage: `url('${coverImgUrl}')`}}
            >
                <Image src={coverImgUrl} alt={"Book Cover Image"}/>
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
