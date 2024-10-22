export type Habito = {
    id: string,
    descricao: string,
    weekdaysSelected: number[],
    status: boolean,
    createdAt: Date
}

export type HabitoWithDayCheck = {
    id: string,
    descricao: string,
    weekdaysSelected: number[],
    isDone: boolean,
    status: boolean,
    createdAt: Date
}