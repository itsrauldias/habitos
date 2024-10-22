import { Navbar } from "flowbite-react";
import DrawerMenu from "../DrawerMenu";
import { FaBars, FaCogs } from "react-icons/fa";
import Configs from "../Configs";

export default function Header() {

    return (
        <Navbar className="bg-slate-200 dark:bg-gray-900 dark:text-gray-400">
            <Navbar.Brand>
                <img
                    src="/dev.png"
                    alt="logo"
                    className='mr-2'
                    width={40}
                />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                    Hábitos
                </span>
            </Navbar.Brand>
            <DrawerMenu
                ButtonTitle={<FaBars />}
                ButtonColor={'dark'}
                MenuTitle="Configurações"
                MenuIcon={FaCogs}
                Content={<Configs />}
                position="right"
            />
        </Navbar >
    )
}