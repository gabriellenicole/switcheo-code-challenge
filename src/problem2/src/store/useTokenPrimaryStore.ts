import { create } from 'zustand'

const useTokenPrimaryStore = create((set) => ({
    tokenName: '',
    tokenPrice: 0,
    setTokenName: (name: string) => set(() => ({ tokenName: name })),
    setTokenPrice: (price: number) => set(() => ({ tokenPrice: price })),
}))

export { useTokenPrimaryStore }
