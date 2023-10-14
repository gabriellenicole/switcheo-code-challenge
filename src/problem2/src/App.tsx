import { ThemeProvider, createTheme } from '@mui/material/styles'
import SwapForm from './components/SwapForm'
import { Box } from '@mui/system'

const theme = createTheme({
    palette: {
        primary: {
            main: '#291E54',
        },
        secondary: {
            main: '#B024F2',
        },
        info: {
            main: '#cecece',
        },
    },
    typography: {
        fontFamily: 'Poppins',
    },
})

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    background:
                        'radial-gradient(40% 50% at 50% 50%, #B024F2 0%, #291E54 100%)',
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
