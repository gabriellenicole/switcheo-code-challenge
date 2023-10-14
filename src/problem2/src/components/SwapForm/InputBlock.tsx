import { Box, Button, Input, Typography } from '@mui/material'
import alphaIcon from '../../assets/token-icons/AAVE.svg'
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined'

interface InputBlockProps {
    convertUSD: number
}

export default function InputBlock({ convertUSD }: InputBlockProps) {
    return (
        <Box
            sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                width: '100%',
                paddingX: 3,
                paddingY: 2,
                borderRadius: 2,
                display: 'flex',
                justifyContent: 'space-between',
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Button
                    variant='text'
                    sx={{
                        display: 'flex',
                        gap: 1,
                        paddingY: 0.5,
                        paddingX: 1,
                        borderRadius: 2,
                        '&:hover': {
                            background: 'rgba(255, 255, 255, 0.2)',
                        },
                    }}
                    color='info'
                >
                    <img src={alphaIcon} alt='icon' />
                    <Typography
                        variant='h6'
                        fontWeight={500}
                        color='primary'
                        marginLeft={0.5}
                    >
                        ALP
                    </Typography>
                    <ExpandMoreOutlinedIcon htmlColor='#2b2b2b' />
                </Button>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                }}
            >
                <Input
                    type='number'
                    disableUnderline={true}
                    sx={{
                        fontSize: '32px',
                        fontWeight: '500',
                        width: '60%',
                        '& input': {
                            textAlign: 'right',
                        },
                        '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button':
                            {
                                display: 'none',
                            },
                    }}
                    placeholder='0'
                ></Input>
                <Typography variant='body2' color='primary'>
                    ${convertUSD.toLocaleString()}
                </Typography>
            </Box>
        </Box>
    )
}
