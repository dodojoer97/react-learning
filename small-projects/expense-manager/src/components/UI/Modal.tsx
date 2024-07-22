// React
import type {FC, PropsWithChildren} from "react"
import { useRef, useEffect } from "react"


interface IModalProps extends PropsWithChildren {
    isOpen: boolean
}

const Modal: FC<IModalProps> = ({isOpen, children}) => {
    const dialog = useRef<HTMLDialogElement | null>(null)

    useEffect(() => {
        if(isOpen) {
            dialog.current?.showModal()
        }else {
            dialog.current?.close()
        }
    }, [isOpen])
    
    return <>
        <dialog ref={dialog}>
            {children}
        </dialog>
    </>
}

export default Modal