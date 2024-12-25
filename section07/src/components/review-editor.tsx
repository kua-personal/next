'use client'

import {createReviewAction} from "@/actions/create-review.action";
import React, {useActionState, useEffect} from "react";
import style from './review-editor.module.css';

export default function ReviewEditor({bookId} : Readonly<{ bookId: string }>) {
    const [state, formAction, isPending] = useActionState(createReviewAction, null)

    useEffect(() => {
        if (state && !state.status) {
            alert(state.error)
        }
    }, [state])

    return <div>
        <form className={style.form_container} action={formAction}>
            <input name="bookId" value={bookId} hidden readOnly />
            <textarea disabled={isPending} name="content" placeholder={"리뷰 내용"} required />
            <div className={style.submit_container}>
                <input disabled={isPending} name="author" placeholder={"작성자명"} required />
                <button disabled={isPending} type={"submit"}>
                    {isPending ? "..." : "작성하기"}
                </button>
            </div>
        </form>
    </div>
}