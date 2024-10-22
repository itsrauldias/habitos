import { v4 as uuidv4 } from 'uuid';
import { Habito } from "../types/Habito"

function getAllHabitos() {
    let habitosList = JSON.parse(localStorage.getItem('habitos') + '')
    return habitosList
}

function createHabito(descricao: string) {
    let habitosListLocal: Habito[] = JSON.parse(localStorage.getItem('habitos') + '') || []

    const newHabit: Habito = {
        id: uuidv4(),
        descricao: descricao,
        status: true,
        weekdaysSelected: [],
        createdAt: new Date()
    }

    habitosListLocal.push(newHabit)

    localStorage.setItem('habitos', JSON.stringify(habitosListLocal))
}

function deleteHabito(id: string) {
    let habitosListLocal: Habito[] = JSON.parse(localStorage.getItem('habitos') + '') || []

    habitosListLocal = habitosListLocal.filter(function (obj: Habito) {
        return obj.id !== id;
    });

    localStorage.setItem('habitos', JSON.stringify(habitosListLocal))
}

function changeWeekdaysArray(habitId: string, weekDay: number) {
    let habitosListLocal: Habito[] = JSON.parse(localStorage.getItem('habitos') + '') || []

    const objIndex = habitosListLocal.findIndex(obj => obj.id == habitId);

    if (habitosListLocal[objIndex].weekdaysSelected.includes(weekDay)) {
        habitosListLocal[objIndex].weekdaysSelected = habitosListLocal[objIndex].weekdaysSelected.filter(item => item !== weekDay)
    } else {
        habitosListLocal[objIndex].weekdaysSelected.push(weekDay)
    }

    localStorage.setItem('habitos', JSON.stringify(habitosListLocal))
}

function toggleHabitoAtivo(habitId: string) {
    let habitosListLocal: Habito[] = JSON.parse(localStorage.getItem('habitos') + '') || []

    const objIndex = habitosListLocal.findIndex(obj => obj.id == habitId);

    habitosListLocal[objIndex].status = !habitosListLocal[objIndex].status

    localStorage.setItem('habitos', JSON.stringify(habitosListLocal))
}

function editHabito(habitId: string, value: string) {
    let habitosListLocal: Habito[] = JSON.parse(localStorage.getItem('habitos') + '') || []

    const objIndex = habitosListLocal.findIndex(obj => obj.id == habitId);

    habitosListLocal[objIndex].descricao = value

    localStorage.setItem('habitos', JSON.stringify(habitosListLocal))
}

export {
    getAllHabitos,
    createHabito,
    deleteHabito,
    changeWeekdaysArray,
    toggleHabitoAtivo,
    editHabito
}