import { ReactNode, useState } from "react";
import { Button, Drawer } from "flowbite-react";
import { IconType } from "react-icons";
import { HiPlus } from "react-icons/hi";

type DrawerMenu = {
    ButtonTitle: ReactNode
    ButtonColor: "blue" | "dark" | "light" | "success" | "failure" | "warning"
    MenuTitle: string
    MenuIcon: IconType
    Content: ReactNode
    position: "left" | "top" | "right" | "bottom" | undefined
}

export default function DrawerMenu({ ButtonTitle, MenuTitle, ButtonColor, MenuIcon, Content, position }: DrawerMenu) {

    const [isOpen, setIsOpen] = useState(false);

    const handleClose = () => setIsOpen(false);

    return (
        <>
            <Button color={ButtonColor} onClick={() => setIsOpen(true)}>{ButtonTitle}</Button>
            <Drawer open={isOpen} onClose={handleClose} position={position || 'left'}>
                <Drawer.Header title={MenuTitle} titleIcon={MenuIcon || HiPlus} />
                <Drawer.Items>
                    {Content}
                </Drawer.Items>
            </Drawer>
        </>
    )
}