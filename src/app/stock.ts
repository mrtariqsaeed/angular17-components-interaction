import { Stock } from './models/stock.model'

export const getStock = (): Stock[] => {
    return [
        {
            id: 1,
            qty: 10,
        },
        {
            id: 2,
            qty: 3,
        }
    ]
}