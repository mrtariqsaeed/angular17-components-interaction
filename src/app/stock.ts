export const getStock = (id: number) => {
    return [
        {
            id: 1,
            qty: 10,
        },
        {
            id: 2,
            qty: 3,
        }
    ].find(s => s.id === id)
}