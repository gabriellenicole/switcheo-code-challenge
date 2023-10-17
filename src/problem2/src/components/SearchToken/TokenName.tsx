import { List, ListItem, ListItemText, Divider, Box } from '@mui/material'
import { useTokenPrimaryStore } from '../../store/useTokenPrimaryStore'
import { useTokenSecondaryStore } from '../../store/useTokenSecondaryStore'
import { useTokenListStore } from '../../store/useTokenListStore'
import { useEffect, useState } from 'react'

interface TokenName {
    tokenName: string
    handleCloseModal: () => void
}

export default function TokenName({ tokenName, handleCloseModal }: TokenName) {
    const setTokenNamePrimary = useTokenPrimaryStore(
        (state) => state.setTokenName
    )
    const setTokenNameSecondary = useTokenSecondaryStore(
        (state) => state.setTokenName
    )
    const selectedToken = useTokenListStore((state) => state.selectedToken)
    const tokenNamePrimary = useTokenPrimaryStore((state) => state.tokenName)
    const tokenNameSecondary = useTokenSecondaryStore(
        (state) => state.tokenName
    )

    const [isDisabledToken, setIsDisabledToken] = useState(false)

    useEffect(() => {
        if (selectedToken === 'primary') {
            setIsDisabledToken(tokenName === tokenNameSecondary)
        } else {
            setIsDisabledToken(tokenName === tokenNamePrimary)
        }
    }, [selectedToken])

    return (
        <Box
            onClick={() => {
                if (!isDisabledToken) {
                    selectedToken === 'primary'
                        ? setTokenNamePrimary(tokenName)
                        : setTokenNameSecondary(tokenName)
                    handleCloseModal()
                }
            }}
            sx={{
                opacity: isDisabledToken ? '0.4' : '1',
            }}
        >
            <List
                sx={{
                    px: 0,
                    py: 1,
                    '&:hover': {
                        backgroundColor: !isDisabledToken ? '#3b3b3b' : '',
                    },
                    transition: 'all 0.3s ease-in-out',
                }}
            >
                <ListItem>
                    <img
                        height={30}
                        width={30}
                        src={`src/assets/token-icons/${tokenName}.svg`}
                    />
                    <ListItemText sx={{ marginLeft: 2 }} primary={tokenName} />
                </ListItem>
            </List>
            <Divider />
        </Box>
    )
}
