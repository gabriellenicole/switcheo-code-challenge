import { Box, Typography, Button, Tooltip, Modal } from '@mui/material'
import InputBlock from './InputBlock'
import { FiberManualRecord, Refresh, SyncAlt } from '@mui/icons-material'
import { useState } from 'react'
import SearchToken from '../SearchToken'
import { useTokenListStore } from '../../store/useTokenListStore'
import { useTokenPrimaryStore } from '../../store/useTokenPrimaryStore'
import { useTokenSecondaryStore } from '../../store/useTokenSecondaryStore'

export default function SwapForm() {
    const setSelectedToken = useTokenListStore(
        (state) => state.setSelectedToken
    )
    const allInfoPrimary = useTokenPrimaryStore((state) => state)
    const allInfoSecondary = useTokenSecondaryStore((state) => state)
    const updateAllPrimary = useTokenPrimaryStore((state) => state.updateAll)
    const updateAllSecondary = useTokenSecondaryStore(
        (state) => state.updateAll
    )
    const tokenNamePrimary = useTokenPrimaryStore((state) => state.tokenName)
    const tokenNameSecondary = useTokenSecondaryStore(
        (state) => state.tokenName
    )
    // const tokenInputPrimary = useTokenPrimaryStore((state) => state.tokenInput)
    // const tokenInputSecondary = useTokenSecondaryStore(
    //     (state) => state.tokenInput
    // )
    const [reverse, setReverse] = useState(false)
    const [isOpenModal, setIsOpenModal] = useState(false)

    const handleReverse = () => {
        setReverse(!reverse)
        const tempPrimary = allInfoPrimary
        updateAllPrimary({
            tokenName: allInfoSecondary.tokenName,
            tokenPrice: allInfoSecondary.tokenPrice,
            tokenInput: allInfoSecondary.tokenInput,
        })
        updateAllSecondary({
            tokenName: tempPrimary.tokenName,
            tokenPrice: tempPrimary.tokenPrice,
            tokenInput: tempPrimary.tokenInput,
        })
    }

    // TO DELETE
    // useEffect(() => {
    //     console.log('primary', tokenInputPrimary)
    //     console.log('secondary', tokenInputSecondary)
    // }, [tokenInputPrimary, tokenInputSecondary])

    return (
        <Box
            sx={{
                padding: 4,
                borderRadius: 3,
                background: {
                    xs: '',
                    sm: 'linear-gradient(145deg, rgba(245, 245, 245, 0.40) 4%, rgba(245, 245, 245, 0.00) 120%)',
                },
                boxShadow: {
                    xs: '',
                    sm: '0px 4px 24px -1px rgba(0, 0, 0, 0.20)',
                },
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Modal open={isOpenModal} onClose={() => setIsOpenModal(false)}>
                <SearchToken handleCloseModal={() => setIsOpenModal(false)} />
            </Modal>
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
                <Tooltip title='Get latest price data' placement='right'>
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
            <InputBlock
                type='primary'
                tokenName={tokenNamePrimary}
                convertUSD={2355.92}
                handleChangeToken={() => {
                    setSelectedToken('primary')
                    setIsOpenModal(true)
                }}
            />
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
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
                        1 ETH ~ 495050.2 BIT
                    </Typography>
                </Box>
                <Tooltip
                    title={'Swap "paid" and "received" token'}
                    placement='right'
                >
                    <SyncAlt
                        color='info'
                        sx={{
                            marginRight: 2,
                            rotate: '90deg',
                            transition: 'all .2s ease-in-out',
                            transform: reverse ? 'rotate(180deg)' : '',
                        }}
                        onClick={handleReverse}
                    />
                </Tooltip>
            </Box>
            <InputBlock
                type='secondary'
                tokenName={tokenNameSecondary}
                convertUSD={2345.45}
                handleChangeToken={() => {
                    setSelectedToken('secondary')
                    setIsOpenModal(true)
                }}
            />
            <Button
                sx={{
                    paddingY: 2,
                    marginY: 2,
                    paddingX: 1,
                    borderRadius: 3,
                    background: '#FFFFFF',
                    '&:hover': {
                        background: 'rgba(255, 255, 255, 0.8)',
                    },
                    textTransform: 'capitalize',
                    fontSize: '16px',
                }}
                color='primary'
            >
                Confirm Swap
            </Button>
        </Box>
    )
}
