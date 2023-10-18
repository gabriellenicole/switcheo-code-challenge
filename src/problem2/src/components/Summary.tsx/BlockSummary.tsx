import { Box, Typography, Divider } from '@mui/material'
import { formatDecimal } from '../../utils/formatter'

interface BlockSummaryProps {
    isPay: boolean
    tokenName: string
    tokenInput: string
    tokenPrice: number
}

export default function BlockSummary({
    isPay,
    tokenName,
    tokenInput,
    tokenPrice,
}: BlockSummaryProps) {
    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Typography variant='h6' fontWeight={500}>
                {isPay ? 'You Pay' : 'You Receive'}
            </Typography>
            <Divider sx={{ width: '100%', marginBottom: 1, borderStyle: 'dashed' }} />
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    marginBottom: 1,
                }}
            >
                <Typography variant='body2'>Token Currency</Typography>
                <Typography variant='body2'>{tokenName}</Typography>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    marginBottom: 1,
                }}
            >
                <Typography variant='body2'>{isPay ? 'Total Paid' : 'Total Received'}</Typography>
                <Typography variant='body2'>{tokenInput}</Typography>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    marginBottom: 1,
                }}
            >
                <Typography variant='body2'>Price in USD</Typography>
                <Typography variant='body2'>{formatDecimal(tokenPrice)}</Typography>
            </Box>
        </Box>
    )
}
