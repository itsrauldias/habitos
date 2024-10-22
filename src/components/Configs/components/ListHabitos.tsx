import { useState } from "react";
import { Badge, Button, TextInput, ToggleSwitch, Label } from "flowbite-react";
import toast from "react-hot-toast";
import { PiPlus } from "react-icons/pi";
import dayjs from "dayjs";
import { getAllHabitos, createHabito, deleteHabito, changeWeekdaysArray, toggleHabitoAtivo, editHabito } from '../../../services/habitosService';
import { getDayhabitsByHabitId } from "../../../services/diaHabitoService";
import { Habito } from "../../../types/Habito";
import FbrModal from "../../FbrModal";
import { badgeTheme, toggleSwitchTheme } from "../../../styles/flowbiteThemes";
import { getSysThemeColor } from "../../../services/sysThemeColorService";

type HabitItemProps = {
    habito: Habito,
    onDone: () => void
}

export default function ListHabitos() {

    const sysThemeColor = getSysThemeColor()

    const [habitosList, setHabitosList] = useState<Habito[]>(getAllHabitos())

    const [habitoInput, setHabitoInput] = useState<string>('')

    async function handleCreateHabito() {
        if (habitoInput == '') {
            toast.error('Digite algo que deve ser um hábito!!', { position: 'bottom-right' });
            return
        }

        try {
            createHabito(habitoInput)
            setHabitosList(getAllHabitos())
            setHabitoInput('')
            toast.success('Novo hábito criado com sucesso!', { position: 'bottom-right' })
        } catch (error) {
            toast.error('Falha. Verificar o console.', { position: 'bottom-right' });
            console.log(error)
        }
    }

    return (<>
        <span className={`text-2xl font-bold tracking-tight text-${sysThemeColor}-500`}>Meus hábitos</span>
        <div className="flex gap-1">
            <TextInput
                type="text"
                placeholder="Crie um novo hábito!"
                value={habitoInput}
                onChange={(e: any) => setHabitoInput(e.target.value)}
            />
            <Button
                color={sysThemeColor}
                className="items-center justify-center"
                onClick={handleCreateHabito}
            >
                <PiPlus className="" />
            </Button>
        </div>
        {habitosList?.map((habito) => {
            return <HabitItem key={habito.id} habito={habito} onDone={() => setHabitosList(getAllHabitos())} />
        })}
    </>)
}

function HabitItem({ habito, onDone }: HabitItemProps) {

    const sysThemeColor = getSysThemeColor()

    const [inputValue, setInputValue] = useState(habito.descricao)
    const [inputValue2, setInputValue2] = useState(dayjs(habito.createdAt).format('YYYY-MM-DD'))

    const dayHabitsCounter = getDayhabitsByHabitId(habito.id)

    async function handleDeleteHabito(id: string) {
        if (confirm('Tem certeza que deseja remover esse hábito?') == true) {
            try {
                deleteHabito(id)
                onDone()
                toast.success('Hábito removido!', { position: 'bottom-right' });
            } catch (error) {
                toast.error('Falha. Verificar o console.', { position: 'bottom-right' });
                console.log(error)
            }
        }
    }

    function handleChangeWeekdaysArray(habitId: string, weekDay: number) {
        changeWeekdaysArray(habitId, weekDay)
        onDone()
    }

    function onClose() {
        editHabito(habito.id, inputValue, inputValue2)
        toast.success('Hábito atualizado!', { position: 'bottom-right' })
        onDone()
    }

    async function handleSetHabitoAtivo(id: string) {
        try {
            toggleHabitoAtivo(id)
            onDone()
        } catch (error) {
            toast.error('Falha. Verificar o console.', { position: 'bottom-right' });
            console.log(error)
        }
    }

    return (
        <div className="border border-slate-300 dark:border-slate-700 rounded-lg p-2" style={{ wordBreak: 'break-word' }}>

            <ToggleSwitch theme={toggleSwitchTheme} checked={habito.status} label={habito.descricao} onChange={() => handleSetHabitoAtivo(habito.id)} color={sysThemeColor} />

            <div className="flex gap-1 mt-2">
                <Badge
                    size='sm'
                    theme={badgeTheme}
                    color={`${habito.weekdaysSelected?.includes(1) ? sysThemeColor : 'gray'}`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleChangeWeekdaysArray(habito.id, 1)}
                >D</Badge>
                <Badge
                    size='sm'
                    theme={badgeTheme}
                    color={`${habito.weekdaysSelected?.includes(2) ? sysThemeColor : 'gray'}`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleChangeWeekdaysArray(habito.id, 2)}
                >S</Badge>
                <Badge
                    size='sm'
                    theme={badgeTheme}
                    color={`${habito.weekdaysSelected?.includes(3) ? sysThemeColor : 'gray'}`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleChangeWeekdaysArray(habito.id, 3)}
                >T</Badge>
                <Badge
                    size='sm'
                    theme={badgeTheme}
                    color={`${habito.weekdaysSelected?.includes(4) ? sysThemeColor : 'gray'}`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleChangeWeekdaysArray(habito.id, 4)}
                >Q</Badge>
                <Badge
                    size='sm'
                    theme={badgeTheme}
                    color={`${habito.weekdaysSelected?.includes(5) ? sysThemeColor : 'gray'}`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleChangeWeekdaysArray(habito.id, 5)}
                >Q</Badge>
                <Badge
                    size='sm'
                    theme={badgeTheme}
                    color={`${habito.weekdaysSelected?.includes(6) ? sysThemeColor : 'gray'}`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleChangeWeekdaysArray(habito.id, 6)}
                >S</Badge>
                <Badge
                    size='sm'
                    theme={badgeTheme}
                    color={`${habito.weekdaysSelected?.includes(7) ? sysThemeColor : 'gray'}`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleChangeWeekdaysArray(habito.id, 7)}
                >S</Badge>
            </div>

            <div className="mt-2">
                <div className="flex justify-between items-end">
                    <div className="p-0">
                        <FbrModal
                            trigger='span'
                            triggerTitle='Editar'
                            modalSize="sm"
                            onCloseFunction={() => onClose()}
                            content={<>
                                <Label value="Descrição:" />
                                <TextInput
                                    type="text"
                                    placeholder="Crie um novo hábito!"
                                    className="mb-3"
                                    value={inputValue}
                                    onChange={(e: any) => setInputValue(e.target.value)}
                                />
                                <Label value="Iniciado em:" />
                                <input
                                    type="date"
                                    className="mb-3 block w-full border disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 bg-gray-50 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
                                    value={inputValue2}
                                    onChange={(e: any) => setInputValue2(e.target.value)}
                                />
                            </>}
                        />
                        {dayHabitsCounter.length == 0 && <>
                            &nbsp;|&nbsp;
                            <span onClick={() => handleDeleteHabito(habito.id)} style={{ cursor: 'pointer' }}>Excluir</span>
                        </>}
                    </div>
                    <span className="text-xs">Iniciado em: <br /> <b>{dayjs(habito.createdAt).format('DD/MM/YYYY')}</b></span>
                </div>
            </div>
        </div>
    )
}