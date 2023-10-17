import axios from 'axios'

const getInitialTokenList = async (): Promise<string[]> => {
    const response = await axios.get(
        'https://interview.switcheo.com/prices.json'
    )
    const tokenList = response.data
    const tokenName = new Set<string>()
    for (const token of tokenList) {
        tokenName.add(token.currency)
    }
    return Array.from(tokenName)
}

async function delay(milliseconds: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, milliseconds)
    })
}

const getTokenPriceAPI = async (tokenName: string): Promise<number> => {
    const response = await axios.get(
        'https://interview.switcheo.com/prices.json'
    )
    await delay(1000) // mock delay for simulating backend
    const tokenList = response.data
    for (const token of tokenList) {
        if (token.currency == tokenName) {
            return token.price
        }
    }
    return 0
}

const getExchangeRateAPI = async (
    tokenNameFocus: string,
    tokenNameFollow: string
): Promise<number> => {
    const response = await axios.get(
        'https://interview.switcheo.com/prices.json'
    )
    await delay(2000) // mock delay for simulating backend
    const tokenList = response.data

    let tokenPriceFocus = 0
    let tokenPriceFollow = 0

    for (const token of tokenList) {
        if (token.currency === tokenNameFocus) {
            tokenPriceFocus = token.price
        }
        if (token.currency === tokenNameFollow) {
            tokenPriceFollow = token.price
        }
    }
    return tokenPriceFocus / tokenPriceFollow
}

export { getInitialTokenList, getTokenPriceAPI, getExchangeRateAPI }
