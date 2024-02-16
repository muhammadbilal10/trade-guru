
export const getprice = async (symbol) => {
    const response = await fetch(`http://127.0.0.1:8000/current_price/${symbol}`);
    const data = await response.json();
    return data;
};

export const getchange = async (symbol) => {
    const response = await fetch(`http://127.0.0.1:8000/current_price_change/${symbol}`);
    const data = await response.json();
    return data
};
export function getSectorBySymbol(symbol) {
    const obj = symbols.find(item => item.symbol === symbol);
    if (obj) {
        return obj.sectorName;
    } else {
        return null;
    }
};
export function Is_symbol_exist(symbol) {
    return symbols.some(item => item.symbol === symbol);
}
