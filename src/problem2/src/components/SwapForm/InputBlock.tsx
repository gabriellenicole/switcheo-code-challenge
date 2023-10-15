import { Box, Button, Input, Typography } from '@mui/material'
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined'
import { useTokenPrimaryStore } from '../../store/useTokenPrimaryStore'
import { useTokenSecondaryStore } from '../../store/useTokenSecondaryStore'

interface InputBlockProps {
    type: 'primary' | 'secondary'
    tokenName: string
    convertUSD: number
    handleChangeToken: () => void
}

export default function InputBlock({
    type,
    tokenName,
    convertUSD,
    handleChangeToken,
}: InputBlockProps) {
    const tokenInputPrimary = useTokenPrimaryStore((state) => state.tokenInput)
    const tokenInputSecondary = useTokenSecondaryStore(
        (state) => state.tokenInput
    )
    const setTokenInputPrimary = useTokenPrimaryStore(
        (state) => state.setTokenInput
    )
    const setTokenInputSecondary = useTokenSecondaryStore(
        (state) => state.setTokenInput
    )
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
                        textTransform: 'none',
                    }}
                    color='info'
                    onClick={handleChangeToken}
                >
                    {tokenName !== '' && (
                        <>
                            <img
                                width={25}
                                height={25}
                                src={`src/assets/token-icons/${tokenName}.svg`}
                                alt='icon'
                            />
                            <Typography
                                fontWeight={500}
                                color='primary'
                                marginLeft={0.5}
                                sx={{
                                    fontSize: { xs: '14px', sm: '20px' },
                                }}
                            >
                                {tokenName}
                            </Typography>
                            <ExpandMoreOutlinedIcon htmlColor='#2b2b2b' />
                        </>
                    )}
                    {tokenName === '' && (
                        <>
                            <Typography
                                fontWeight={500}
                                color='primary'
                                sx={{
                                    fontSize: { xs: '14px', sm: '20px' },
                                }}
                            >
                                Select Token
                            </Typography>
                            <ExpandMoreOutlinedIcon color='primary' />
                        </>
                    )}
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
                        fontSize: { xs: '20px', sm: '32px' },
                        fontWeight: '500',

                        '& input': {
                            textAlign: 'right',
                        },
                        '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button':
                            {
                                display: 'none',
                            },
                    }}
                    placeholder='0'
                    value={
                        type === 'primary'
                            ? tokenInputPrimary
                            : tokenInputSecondary
                    }
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        type === 'primary'
                            ? setTokenInputPrimary(Number(event.target.value))
                            : setTokenInputSecondary(Number(event.target.value))
                    }}
                ></Input>
                <Typography variant='body2' color='primary'>
                    ${convertUSD.toLocaleString()}
                </Typography>
            </Box>
        </Box>
    )
}
