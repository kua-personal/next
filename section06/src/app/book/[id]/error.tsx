"use client"

import {memo, startTransition, useEffect} from "react";
import {useRouter} from "next/navigation";

export default memo(function ErrorPage({ error, reset }: { error: Error, reset: () => void }) {
    const router = useRouter()
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div>
            <h3>오류 발생!</h3>
            <button onClick={() => {
                // router.refresh는 비동기적 함수이기 때문에 router.refresh가 수행되기 전 reset()이 수행되는 문제가 있음
                // router.refresh는 async await을 적용해도 void를 반환하기에 문제가 여전함. 이를 해결하기 위해 React 18에 추가된 startTransition을 사용
                startTransition(() => {
                    router.refresh() // 현재 페이지에 필요한 서버컴포넌트들을 다시 불러옴
                    reset() // 에러 상태를 초기화. 클라이언트 컴포넌트를 다시 불러옴
                })
            }}>다시 시도</button>
        </div>
    );
});