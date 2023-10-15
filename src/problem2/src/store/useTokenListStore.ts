import { create } from 'zustand'

interface TokenListState {
    tokenList: string[]
    selectedToken: 'primary' | 'secondary'
    setTokenList: (list: string[]) => void
    setSelectedToken: (selected: 'primary' | 'secondary') => void
}

const useTokenListStore = create<TokenListState>((set) => ({
    tokenList: [],
    selectedToken: 'primary',
    setTokenList: (list) => set(() => ({ tokenList: list })),
    setSelectedToken: (selected) => set(() => ({ selectedToken: selected })),
}))

export { useTokenListStore }
