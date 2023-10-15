import { List, ListItem, ListItemText, Divider, Box } from '@mui/material'
import { useTokenPrimaryStore } from '../../store/useTokenPrimaryStore'
import { useTokenSecondaryStore } from '../../store/useTokenSecondaryStore'
import { useTokenListStore } from '../../store/useTokenListStore'

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
    return (
        <Box
            onClick={() => {
                handleCloseModal()
                selectedToken === 'primary'
                    ? setTokenNamePrimary(tokenName)
                    : setTokenNameSecondary(tokenName)
            }}
        >
            <List
                sx={{
                    px: 0,
                    py: 1,
                    '&:hover': {
                        backgroundColor: '#3b3b3b',
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
            <Divider sx={{ bgcolor: 'primary' }} />
        </Box>
    )
}
