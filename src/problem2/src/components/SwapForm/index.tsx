import { Box, Typography, Button, Modal } from '@mui/material'
import { useState } from 'react'
import { useTokenListStore } from '../../store/useTokenListStore'
import { useTokenPrimaryStore } from '../../store/useTokenPrimaryStore'
import { useTokenSecondaryStore } from '../../store/useTokenSecondaryStore'
import SearchToken from '../SearchToken'
import SwapRate from './SwapRate'
import InputBlockPrimary from './InputBlockPrimary'
import InputBlockSecondary from './InputBlockSecondary'

interface SwapFormProps {
    submitForm: () => void
}
export default function SwapForm({ submitForm }: SwapFormProps) {
    const setSelectedToken = useTokenListStore((state) => state.setSelectedToken)
    const tokenNamePrimary = useTokenPrimaryStore((state) => state.tokenName)
    const tokenNameSecondary = useTokenSecondaryStore((state) => state.tokenName)
    const isLoadingPrimary = useTokenPrimaryStore((state) => state.isLoading)
    const isLoadingSecondary = useTokenSecondaryStore((state) => state.isLoading)
    const [isOpenModal, setIsOpenModal] = useState(false)

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
                <>
                    <SearchToken handleCloseModal={() => setIsOpenModal(false)} />
                </>
            </Modal>

            <Typography
                sx={{
                    marginBottom: 1,
                    paddingBottom: 2,
                    color: 'white',
                    fontWeight: 500,
                }}
                variant='h6'
            >
                Swap Token
            </Typography>

            <InputBlockPrimary
                tokenName={tokenNamePrimary}
                handleChangeToken={() => {
                    setSelectedToken('primary')
                    setIsOpenModal(true)
                }}
            />
            <SwapRate />
            <InputBlockSecondary
                tokenName={tokenNameSecondary}
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
                onClick={submitForm}
                disabled={isLoadingPrimary || isLoadingSecondary}
            >
                Confirm Swap
            </Button>
        </Box>
    )
}
