'use client'

import {useActionState, useEffect, useRef} from "react";
import {deleteReview} from "@/actions/delete-reivew.action";

export default function ReviewItemDeleteButton({reviewId, bookId}: Readonly<{ reviewId: number, bookId: number }>) {

    const formRef = useRef<HTMLFormElement>(null)
    const [state, formAction, isPending] = useActionState(deleteReview, null)

    useEffect(() => {
        if (state && !state.status) {
            alert(state.error)
        }
    }, [state])

    return <form ref={formRef} action={formAction}>
        <input name={"reviewId"} value={reviewId} hidden readOnly/>
        <input name={"bookId"} value={bookId} hidden readOnly/>
        {isPending ? (
            <div>...</div>
        ) : <div onClick={() => formRef.current?.requestSubmit()}>삭제하기</div>
        }

    </form>
}