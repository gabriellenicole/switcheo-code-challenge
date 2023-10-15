import { create } from 'zustand'

interface InfoState {
    tokenName: string
    tokenPrice: number
    tokenInput: number
}

interface TokenState {
    tokenName: string
    tokenPrice: number
    tokenInput: number
    setTokenName: (name: string) => void
    setTokenPrice: (price: number) => void
    setTokenInput: (input: number) => void
    updateAll: (info: InfoState) => void
}

const useTokenPrimaryStore = create<TokenState>((set) => ({
    tokenName: '',
    tokenPrice: 0,
    tokenInput: 0,
    setTokenName: (name: string) => set(() => ({ tokenName: name })),
    setTokenPrice: (price: number) => set(() => ({ tokenPrice: price })),
    setTokenInput: (input: number) => set(() => ({ tokenInput: input })),
    updateAll: (info: InfoState) =>
        set(() => ({
            tokenName: info.tokenName,
            tokenPrice: info.tokenPrice,
            tokenInput: info.tokenInput,
        })),
}))

export { useTokenPrimaryStore }
