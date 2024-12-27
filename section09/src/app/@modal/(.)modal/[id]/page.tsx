import BookPage from "@/app/book/[id]/page"
import Modal from "@/components/modal";

export default function Page(props: any) {
    return <div>
        <Modal>
            가로챔
            <BookPage {...props} />
        </Modal>
    </div>
}