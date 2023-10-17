import { ThemeProvider } from '@mui/material/styles'
import { Box } from '@mui/system'
import SwapForm from './components/SwapForm'
import { theme } from './utils/theme'
import { useEffect, useState } from 'react'
import { getInitialTokenList } from './api'
import { useTokenListStore } from './store/useTokenListStore'
import { useTokenPrimaryStore } from './store/useTokenPrimaryStore'
import { useTokenSecondaryStore } from './store/useTokenSecondaryStore'
import { checkInvalidForm } from './components/SwapForm/function'
import { Alert, AlertTitle } from '@mui/material'
import Summary from './components/Summary.tsx'

function App() {
    const setTokenList = useTokenListStore((state) => state.setTokenList)
    const tokenNamePrimary = useTokenPrimaryStore((state) => state.tokenName)
    const tokenNameSecondary = useTokenSecondaryStore(
        (state) => state.tokenName
    )
    const tokenInputPrimary = useTokenPrimaryStore((state) => state.tokenInput)
    const tokenInputSecondary = useTokenSecondaryStore(
        (state) => state.tokenInput
    )

    const getTokenData = async () => {
        try {
            const tokenData = await getInitialTokenList()
            setTokenList(tokenData)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getTokenData()
    }, [])

    const [isError, setIsError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [isShowSummary, setIsShowSummary] = useState(false)

    const handleSubmitForm = (): void => {
        const message = checkInvalidForm(
            tokenInputPrimary,
            tokenInputSecondary,
            tokenNamePrimary,
            tokenNameSecondary
        )
        if (message !== '') {
            setIsError(true)
            setErrorMessage(message)
            setTimeout(() => setIsError(false), 4000)
        } else {
            setIsShowSummary(true)
        }
    }

    const handleBackHome = () => {
        setIsShowSummary(false)
    }

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    background:
                        'radial-gradient(50% 50% at 50% 50%, #B024F2 0%, #5C2190 50%, #291E54 100%)',
                    width: '100vw',
                    height: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {isError && (
                    <Alert
                        severity='error'
                        sx={{
                            position: 'absolute',
                            top: 100,
                        }}
                    >
                        <AlertTitle>
                            <strong>Oops!</strong>
                        </AlertTitle>
                        {errorMessage}
                    </Alert>
                )}
                {!isShowSummary && <SwapForm submitForm={handleSubmitForm} />}
                {isShowSummary && <Summary backToHome={handleBackHome} />}
            </Box>
        </ThemeProvider>
    )
}

export default App
