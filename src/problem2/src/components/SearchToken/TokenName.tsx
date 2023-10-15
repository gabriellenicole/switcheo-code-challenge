import { List, ListItem, ListItemText, Divider } from '@mui/material'

interface TokenName {
    tokenName: string
}

export default function TokenName({ tokenName }: TokenName) {
    return (
        <>
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
        </>
    )
}
