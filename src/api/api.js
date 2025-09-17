const BASE_URL = "https://api.coingecko.com/api/v3"

export const fetchCoinData = async ()=> {
    const response = await fetch(`${BASE_URL}/coins/markets?vs_currency=usd&sparkline=true`)
    const data = await response.json()
    console.log(data)
    return data
}
