'use server'

import {revalidatePath} from "next/cache";

export async function createReviewAction(
    state: { status: boolean; error: string } | null,
    formData: FormData
) {
    const bookId = formData.get("bookId")?.toString();
    const content = formData.get("content")?.toString();
    const author = formData.get("author")?.toString();

    if (!bookId || !content || !author) return {
        status: false,
        error: "리뷰 내용이 작성되지 않았습니다."
    }

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({bookId, content, author}),
            }
        )

        if (!response.ok)
            throw new Error(response.statusText)
        
        // // 1. 특정 주소의 해당하는 페이지만 재검증
        // revalidatePath(`/book/${bookId}`)
        //
        // // 2. 특정 경로의 모든 동적 페이지를 재검증
        // revalidatePath(`/book/[id]`, "page")
        //
        // // 3. 특정 레이아웃을 갖는 모든 페이지 재검증
        // revalidatePath(`/(with-searchbar)`, "layout")
        //
        // // 4. 모든 데이터 재검증
        // revalidatePath("/", "layout")
        
        // 5. 태그 기준 데이터 캐시 재검증
        revalidatePath(`review-${bookId}`) // fetch 내 tag 설정

        return {
            status: true,
            error: ""
        }
    } catch (err) {
        console.error(err)
        return {
            status: false,
            error: `리뷰 작성 중 오류가 발생했습니다.: ${err}`
        }
    }
}