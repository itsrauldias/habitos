import dayjs from "dayjs"

function getAllDiaHabitos(dia: Date) {
    let diaHabitosListLocal: any = JSON.parse(localStorage.getItem('dayHabits') + '') || []

    const dayHabitsList = diaHabitosListLocal.filter((obj: { habitoId: string, data: Date }) => {
        if (dayjs(obj.data).format('YYYYMMDD') == dayjs(dia).format('YYYYMMDD')) {
            return obj
        }
    })

    return dayHabitsList
}

function getDayhabitsByHabitId(habitId: string) {
    let diaHabitosListLocal: any = JSON.parse(localStorage.getItem('dayHabits') + '') || []

    return diaHabitosListLocal.filter((obj: { habitoId: string, data: Date }) => {
        if (obj.habitoId == habitId) {
            return obj
        }
    })
}


function setDiaHabitoDone(habitoId: string, data: Date) {
    let diaHabitosListLocal: any = JSON.parse(localStorage.getItem('dayHabits') + '') || []

    const objIndex = diaHabitosListLocal.findIndex((obj: { habitoId: string, data: Date }) => obj.habitoId == habitoId && dayjs(obj.data).format('YYYYMMDD') == dayjs(data).format('YYYYMMDD'));

    if (objIndex >= 0) {
        diaHabitosListLocal.splice(objIndex, 1)
    } else {
        diaHabitosListLocal.push(
            {
                habitoId: habitoId,
                data: new Date(data)
            }
        )
    }

    localStorage.setItem('dayHabits', JSON.stringify(diaHabitosListLocal))
}

export {
    getAllDiaHabitos,
    getDayhabitsByHabitId,
    setDiaHabitoDone
}