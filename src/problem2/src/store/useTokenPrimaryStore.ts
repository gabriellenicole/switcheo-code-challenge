import { create } from 'zustand'

interface InfoState {
    tokenName: string
    tokenPrice: number
    tokenInput: string
}

interface TokenState extends InfoState {
    isLoading: boolean
    setIsLoading: (loading: boolean) => void
    setTokenName: (name: string) => void
    setTokenPrice: (price: number) => void
    setTokenInput: (input: string) => void
    updateAll: (info: InfoState) => void
}

const useTokenPrimaryStore = create<TokenState>((set) => ({
    tokenName: '',
    tokenPrice: 0,
    tokenInput: '',
    isLoading: false,
    setIsLoading: (loading: boolean) => set(() => ({ isLoading: loading })),
    setTokenName: (name: string) => set(() => ({ tokenName: name })),
    setTokenPrice: (price: number) => set(() => ({ tokenPrice: price })),
    setTokenInput: (input: string) => set(() => ({ tokenInput: input })),
    updateAll: (info: InfoState) =>
        set(() => ({
            tokenName: info.tokenName,
            tokenPrice: info.tokenPrice,
            tokenInput: info.tokenInput,
        })),
}))

export { useTokenPrimaryStore }
