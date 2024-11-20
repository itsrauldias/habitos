import { Badge, Select } from "flowbite-react"
import { getSysThemeColor, getSysThemeDark, setLocalSysThemeColor, setLocalSysThemeDark } from "../../../services/sysThemeColorService"

export default function SystemConfigs() {

    const sysThemeColor = getSysThemeColor()
    const sysThemeDak = getSysThemeDark()

    const themeColorsList = [
        { value: "blue" },
        { value: "red" },
        { value: "green" },
        { value: "pink" },
        { value: "yellow" },
        { value: "purple" }
    ]

    function handleChangeTheme(theme: string) {
        setLocalSysThemeColor(theme)
        location.reload()
    }

    function handleChangeThemeDark(e: any) {
        console.log(e.target.value)
        setLocalSysThemeDark(e.target.value)
        location.reload()
    }

    return (
        <>
            <span className={`text-2xl font-bold tracking-tight text-${sysThemeColor}-500`}>Tema:</span>
            <Select id="countries" onChange={(e: any) => handleChangeThemeDark(e)}>
                <option value={'auto'} selected={sysThemeDak == 'auto' && true}>Automático</option>
                <option value={'light'} selected={sysThemeDak == 'light' && true}>Claro</option>
                <option value={'dark'} selected={sysThemeDak == 'dark' && true}>Escuro</option>
            </Select>
            <span className={`text-2xl font-bold tracking-tight text-${sysThemeColor}-500`}>Cores:</span>
            <div className="flex flex-wrap gap-2 justify-center">
                {themeColorsList.map((themeColor) => {
                    return (<div key={themeColor.value}>
                        <Badge
                            size='sm'
                            color={themeColor.value}
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleChangeTheme(themeColor.value)}
                        >{themeColor.value.charAt(0).toUpperCase() + themeColor.value.slice(1)}</Badge>
                    </div>)
                })}

            </div>
        </>
    )
}