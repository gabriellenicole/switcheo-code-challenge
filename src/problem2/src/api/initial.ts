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

export { getInitialTokenList }
