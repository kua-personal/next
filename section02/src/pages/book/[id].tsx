import style from "./[id].module.css"
import {GetStaticPropsContext, InferGetStaticPropsType} from "next";
import fetchBook from "@/lib/fetch-book";
import {useRouter} from "next/router";
import Head from "next/head";

export const getStaticPaths = () => {
    return {
        paths: [
            {params: {id: "1"}},
            {params: {id: "2"}},
            {params: {id: "3"}},
            {params: {id: "4"}},
            {params: {id: "5"}},
        ],
        fallback: true
    }
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
    const id = context.params!.id;
    const book = await fetchBook(Number(id));

    if (!book) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            book
        }
    }
}

export default function Page({book}: Readonly<InferGetStaticPropsType<typeof getStaticProps>>) {
    const router = useRouter()

    if (router.isFallback) return <>
        <Head>
            <title>한입북스</title>
            <meta property="og:image" content={"/thumbnail.png"} />
            <meta property="og:title" content={"한입북스"} />
            <meta property="og:description" content={"한입에 읽을 수 있는 책들을 소개합니다."} />
        </Head>
        <div>Loading...</div>
    </>
    if (!book) return "책 정보가 없습니다.";

    const {
        title, subTitle, description, author, publisher, coverImgUrl
    } = book

    return <>
        <Head>
            <title>{title}</title>
            <meta property="og:image" content={coverImgUrl}/>
            <meta property="og:title" content={title}/>
            <meta property="og:description" content={description}/>
        </Head>
        <div className={style.container}>
            <div
                className={style.cover_img_container}
                style={{backgroundImage: `url('${coverImgUrl}')`}}
            >
                <img src={coverImgUrl}/>
            </div>
            <div className={style.title}>{title}</div>
            <div className={style.subTitle}>{subTitle}</div>
            <div className={style.author}>{author} | {publisher}</div>
            <div className={style.description}>{description}</div>
        </div>
    </>
}