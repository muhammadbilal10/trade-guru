
export const getprice = async (symbol) => {
    const response = await fetch(`http://127.0.0.1:8000/current_price/${symbol}`);
    const data = await response.json();
    return data;
};

export const getcandlestick_data = async (symbol) => {
    const response = await fetch(`http://127.0.0.1:8000/candlestick_data/${symbol}`);
    const data = await response.json();
    return data;
};

export const getchange = async (symbol) => {
    const response = await fetch(`http://127.0.0.1:8000/current_price_change/${symbol}`);
    const data = await response.json();
    return data
};
export function getSectorBySymbol(SymbolsList,symbol) {
    const obj = SymbolsList.find(item => item.symbol === symbol);
    if (obj) {
        return obj.sectorName;
    } else {
        return null;
    }
};
export function getSymbolName(SymbolsList,symbol) {
    const obj = SymbolsList.find(item => item.symbol === symbol);
    if (obj) {
        return obj.name;
    } else {
        return null;
    }
};
export function Is_symbol_exist(SymbolsList,symbol) {
    return SymbolsList.some(item => item.symbol === symbol);
}

export async function fetchStocks(symbol, startDate, endDate) {
    const response = await fetch(`http://127.0.0.1:8000/stocks/${symbol}`);
    const data = await response.json();
    return data

}
