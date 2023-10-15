import { create } from 'zustand'

interface TokenListState {
    tokenList: string[]
    setTokenList: (list: string[]) => void
}

const useTokenListStore = create<TokenListState>((set) => ({
    tokenList: [],
    setTokenList: (list) => set(() => ({ tokenList: list })),
}))

export { useTokenListStore }
