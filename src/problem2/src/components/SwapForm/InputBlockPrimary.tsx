import { Box, Button, Input, Skeleton, Typography } from '@mui/material'
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined'
import { useTokenPrimaryStore } from '../../store/useTokenPrimaryStore'
import { useTokenListStore } from '../../store/useTokenListStore'
import { useTokenSecondaryStore } from '../../store/useTokenSecondaryStore'
import { getExchangeRateAPI, getTokenPriceAPI } from '../../api/initial'
import { useCallback, useEffect, useState } from 'react'
import debounce from 'lodash.debounce'

interface InputBlockProps {
    tokenName: string
    handleChangeToken: () => void
}

interface GetExchangeRateProps {
    tokenNamePrimary: string
    tokenNameSecondary: string
    tokenInput: string
    focusToken: 'primary' | 'secondary'
}

export default function InputBlockPrimary({
    tokenName,
    handleChangeToken,
}: InputBlockProps) {
    // token info state
    const tokenInput = useTokenPrimaryStore((state) => state.tokenInput)
    const tokenInputSecondary = useTokenSecondaryStore(
        (state) => state.tokenInput
    )
    const tokenPrice = useTokenPrimaryStore((state) => state.tokenPrice)
    const tokenNamePrimary = useTokenPrimaryStore((state) => state.tokenName)
    const tokenNameSecondary = useTokenSecondaryStore(
        (state) => state.tokenName
    )
    const setTokenPrice = useTokenPrimaryStore((state) => state.setTokenPrice)
    const setTokenPriceSecondary = useTokenSecondaryStore(
        (state) => state.setTokenPrice
    )
    const setTokenInputPrimary = useTokenPrimaryStore(
        (state) => state.setTokenInput
    )
    const setTokenInputSecondary = useTokenSecondaryStore(
        (state) => state.setTokenInput
    )

    // loading state
    const isLoadingPrimary = useTokenPrimaryStore((state) => state.isLoading)
    const setLoadingSecondary = useTokenSecondaryStore(
        (state) => state.setIsLoading
    )
    const [priceLoading, setPriceLoading] = useState(false)

    // focus state
    const focusToken = useTokenListStore((state) => state.focusToken)
    const setFocusToken = useTokenListStore((state) => state.setFocusToken)
    const setExchangeRate = useTokenListStore((state) => state.setExchangeRate)

    const isProcessValid = () => {
        if (tokenNamePrimary == '' || tokenNameSecondary == '') return false
        if (tokenInput === '') return false
        return true
    }

    const getExchangeRate = async ({
        tokenNamePrimary,
        tokenNameSecondary,
        tokenInput,
        focusToken,
    }: GetExchangeRateProps) => {
        console.log(
            tokenNamePrimary,
            tokenNameSecondary,
            tokenInput,
            focusToken
        )
        console.log(isProcessValid())
        if (focusToken === 'primary' && isProcessValid()) {
            try {
                setLoadingSecondary(true)
                const exchangeRateData = await getExchangeRateAPI(
                    tokenNamePrimary,
                    tokenNameSecondary
                )
                setExchangeRate(
                    `1 ${tokenNamePrimary} ~ ${exchangeRateData.toFixed(
                        5
                    )} ${tokenNameSecondary}`
                )
                setTokenInputSecondary(
                    (Number(tokenInput) * exchangeRateData).toFixed(5)
                )
                const priceUSD = await getTokenPriceAPI(tokenNamePrimary)
                setTokenPriceSecondary(
                    Number((Number(tokenInputSecondary) * priceUSD).toFixed(5))
                )
            } catch (err) {
                console.log(err)
            } finally {
                setLoadingSecondary(false)
            }
        }
    }

    const debouncedGetPrice = debounce(
        async (input: number, tokenName: string) => {
            setPriceLoading(true)
            const priceUSD = await getTokenPriceAPI(tokenName)
            setTokenPrice(Number((input * priceUSD).toFixed(5)))
            setPriceLoading(false)
        },
        500
    )
    const callbackGetPrice = useCallback(
        (input: number, tokenName: string) =>
            debouncedGetPrice(input, tokenName),
        []
    )

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTokenInputPrimary(event.target.value)
        setFocusToken('primary')
    }

    useEffect(() => {
        getExchangeRate({
            tokenNamePrimary,
            tokenNameSecondary,
            tokenInput,
            focusToken,
        })
    }, [tokenNamePrimary, tokenNameSecondary, tokenInput, focusToken])

    useEffect(() => {
        if (tokenInput.length !== 0 && tokenNamePrimary !== '')
            callbackGetPrice(Number(tokenInput), tokenNamePrimary)
    }, [tokenInput, tokenNamePrimary])

    return (
        <Box
            sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                width: '100%',
                height: 110,
                paddingX: 3,
                paddingY: 2,
                borderRadius: 2,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                opacity: isLoadingPrimary ? '0.8' : '',
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
                {priceLoading ? (
                    <Box sx={{ width: 80 }}>
                        <Skeleton animation='wave' />
                    </Box>
                ) : (
                    <>
                        {tokenPrice ? (
                            <Typography variant='body2' color='primary'>
                                ${tokenPrice}
                            </Typography>
                        ) : (
                            ''
                        )}
                    </>
                )}
            </Box>
        </Box>
    )
}
