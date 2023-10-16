import axios from 'axios'

const getInitialTokenList = async () => {
    const response = await axios.get(
        'https://interview.switcheo.com/prices.json'
    )
    const tokenList = response.data
    const tokenName = []
    for (const token of tokenList) {
        if (token.currency == tokenName[tokenName.length - 1]) continue
        tokenName.push(token.currency)
    }
    return tokenName
}

async function delay(milliseconds: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, milliseconds)
    })
}

const getTokenPriceAPI = async (tokenName: string) => {
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
    return tokenPriceFollow / tokenPriceFocus
}

export { getInitialTokenList, getTokenPriceAPI, getExchangeRateAPI }
