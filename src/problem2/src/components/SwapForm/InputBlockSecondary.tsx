import { Box, Button, Input, Typography } from '@mui/material'
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined'
import { useTokenSecondaryStore } from '../../store/useTokenSecondaryStore'
import { useTokenListStore } from '../../store/useTokenListStore'
import { useTokenPrimaryStore } from '../../store/useTokenPrimaryStore'
import { getExchangeRateAPI, getTokenPriceAPI } from '../../api/initial'
import { useEffect } from 'react'

interface InputBlockProps {
    tokenName: string
    handleChangeToken: () => void
}

export default function InputBlockSecondary({
    tokenName,
    handleChangeToken,
}: InputBlockProps) {
    // token info state
    const tokenInput = useTokenSecondaryStore((state) => state.tokenInput)
    const tokenInputPrimary = useTokenPrimaryStore((state) => state.tokenInput)
    const tokenPrice = useTokenSecondaryStore((state) => state.tokenPrice)
    const tokenNamePrimary = useTokenPrimaryStore((state) => state.tokenName)
    const tokenNameSecondary = useTokenSecondaryStore(
        (state) => state.tokenName
    )
    const setTokenPrice = useTokenSecondaryStore((state) => state.setTokenPrice)
    const setTokenPricePrimary = useTokenPrimaryStore(
        (state) => state.setTokenPrice
    )
    const setTokenInputPrimary = useTokenPrimaryStore(
        (state) => state.setTokenInput
    )
    const setTokenInputSecondary = useTokenSecondaryStore(
        (state) => state.setTokenInput
    )

    // loading state
    const isLoadingSecondary = useTokenSecondaryStore(
        (state) => state.isLoading
    )
    const setLoadingPrimary = useTokenPrimaryStore(
        (state) => state.setIsLoading
    )

    // focus state
    const focusToken = useTokenListStore((state) => state.focusToken)
    const setFocusToken = useTokenListStore((state) => state.setFocusToken)
    const setExchangeRate = useTokenListStore((state) => state.setExchangeRate)

    const isProcessValid = () => {
        if (tokenNamePrimary == '' || tokenNameSecondary == '') return false
        if (tokenInput === '') return false
        return true
    }

    const getExchangeRate = async () => {
        if (focusToken === 'secondary' && isProcessValid()) {
            try {
                setLoadingPrimary(true)
                const exchangeRateData = await getExchangeRateAPI(
                    tokenNameSecondary,
                    tokenNamePrimary
                )
                setExchangeRate(
                    `1 ${tokenNameSecondary} ~ ${exchangeRateData.toFixed(
                        5
                    )} ${tokenNamePrimary}`
                )
                setTokenInputPrimary(
                    String((Number(tokenInput) * exchangeRateData).toFixed(5))
                )
                const priceUSD = await getTokenPriceAPI(tokenNameSecondary)
                setTokenPricePrimary(
                    Number((Number(tokenInputPrimary) * priceUSD).toFixed(5))
                )
            } catch (err) {
                console.log(err)
            } finally {
                setLoadingPrimary(false)
            }
        }
    }

    const getPrice = async () => {
        try {
            const priceUSD = await getTokenPriceAPI(tokenNameSecondary)
            setTokenPrice(Number((Number(tokenInput) * priceUSD).toFixed(5)))
        } catch (err) {
            console.log(err)
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTokenInputSecondary(event.target.value)
        setFocusToken('secondary')
    }

    useEffect(() => {
        getExchangeRate()
    }, [tokenNamePrimary, tokenNameSecondary, tokenInput, focusToken])

    useEffect(() => {
        getPrice()
    }, [tokenInput, tokenNameSecondary])

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
                opacity: isLoadingSecondary ? '0.8' : '',
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
                    value={tokenInput}
                    onChange={handleChange}
                ></Input>
                <Typography variant='body2' color='primary'>
                    ${tokenPrice}
                </Typography>
            </Box>
        </Box>
    )
}
