const formatDecimal = (input: number | string, dp = 10): string => {
    input = Number(input)
    if (input % 1 !== 0) {
        return input.toFixed(dp)
    } else {
        return String(input)
    }
}

export { formatDecimal }
