import React, {ReactNode, useEffect, useState} from "react";
import {useRouter} from "next/router";
import style from "./searchable-layout.module.css"

export default function SearchableLayout({children}: {
    children: ReactNode
}) {
    const [search, setSearch] = useState<string>("")
    const router = useRouter()

    const q = router.query.q as string;

    useEffect(() => {
        setSearch(q || "")
    }, []);

    const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    const onSubmit = () => {
        if (!search || q === search) return
        router.push(`/search?q=${search}`)
    }

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onSubmit()
        }
    }

    return (
        <div>
            <div className={style.searchbar_container}>
                <input value={search} onChange={onChangeSearch} onKeyDown={onKeyDown} placeholder="검색어를 입력하세요 ..."/>
                <button onClick={onSubmit}>검색</button>
            </div>
            {children}
        </div>
    )
}