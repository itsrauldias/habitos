import { Badge } from "flowbite-react"
import { setLocalSysThemeColor } from "../../../services/sysThemeColorService"

export default function SystemConfigs() {

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
            <span className="text-2xl font-bold tracking-tight text-gray-700 dark:text-slate-300">Tema:</span>
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