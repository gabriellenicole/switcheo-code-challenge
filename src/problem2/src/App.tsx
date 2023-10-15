import { ThemeProvider } from '@mui/material/styles'
import { Box } from '@mui/system'
import SwapForm from './components/SwapForm'
import { theme } from './utils/theme'
import { useEffect } from 'react'
import { getInitialTokenList } from './api/initial'
import { useTokenListStore } from './store/useTokenListStore'

function App() {
    const setTokenList = useTokenListStore((state) => state.setTokenList)
    const getTokenData = async () => {
        try {
            const tokenData = await getInitialTokenList()
            setTokenList(tokenData)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        // fetch list of token name on first load
        getTokenData()
    }, [])

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
                <SwapForm />
            </Box>
        </ThemeProvider>
    )
}

export default App
