import { Item } from "../types/Item"
import { api } from "./api"


async function getItens() {
    const res = await api.get('grid')
    return res
}

async function novoItem(item: Item) {
    const res = await api.post('item', item)
    return res
}

async function removeItem(id: any) {
    const res = await api.delete('item', { data: { id: id } })
    console.log('removeItem: ' + id)
    return res
}

export {
    getItens,
    novoItem,
    removeItem
}