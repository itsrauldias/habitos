import { Navbar } from "flowbite-react";
import DrawerMenu from "../DrawerMenu";
import { FaBars, FaCogs } from "react-icons/fa";
import Configs from "../Configs";
import { getSysThemeColor } from "../../services/sysThemeColorService";

export default function Header() {

    const sysThemeColor = getSysThemeColor() + ''

    return (
        // <Navbar className="bg-gray-50 dark:bg-gray-950 dark:text-gray-400">
        <Navbar className={`bg-${sysThemeColor}-50 dark:bg-slate-900`}>
            <Navbar.Brand>
                <img
                    src={`/assets/habitos_${sysThemeColor}.png`}
                    alt="logo"
                    className='mr-2'
                    width={40}
                />
                <span className={`self-center whitespace-nowrap text-xl font-semibold text-${sysThemeColor}-500`}>
                    Hábitos
                </span>
            </Navbar.Brand>
            <DrawerMenu
                ButtonTitle={<FaBars />}
                ButtonColor={sysThemeColor}
                MenuTitle="Configurações"
                MenuIcon={FaCogs}
                Content={<Configs />}
                position="right"
            />
        </Navbar >
    )
}