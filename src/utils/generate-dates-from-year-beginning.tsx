import dayjs from "dayjs";

export function generateDatesFromYearBeginning(dataSelecionada: Date) {


    const firstDayOfTheYear = dayjs(dataSelecionada).startOf('year')

    if (new Date().getFullYear() == dataSelecionada.getFullYear()) {
        const today = new Date()

        const dates = []

        let compareDate = firstDayOfTheYear

        while (compareDate.isBefore(today)) {
            dates.push(compareDate.toDate())
            compareDate = compareDate.add(1, 'day')
        }

        return dates
    } else {
        const today = dayjs(dataSelecionada).endOf('year')

        const dates = []

        let compareDate = firstDayOfTheYear

        while (compareDate.isBefore(today)) {
            dates.push(compareDate.toDate())
            compareDate = compareDate.add(1, 'day')
        }

        return dates
    }
}

export function generateVoidBoxes(weekDay: any) {
    var voidArray: string[] = [];

    if (weekDay == "Monday") {
        voidArray.push("Segunda-feira")
    } else if (weekDay == "Tuesday") {
        voidArray.push("Segunda-feira", "Terça-feira")
    } else if (weekDay == "Wednesday") {
        voidArray.push("Segunda-feira", "Terça-feira", "Quarta-feira")
    } else if (weekDay == "Thursday") {
        voidArray.push("Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira")
    } else if (weekDay == "Friday") {
        voidArray.push("Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira")
    } else if (weekDay == "Saturday") {
        voidArray.push("Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado")
    }

    return voidArray
}
