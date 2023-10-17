import { useEffect, useState } from 'react'
import { Close } from '@mui/icons-material'
import { Grid, TextField, Typography } from '@mui/material'
import { useTokenListStore } from '../../store/useTokenListStore'
import TokenName from './TokenName'

interface searchTokenProps {
    handleCloseModal: () => void
}

export default function SearchToken({ handleCloseModal }: searchTokenProps) {
    const tokenList = useTokenListStore((state) => state.tokenList)
    const [localTokenList, setLocalTokenList] = useState(tokenList)
    const [searchInput, setSearchInput] = useState('')

    useEffect(() => {
        const filteredTokenList = tokenList.filter((name) => {
            return name.toLowerCase().includes(searchInput.toLowerCase())
        })
        setLocalTokenList(filteredTokenList)
    }, [searchInput, tokenList])
    return (
        <Grid
            container
            direction='column'
            color={'white'}
            gap={2}
            sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: { xs: 450, sm: 635 },
                background: '#2B2B2B',
                boxShadow: 24,
                p: 4,
                borderRadius: 3,
            }}
        >
            {/* Modal Heading */}
            <Grid item xs={2}>
                <Grid container alignItems='center'>
                    <Grid item xs={11.5}>
                        <Typography variant='h6'>Select a Token</Typography>
                    </Grid>
                    <Grid
                        item
                        xs={0.5}
                        sx={{ marginRight: '0' }}
                        onClick={handleCloseModal}
                    >
                        <Close color='secondary' />
                    </Grid>
                </Grid>
            </Grid>
            {/* Modal Search Bar */}
            <Grid item>
                <TextField
                    label='Token Name'
                    color='secondary'
                    sx={{
                        width: '100%',

                        input: {
                            color: 'white',
                        },
                        '& .MuiInputLabel-root': {
                            color: 'white',
                            borderColor: 'white',
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'white',
                        },
                        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline':
                            {
                                borderColor: '#B024F2',
                            },
                    }}
                    value={searchInput}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setSearchInput(event.target.value)
                    }}
                />
            </Grid>
            {/* Modal Token List */}
            <Grid item sx={{ overflow: 'auto', height: 330 }}>
                {localTokenList.map((name) => {
                    return (
                        <TokenName
                            key={name}
                            handleCloseModal={handleCloseModal}
                            tokenName={name}
                        />
                    )
                })}
            </Grid>
        </Grid>
    )
}
