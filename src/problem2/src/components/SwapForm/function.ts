const isProcessValid = (
    tokenNamePrimary: string,
    tokenNameSecondary: string,
    tokenInput: string
) => {
    if (tokenNamePrimary == '' || tokenNameSecondary == '') return false
    if (tokenInput === '') return false
    return true
}

export { isProcessValid }
