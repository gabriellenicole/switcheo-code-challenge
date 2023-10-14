import { Box, Typography, Button, Tooltip } from '@mui/material'
import InputBlock from './InputBlock'
import { FiberManualRecord, Refresh } from '@mui/icons-material'

export default function SwapForm() {
    return (
        <Box
            sx={{
                padding: 4,
                borderRadius: 3,
                background:
                    'linear-gradient(145deg, rgba(245, 245, 245, 0.40) 4%, rgba(245, 245, 245, 0.00) 120%)',
                boxShadow: '0px 4px 24px -1px rgba(0, 0, 0, 0.20)',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingBottom: 2,
                }}
            >
                <Typography
                    sx={{ marginBottom: 1, color: 'white', fontWeight: 500 }}
                    variant='h6'
                >
                    Swap Token
                </Typography>
                <Tooltip title='Get latest price data!' placement='top-end'>
                    <Button
                        variant='text'
                        sx={{
                            display: 'flex',
                            gap: 1,
                            paddingY: 0.5,
                            paddingX: 1,
                            borderRadius: 3,
                            '&:hover': {
                                background: 'rgba(255, 255, 255, 0.1)',
                            },
                            textTransform: 'capitalize',
                        }}
                        color='info'
                    >
                        <Refresh />
                        <Typography variant='body2'>Refresh</Typography>
                    </Button>
                </Tooltip>
            </Box>
            <InputBlock convertUSD={2355.92} />
            <Box sx={{ position: 'relative' }}>
                <FiberManualRecord
                    htmlColor='white'
                    fontSize='small'
                    sx={{ position: 'absolute', left: 6, top: 23 }}
                />
                <Typography
                    variant='body2'
                    fontWeight={500}
                    color={'white'}
                    sx={{
                        borderLeft: '1px solid',
                        paddingY: 3,
                        marginLeft: 2,
                        paddingLeft: 3,
                    }}
                >
                    Current Rate: 1 ETH ~ 495050.2 BIT
                </Typography>
            </Box>

            <InputBlock convertUSD={2345.45} />
        </Box>
    )
}
