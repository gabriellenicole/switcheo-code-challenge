// Imported necessary hooks, clasess, components, and PropType
import React, { useState, useEffect, useMemo, ReactNode } from 'react'
import { WalletRow } from './WalletRow'
import classes from './classes'
import useWalletBalances from './useWalletBalanceStore'
import BoxProps from './BoxComponent'

// Added 'blockchain' props in 'WalletBalance'
interface WalletBalance {
    currency: string
    amount: number
    blockchain: string
}
interface FormattedWalletBalance {
    currency: string
    amount: number
    formatted: string
}

// Added 'PricesOject' type
interface PricesObject {
    currency: string
    date: string
    price: number
}

interface Props extends BoxProps {
    children?: ReactNode
}

// Implemented 'Datasource' class
class Datasource {
    private url: string
    constructor(url: string) {
        this.url = url
    }

    async getPrices(): Promise<Record<string, number> | undefined> {
        try {
            const response = await fetch(this.url)
            const pricesData = await response.json()
            const pricesReturn = {}

            pricesData.map((priceObj: PricesObject) => {
                pricesReturn[priceObj.currency] = priceObj.price
            })
            return pricesReturn
        } catch (error) {
            console.error(error)
        }
    }
}

const WalletPage: React.FC<Props> = (props: Props) => {
    const { children, ...rest } = props
    // Added 'WalletBalance[]' as 'balances' types
    const balances: WalletBalance[] = useWalletBalances()
    const [prices, setPrices] = useState<Record<string, number>>({})

    useEffect(() => {
        const datasource = new Datasource(
            'https://interview.switcheo.com/prices.json'
        )
        // Refactored .then to async await
        const getDataSource = async () => {
            const price = await datasource.getPrices()
            if (price !== undefined) setPrices(price)
        }

        try {
            getDataSource()
        } catch (error) {
            console.error(error)
        }
    }, [])

    // Changed 'blockchain' type from 'any' to 'string'
    const getPriority = (blockchain: string): number => {
        switch (blockchain) {
            case 'Osmosis':
                return 100
            case 'Ethereum':
                return 50
            case 'Arbitrum':
                return 30
            case 'Zilliqa':
                return 20
            case 'Neo':
                return 20
            default:
                return -99
        }
    }

    const sortedBalances = useMemo(() => {
        return balances
            .filter((balance: WalletBalance) => {
                const balancePriority = getPriority(balance.blockchain)
                // Changed 'lhsPriority' to 'balancePriority'
                if (balancePriority > -99) {
                    // Changed '<=' to '>'; to be inside wallet, amount should be more than 0
                    if (balance.amount > 0) {
                        return true
                    }
                }
                return false
            })
            .sort((lhs: WalletBalance, rhs: WalletBalance) => {
                const leftPriority = getPriority(lhs.blockchain)
                const rightPriority = getPriority(rhs.blockchain)
                // Simplified if statement for descending priority sort
                return rightPriority - leftPriority
            })
    }, [balances, prices])

    const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
        return {
            ...balance,
            formatted: balance.amount.toFixed(),
        }
    })

    // Changed sortedBalances to formattedBalances
    const rows = formattedBalances.map(
        (balance: FormattedWalletBalance, index: number) => {
            const usdValue = prices[balance.currency] * balance.amount
            return (
                <WalletRow
                    className={classes.row}
                    key={index}
                    amount={balance.amount}
                    usdValue={usdValue}
                    formattedAmount={balance.formatted}
                />
            )
        }
    )

    return (
        <div {...rest}>
            {rows}
            {/* Returned children component here */}
            {children}
        </div>
    )
}

// Added export wallet page
export { WalletPage }
