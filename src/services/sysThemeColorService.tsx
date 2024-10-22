function getSysThemeColor() {
    let sysColorTheme: any = JSON.parse(localStorage.getItem('sysColorTheme') + '') || 'blue'

    return sysColorTheme
}

function setLocalSysThemeColor(color: string) {
    localStorage.setItem('sysColorTheme', JSON.stringify(color))
}


export {
    getSysThemeColor,
    setLocalSysThemeColor
}