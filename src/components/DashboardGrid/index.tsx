import { useEffect, useState } from "react";
import { Button, Drawer, Progress, ToggleSwitch } from "flowbite-react";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import dayjs from "dayjs";
import { generateDatesFromYearBeginning, generateVoidBoxes } from "../../utils/generate-dates-from-year-beginning";
import { toggleSwitchTheme } from "../../styles/flowbiteThemes";
import { Habito, HabitoWithDayCheck } from "../../types/Habito";
import { getAllHabitos } from "../../services/habitosService";
import { getAllDiaHabitos, setDiaHabitoDone } from "../../services/diaHabitoService";
import { getSysThemeColor } from "../../services/sysThemeColorService";

export default function DashboardGrid() {

    const sysThemeColor = getSysThemeColor()
    const [anoSelecionado, setAnoSelecionado] = useState(new Date())

    const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
    const [summaryDates, setSummaryDates] = useState(generateDatesFromYearBeginning(anoSelecionado));

    const voidBoxes = generateVoidBoxes(summaryDates[0].toLocaleString('en-us', { weekday: 'long' }));

    function handleAddYear() {
        const newDate = anoSelecionado.setFullYear(anoSelecionado.getFullYear() + 1)
        setAnoSelecionado(new Date(newDate))

        const newDatesList = generateDatesFromYearBeginning(new Date(newDate))
        setSummaryDates(newDatesList)
    }

    function handleRemoveYear() {
        const newDate = anoSelecionado.setFullYear(anoSelecionado.getFullYear() - 1)
        setAnoSelecionado(new Date(newDate))

        const newDatesList = generateDatesFromYearBeginning(new Date(newDate))
        setSummaryDates(newDatesList)
    }

    function updatee() {
        setSummaryDates(generateDatesFromYearBeginning(anoSelecionado))
    }

    useEffect(() => {
        setTimeout(() => {
            var my_element = document.getElementById(`square_` + dayjs().format('YYYYMMDD'));
            my_element?.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    })

    return (
        <>
            <div className="mb-4" style={{ marginTop: '-3rem' }}>
                <div className="flex justify-between px-2 md:px-4">
                    <div />
                    <div className="flex items-center">
                        <Button pill color={sysThemeColor} className="" onClick={() => handleRemoveYear()}>
                            <HiArrowLeft />
                        </Button>
                        <span className={`text-2xl mx-2 text-${sysThemeColor}-500`}>
                            {anoSelecionado.getFullYear()}
                        </span>
                        <Button pill color={sysThemeColor} className="" onClick={() => handleAddYear()}>
                            <HiArrowRight />
                        </Button>
                    </div>
                </div>
            </div>
            <div className="flex">
                <div>
                    <div className="grid grid-rows-7 grid-flow-row gap-1">
                        {weekDays.map((weekday, i) => {
                            return (
                                <div key={`${weekday}-${i}`} className="text-zinc-700 dark:text-zinc-400 text-xl h-12 w-12 font-bold flex items-center justify-center">
                                    {weekday}
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className='flex overflow-x-auto overflow-hidden pr-3 pb-2 rounded-md'>
                    <div className='float-left'>
                        <div className='flex'>
                            <div className="overflow-auto">
                                <div className='grid grid-rows-7 grid-flow-col gap-1'>

                                    {voidBoxes.map((voidBox: string) => {
                                        return (
                                            <div key={voidBox} className={`h-12 w-12 px-1 rounded-md text-slate-400 bg-slate-300 dark:bg-gray-800`} />
                                        )
                                    })}

                                    {summaryDates.map((dataEmQuestao) => {
                                        // -[ ] validação para ação apenas nos quadradinhos com data menor que a atual
                                        return <div
                                            key={dayjs(dataEmQuestao).format('YYYYMMDD')}
                                            id={`square_` + dayjs(dataEmQuestao).format('YYYYMMDD')}
                                            style={{ scrollMarginLeft: '-4rem' }}
                                        >
                                            <DaySquare dataSquare={dataEmQuestao} onUpdate={() => updatee()} />
                                        </div>
                                    })}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function DaySquare({ dataSquare, onUpdate }: any) {

    const sysThemeColor = getSysThemeColor()

    const [isOpen, setIsOpen] = useState(false);

    const habitsList = getAllHabitos()

    var dayHabitsList = habitsList ? habitsList.filter(function (obj: Habito) {


        // se a data do quadrado for maior ou igual a data de criação do hábito
        if (parseInt(dayjs(dataSquare).format('YYYYMMDD')) >= parseInt(dayjs(obj.createdAt).format('YYYYMMDD')) && obj.status == true) {
            return obj.weekdaysSelected.includes(parseInt(dayjs(dataSquare).format('d')) + 1);
        }


    }) : [];

    // Lista de hábitos concluídos no dia
    const dayHabits = getAllDiaHabitos(dataSquare)

    dayHabitsList?.map((dayHabit: any) => {
        if (dayHabits.find((obj: { habitoId: any; }) => obj.habitoId == dayHabit.id)) {
            dayHabit.isDone = true
        } else {
            dayHabit.isDone = false
        }
    })

    const handleClose = () => setIsOpen(false);

    var squareColorClass = 'bg-slate-200 dark:bg-slate-800'

    if (dayHabits.length >= 0 && dayHabits.length < 1) {
        squareColorClass = 'bg-slate-200 dark:bg-slate-800'
    } else if (dayHabits.length >= 1 && dayHabits.length < 2) {
        if (sysThemeColor == "blue") {
            squareColorClass = 'bg-blue-400 dark:bg-blue-800'
        } else if (sysThemeColor == "red") {
            squareColorClass = 'bg-red-400 dark:bg-red-900'
        } else if (sysThemeColor == "pink") {
            squareColorClass = 'bg-pink-300 dark:bg-pink-800'
        } else if (sysThemeColor == "yellow") {
            squareColorClass = 'bg-yellow-100 dark:bg-yellow-800'
        } else if (sysThemeColor == "purple") {
            squareColorClass = 'bg-purple-400 dark:bg-purple-900'
        } else if (sysThemeColor == "green") {
            squareColorClass = 'bg-green-200 dark:bg-green-800'
        } else {
            squareColorClass = 'bg-blue-400 dark:bg-blue-800'
        }
    } else if (dayHabits.length >= 2 && dayHabits.length < 3) {
        if (sysThemeColor == "blue") {
            squareColorClass = 'bg-blue-500 dark:bg-blue-700'
        } else if (sysThemeColor == "red") {
            squareColorClass = 'bg-red-500 dark:bg-red-800'
        } else if (sysThemeColor == "pink") {
            squareColorClass = 'bg-pink-400 dark:bg-pink-700'
        } else if (sysThemeColor == "yellow") {
            squareColorClass = 'bg-yellow-200 dark:bg-yellow-700'
        } else if (sysThemeColor == "purple") {
            squareColorClass = 'bg-purple-500 dark:bg-purple-800'
        } else if (sysThemeColor == "green") {
            squareColorClass = 'bg-green-300 dark:bg-green-700'
        } else {
            squareColorClass = 'bg-blue-500 dark:bg-blue-700'
        }
    } else if (dayHabits.length >= 3 && dayHabits.length < 4) {
        if (sysThemeColor == "blue") {
            squareColorClass = 'bg-blue-600 dark:bg-blue-600'
        } else if (sysThemeColor == "red") {
            squareColorClass = 'bg-red-600 dark:bg-red-700'
        } else if (sysThemeColor == "pink") {
            squareColorClass = 'bg-pink-500 dark:bg-pink-600'
        } else if (sysThemeColor == "yellow") {
            squareColorClass = 'bg-yellow-300 dark:bg-yellow-600'
        } else if (sysThemeColor == "purple") {
            squareColorClass = 'bg-purple-600 dark:bg-purple-700'
        } else if (sysThemeColor == "green") {
            squareColorClass = 'bg-green-400 dark:bg-green-600'
        } else {
            squareColorClass = 'bg-blue-600 dark:bg-blue-600'
        }
    } else if (dayHabits.length >= 4) {
        if (sysThemeColor == "blue") {
            squareColorClass = 'bg-blue-700 dark:bg-blue-500'
        } else if (sysThemeColor == "red") {
            squareColorClass = 'bg-red-700 dark:bg-red-600'
        } else if (sysThemeColor == "pink") {
            squareColorClass = 'bg-pink-600 dark:bg-pink-500'
        } else if (sysThemeColor == "yellow") {
            squareColorClass = 'bg-yellow-400 dark:bg-yellow-500'
        } else if (sysThemeColor == "purple") {
            squareColorClass = 'bg-purple-700 dark:bg-purple-600'
        } else if (sysThemeColor == "green") {
            squareColorClass = 'bg-green-500 dark:bg-green-500'
        } else {
            squareColorClass = 'bg-blue-700 dark:bg-blue-500'
        }
    }

    return (<>
        <div className={`h-12 w-12 px-1 rounded-md ${squareColorClass} ${dayjs(dataSquare).format('YYYYMMDD') == dayjs().format('YYYYMMDD') && 'border-2 border-green-400 border-dashed'}`}
            onClick={() => setIsOpen(!isOpen)}>
        </div>
        <Drawer open={isOpen} onClose={handleClose} position={'bottom'}>
            <Drawer.Items>
                <div>
                    <span className="text-2xl text-zinc-700 dark:text-zinc-400">
                        {dayjs(dataSquare).format('dddd').charAt(0).toUpperCase() + dayjs(dataSquare).format('dddd').slice(1)}, {dayjs(dataSquare).format('DD')} de {dayjs(dataSquare).format('MMMM')}
                    </span>
                </div>
                <div className="mt-3">
                    <Progress
                        className="teste"
                        // style={{ transition: 'all 2s' }}
                        progress={(100 * dayHabits.length) / dayHabitsList.length || 0} size="xl" color={sysThemeColor}
                    />
                </div>
                <div className="mt-8" style={{ maxHeight: '40vh', overflow: 'auto' }}>
                    {dayHabitsList?.map((dayHabit: HabitoWithDayCheck) => {
                        return (
                            <div key={dayHabit.id} className="flex gap-3 mb-2">
                                <HabitDay
                                    habito={dayHabit}
                                    weee={dataSquare}
                                    weee2={() => onUpdate()}
                                />
                            </div>
                        )
                    })}
                </div>
            </Drawer.Items>
        </Drawer>
    </>
    )
}

function HabitDay({ habito, weee, weee2 }: any) {
    const sysThemeColor = getSysThemeColor()
    const [isChecked, setIsChecked] = useState(habito.isDone)

    function handleSetChecked() {
        setIsChecked(!isChecked)
        setDiaHabitoDone(habito.id, weee)
        weee2()
    }

    return <>
        <ToggleSwitch theme={toggleSwitchTheme} checked={isChecked} label={habito.descricao} onChange={() => handleSetChecked()} color={sysThemeColor} />
    </>
}