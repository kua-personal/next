import type {BookData} from "@/types";
import Link from "next/link";
import style from "./book-item.module.css";
import Image from "next/image";

export default function BookItem({
                                     id,
                                     title,
                                     subTitle,
                                     // description,
                                     author,
                                     publisher,
                                     coverImgUrl,
                                 }: Readonly<BookData>) {
    return (
        <Link href={`/book/${id}`} className={style.container}>
            <Image src={coverImgUrl} alt={"Book Cover Image"}/>
            <div>
                <div className={style.title}>{title}</div>
                <div className={style.subTitle}>{subTitle}</div>
                <br/>
                <div className={style.author}>
                    {author} | {publisher}
                </div>
            </div>
        </Link>
    );
}