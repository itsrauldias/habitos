import { Button, TextInput } from "flowbite-react"
import { getSysThemeColor, getSysThemeDark } from "../../../services/sysThemeColorService"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { PiCopy, PiPlus } from "react-icons/pi"

export default function SystemData() {

    const sysThemeColor = getSysThemeColor()
    const sysThemeDak = getSysThemeDark()

    // pegar lista de hábitos do localstorage
    const habitos = JSON.parse(localStorage.getItem('habitos') + '')
    const dayHabits = JSON.parse(localStorage.getItem('dayHabits') + '')

    const [myLocalData, setMyLocalData] = useState('')
    const [importData, setImportData] = useState<any>('')

    async function handleCopyToClipboard(textToCopy: string) {
        await navigator.clipboard.writeText(textToCopy);
        toast.success('Copiado!');
    }

    async function handleImportData() {
        try {
            const data: any = JSON.parse(importData)
            if (
                Array.isArray(data) &&
                data.some((item: any) => item.name === 'habitos') &&
                data.some((item: any) => item.name === 'dayHabits') &&
                data.some((item: any) => item.name === 'flowbite_theme_mode') &&
                data.some((item: any) => item.name === 'sysColorTheme')
            ) {
                localStorage.setItem('habitos', JSON.stringify(data.find(item => item.name === "habitos").value))
                localStorage.setItem('dayHabits', JSON.stringify(data.find(item => item.name === "dayHabits").value))
                localStorage.setItem('flowbite-theme-mode', JSON.stringify(data.find(item => item.name === "flowbite_theme_mode").value))
                localStorage.setItem('sysColorTheme', JSON.stringify(data.find(item => item.name === "sysColorTheme").value))
                toast.success('Dados importados com sucesso!');
            } else {
                toast.error('Dados inválidos!');
            }
        } catch (e) {
            toast.error('Dados inválidos!');
            return
        }
    }

    useEffect(() => {
        const localdata = [
            { name: 'habitos', value: habitos },
            { name: 'dayHabits', value: dayHabits },
            { name: 'flowbite_theme_mode', value: sysThemeDak },
            { name: 'sysColorTheme', value: sysThemeColor }
        ]
        setMyLocalData(JSON.stringify(localdata, undefined, 2))
    }, [])

    return (
        <>
            <span className={`text-2xl font-bold tracking-tight text-${sysThemeColor}-500`}>Dados e backup:</span>
            <div className="flex gap-2">
                <TextInput
                    type="text"
                    disabled
                    placeholder=""
                    value={myLocalData}
                />
                <Button
                    color={sysThemeColor}
                    className="flex items-center justify-center"
                    onClick={() => { handleCopyToClipboard(myLocalData) }}
                >
                    <div className="flex items-center">
                        <PiCopy />
                    </div>
                </Button>
            </div>
            <hr />
            <span className={`text-2xl font-bold tracking-tight text-${sysThemeColor}-500`}>Importar dados:</span>
            <textarea
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:
                dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
                dark:bg-gray-800"
                value={importData}
                onChange={(e: any) => setImportData(e.target.value)}
            />
            <Button
                color={sysThemeColor}
                onClick={handleImportData}
            >
                <div className="flex items-center">
                    <PiPlus className="mr-2" /> Importar
                </div>
            </Button>
        </>
    )
}