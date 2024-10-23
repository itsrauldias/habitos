import { Badge } from "flowbite-react"
import { getSysThemeColor, setLocalSysThemeColor } from "../../../services/sysThemeColorService"

export default function SystemConfigs() {

    const sysThemeColor = getSysThemeColor()

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

    return (
        <>
            <span className={`text-2xl font-bold tracking-tight text-${sysThemeColor}-500`}>Tema:</span>
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