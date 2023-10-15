import { create } from 'zustand'

const useTokenSecondaryStore = create((set) => ({
    tokenName: '',
    tokenPrice: 0,
    setTokenName: (name: string) => set(() => ({ tokenName: name })),
    setTokenPrice: (price: number) => set(() => ({ tokenPrice: price })),
}))

export { useTokenSecondaryStore }
