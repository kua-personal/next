import styles  from './review-item.module.css';
import {ReviewData} from "@/types";
import ReviewItemDeleteButton from "@/components/review-item-delete-button";

export default function ReviewItem({id, content, author, createdAt, bookId}: Readonly<ReviewData>) {
    return (
        <div className={styles.container}>
            <div className={styles.author}>{author}</div>
            <div className={styles.content}>{content}</div>
            <div className={styles.bottom_container}>
                <div className={styles.created_at}>{new Date(createdAt).toLocaleString()}</div>
                <div className={styles.delete_btn}>
                    <ReviewItemDeleteButton reviewId={id} bookId={bookId} />
                </div>
            </div>
        </div>
    )
}