const isProcessValid = (
    tokenNamePrimary: string,
    tokenNameSecondary: string,
    tokenInput: string
) => {
    if (tokenNamePrimary == '' || tokenNameSecondary == '') return false
    if (tokenInput === '') return false
    return true
}

const checkInvalidForm = (
    tokenInputPrimary: string,
    tokenInputSecondary: string,
    tokenNamePrimary: string,
    tokenNameSecondary: string
): string => {
    if (tokenNamePrimary === '') {
        return 'Please select PAID token currency'
    } else if (tokenNameSecondary === '') {
        return 'Please select RECEIVED token currency'
    } else if (tokenInputPrimary === '' || tokenInputSecondary === '') {
        return 'Please fill the amount to swap'
    }
    return ''
}

export { isProcessValid, checkInvalidForm }
