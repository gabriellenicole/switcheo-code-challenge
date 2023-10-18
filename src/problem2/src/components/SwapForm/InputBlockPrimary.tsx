import { Box, Button, Input, Skeleton, Typography } from '@mui/material'
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined'
import { useTokenPrimaryStore } from '../../store/useTokenPrimaryStore'
import { useTokenListStore } from '../../store/useTokenListStore'
import { useTokenSecondaryStore } from '../../store/useTokenSecondaryStore'
import { getExchangeRateAPI, getTokenPriceAPI } from '../../api'
import { isProcessValid } from './function'
import { useCallback, useEffect, useState } from 'react'
import debounce from 'lodash.debounce'
import { formatDecimal } from '../../utils/formatter'

interface InputBlockProps {
    tokenName: string
    handleChangeToken: () => void
}

export default function InputBlockPrimary({ tokenName, handleChangeToken }: InputBlockProps) {
    // primary state
    const tokenInput = useTokenPrimaryStore((state) => state.tokenInput)
    const tokenPrice = useTokenPrimaryStore((state) => state.tokenPrice)
    const tokenNamePrimary = useTokenPrimaryStore((state) => state.tokenName)
    const isLoading = useTokenPrimaryStore((state) => state.isLoading)
    const setTokenPrice = useTokenPrimaryStore((state) => state.setTokenPrice)
    const setTokenInput = useTokenPrimaryStore((state) => state.setTokenInput)

    // secondary state
    const tokenInputSecondary = useTokenSecondaryStore((state) => state.tokenInput)
    const tokenNameSecondary = useTokenSecondaryStore((state) => state.tokenName)
    const setTokenPriceSecondary = useTokenSecondaryStore((state) => state.setTokenPrice)
    const setTokenInputSecondary = useTokenSecondaryStore((state) => state.setTokenInput)
    const setLoadingSecondary = useTokenSecondaryStore((state) => state.setIsLoading)

    // general state
    const focusToken = useTokenListStore((state) => state.focusToken)
    const setFocusToken = useTokenListStore((state) => state.setFocusToken)
    const setExchangeRate = useTokenListStore((state) => state.setExchangeRate)

    const [priceLoading, setPriceLoading] = useState(false)

    const getExchangeRate = async (input: string) => {
        if (
            focusToken === 'primary' &&
            isProcessValid(tokenNamePrimary, tokenNameSecondary, input)
        ) {
            try {
                setLoadingSecondary(true)
                const exchangeRateData = await getExchangeRateAPI(
                    tokenNamePrimary,
                    tokenNameSecondary
                )
                setExchangeRate(
                    `1 ${tokenNamePrimary} ~ ${formatDecimal(
                        exchangeRateData
                    )} ${tokenNameSecondary}`
                )
                setTokenInputSecondary(formatDecimal(Number(input) * exchangeRateData, 5))
                const priceUSD = await getTokenPriceAPI(tokenNameSecondary)
                setTokenPriceSecondary(
                    Number(formatDecimal(Number(tokenInputSecondary) * priceUSD))
                )
            } catch (err) {
                console.log(err)
            } finally {
                setLoadingSecondary(false)
            }
        }
    }

    const getPrice = async (input: number) => {
        try {
            setPriceLoading(true)
            const priceUSD = await getTokenPriceAPI(tokenName)
            setTokenPrice(Number(formatDecimal(input * priceUSD)))
        } catch (err) {
            console.log(err)
        } finally {
            setPriceLoading(false)
        }
    }

    const debouncedGetExchange = debounce(async (input: string) => {
        await getExchangeRate(input)
    }, 500)
    const callbackGetExchange = useCallback(
        (input: string) => debouncedGetExchange(input),
        [tokenNamePrimary, tokenNameSecondary, focusToken]
    )

    const debouncedGetPrice = debounce(async (input: number) => {
        await getPrice(input)
    }, 500)
    const callbackGetPrice = useCallback(
        (input: number) => debouncedGetPrice(input),
        [tokenNamePrimary]
    )

    useEffect(() => {
        callbackGetExchange(tokenInput)
    }, [tokenNamePrimary, tokenNameSecondary, tokenInput, focusToken])

    useEffect(() => {
        if (tokenInput.length !== 0 && tokenNamePrimary !== '') callbackGetPrice(Number(tokenInput))
    }, [tokenInput, tokenNamePrimary])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTokenInput(event.target.value)
        setFocusToken('primary')
    }

    return (
        <Box
            sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                height: 110,
                paddingX: 3,
                paddingY: 2,
                borderRadius: 2,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                opacity: isLoading ? '0.8' : '',
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
                    disabled={isLoading}
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
                {isLoading ? (
                    <>
                        <Skeleton variant='rounded' animation='wave' width={200} height={50} />
                        <Skeleton animation='wave' width={80} />
                    </>
                ) : (
                    <>
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
                        />
                        {priceLoading ? (
                            <Box sx={{ width: 80 }}>
                                <Skeleton animation='wave' />
                            </Box>
                        ) : (
                            <>
                                <Typography variant='body2' color='primary'>
                                    ${tokenPrice}
                                </Typography>
                            </>
                        )}
                    </>
                )}
            </Box>
        </Box>
    )
}
