import { Button, Modal } from "flowbite-react";
import { ReactNode, useState } from "react";

type FbrModalType = {
    content: ReactNode
    trigger: 'button' | 'span'
    triggerTitle: ReactNode
    buttonColor?: string
    buttonSize?: string
    modalSize?: 'sm' | 'md' | 'lg' | 'xl'
    onCloseFunction?: () => void
}

export default function FbrModal({ content, trigger, triggerTitle, buttonColor, buttonSize, modalSize, onCloseFunction }: FbrModalType) {

    const [openModal, setOpenModal] = useState(false);

    function handleSetModalClose() {
        onCloseFunction && onCloseFunction()
        setOpenModal(false)
    }

    return (
        <>
            {trigger == 'button' && <Button color={buttonColor} size={buttonSize || 'md'} onClick={() => setOpenModal(true)}>{triggerTitle}</Button >}
            {trigger == 'span' && <span onClick={() => setOpenModal(true)} style={{ cursor: 'pointer' }}>{triggerTitle}</span>}

            <Modal
                show={openModal}
                onClose={() => handleSetModalClose()}
                dismissible
                size={modalSize || 'md'}
            >
                <Modal.Body>
                    {content}
                    <div className="flex gap-1">
                        <Button size={'sm'} onClick={() => handleSetModalClose()}>Salvar</Button>
                        <Button size={'sm'} onClick={() => setOpenModal(false)}>Cancelar</Button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}