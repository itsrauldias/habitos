import { ThemeMode } from "flowbite-react"

function getSysThemeColor() {
    let sysColorTheme: any = JSON.parse(localStorage.getItem('sysColorTheme') + '') || 'blue'

    return sysColorTheme
}

function setLocalSysThemeColor(color: string) {
    localStorage.setItem('sysColorTheme', JSON.stringify(color))
}

function getSysThemeDark() {
    let sysThemeDark: ThemeMode = JSON.parse(localStorage.getItem('sysThemeDark') + '') || 'auto'

    return sysThemeDark
}

function setLocalSysThemeDark(theme: ThemeMode) {
    localStorage.setItem('sysThemeDark', JSON.stringify(theme))
}

export {
    getSysThemeColor,
    setLocalSysThemeColor,
    getSysThemeDark,
    setLocalSysThemeDark
}