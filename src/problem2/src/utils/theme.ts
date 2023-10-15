import { createTheme } from '@mui/material/styles'

const theme = createTheme({
    palette: {
        primary: {
            main: '#291E54',
        },
        secondary: {
            main: '#B024F2',
        },
        info: {
            main: '#ffffff',
        },
    },
    typography: {
        fontFamily: 'Poppins',
    },
})

export { theme }
