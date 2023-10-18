import { Box, Typography, Tooltip } from '@mui/material'
import { FiberManualRecord, SyncAlt } from '@mui/icons-material'
import { useState } from 'react'
import { useTokenPrimaryStore } from '../../store/useTokenPrimaryStore'
import { useTokenSecondaryStore } from '../../store/useTokenSecondaryStore'
import { useTokenListStore } from '../../store/useTokenListStore'

export default function SwapRate() {
    const [reverse, setReverse] = useState(false)
    // primary state
    const allInfoPrimary = useTokenPrimaryStore((state) => state)
    const updateAllPrimary = useTokenPrimaryStore((state) => state.updateAll)
    const isLoadingPrimary = useTokenPrimaryStore((state) => state.isLoading)
    // secondary state
    const allInfoSecondary = useTokenSecondaryStore((state) => state)
    const updateAllSecondary = useTokenSecondaryStore((state) => state.updateAll)
    const isLoadingSecondary = useTokenSecondaryStore((state) => state.isLoading)
    // general state
    const focusToken = useTokenListStore((state) => state.focusToken)
    const setFocusToken = useTokenListStore((state) => state.setFocusToken)
    const exchangeRate = useTokenListStore((state) => state.exchangeRate)

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
        setFocusToken(focusToken === 'primary' ? 'secondary' : 'primary')
    }
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
        >
            {isLoadingPrimary || isLoadingSecondary || exchangeRate ? (
                <>
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
                            {isLoadingPrimary || isLoadingSecondary
                                ? 'Fecthing exchange rate...'
                                : exchangeRate}
                        </Typography>
                    </Box>

                    <Tooltip title={'Swap "paid" and "received" token'} placement='right'>
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
                </>
            ) : (
                <>
                    <Box sx={{ my: 1 }}></Box>
                </>
            )}
        </Box>
    )
}
