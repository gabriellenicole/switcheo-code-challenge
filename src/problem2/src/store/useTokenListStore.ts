import { create } from 'zustand'

interface TokenListState {
    tokenList: string[]
    selectedToken: 'primary' | 'secondary'
    focusToken: 'primary' | 'secondary'
    exchangeRate: string
    setTokenList: (list: string[]) => void
    setSelectedToken: (selected: 'primary' | 'secondary') => void
    setFocusToken: (focus: 'primary' | 'secondary') => void
    setExchangeRate: (rate: string) => void
}

const useTokenListStore = create<TokenListState>((set) => ({
    tokenList: [],
    selectedToken: 'primary',
    focusToken: 'primary',
    exchangeRate: '',
    setTokenList: (list) => set(() => ({ tokenList: list })),
    setSelectedToken: (selected) => set(() => ({ selectedToken: selected })),
    setFocusToken: (focus) => set(() => ({ focusToken: focus })),
    setExchangeRate: (rate) => set(() => ({ exchangeRate: rate })),
}))

export { useTokenListStore }
