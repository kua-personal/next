import style from "./page.module.css";
import {BookData} from "@/types";

export default async function Page({params}: Readonly<{ params: Promise<{ id: string | string[] }> }>) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${(await params).id}`);
    if (!response.ok) {
        return <div>서버에서 도서 정보를 가져오지 못했습니다</div>;
    }

    const book: BookData = await response.json();

    const {id, title, subTitle, description, author, publisher, coverImgUrl} = book;

    return (
        <div className={style.container}>
            <div
                className={style.cover_img_container}
                style={{backgroundImage: `url('${coverImgUrl}')`}}
            >
                <img src={coverImgUrl}/>
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
