import { Box, Button, LinearProgress, Typography } from '@mui/material'
import { useTokenPrimaryStore } from '../../store/useTokenPrimaryStore'
import { useTokenSecondaryStore } from '../../store/useTokenSecondaryStore'
import BlockSummary from './BlockSummary'
import { useState } from 'react'

interface SummaryProps {
    backToHome: () => void
}

export default function Summary({ backToHome }: SummaryProps) {
    const tokenNamePrimary = useTokenPrimaryStore((state) => state.tokenName)
    const tokenNameSecondary = useTokenSecondaryStore(
        (state) => state.tokenName
    )
    const tokenInputPrimary = useTokenPrimaryStore((state) => state.tokenInput)
    const tokenInputSecondary = useTokenSecondaryStore(
        (state) => state.tokenInput
    )
    const tokenPricePrimary = useTokenPrimaryStore((state) => state.tokenPrice)
    const tokenPriceSecondary = useTokenSecondaryStore(
        (state) => state.tokenPrice
    )
    const [isConfirmed, setIsConfirmed] = useState(false)

    const handleConfirm = () => {
        setIsConfirmed(true)
        setTimeout(() => backToHome(), 5000)
    }

    return (
        <Box
            sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                paddingX: 4,
                paddingY: 4,
                borderRadius: 2,
                display: 'flex',
                width: 500,
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: 2,
                boxShadow: '0px 4px 24px -1px rgba(0, 0, 0, 0.20)',
            }}
        >
            <Typography
                sx={{
                    marginBottom: 1,
                    paddingBottom: 2,
                    color: 'primary.main',
                    fontWeight: 500,
                }}
                variant='h6'
            >
                Swap Summary
            </Typography>
            <BlockSummary
                isPay={true}
                tokenInput={tokenInputPrimary}
                tokenName={tokenNamePrimary}
                tokenPrice={tokenPricePrimary}
            />

            <BlockSummary
                isPay={false}
                tokenInput={tokenInputSecondary}
                tokenName={tokenNameSecondary}
                tokenPrice={tokenPriceSecondary}
            />

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    width: '100%',
                    gap: 2,
                    marginTop: 4,
                }}
            >
                <Button variant='outlined' onClick={backToHome}>
                    Cancel
                </Button>
                <Button variant='contained' onClick={handleConfirm}>
                    Confirm Swap
                </Button>
            </Box>
            {isConfirmed && (
                <Typography
                    variant='body2'
                    sx={{ textAlign: 'center', marginTop: 2 }}
                >
                    <strong>Yay! Your swap is in progress</strong> <br />
                    Feel free to initiate another swap while we work on this one
                    <LinearProgress sx={{ marginY: 1 }} />
                    Navigating to Home...
                </Typography>
            )}
        </Box>
    )
}
