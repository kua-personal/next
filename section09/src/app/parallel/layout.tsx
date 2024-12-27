import {ReactNode} from "react";

export default function Layout({children, sidebar}: {children: ReactNode, sidebar: ReactNode}) {
    return (
        <div>
        <header>
            <h1>Parallel layout</h1>
        </header>
        <main>{children}</main>
        <aside>{sidebar}</aside>
        </div>
    );
}