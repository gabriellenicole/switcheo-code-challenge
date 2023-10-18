
# Problem 3: Messy React

## Task
List out the computational inefficiencies and anti-patterns found in the code block below.

1. This code block uses
    1. ReactJS with TypeScript.
    2. Functional components.
    3. React Hooks
2. Implement the Datasource class so that it can retrieve the prices required.
3. You should explicitly state the issues and explain how to improve them.
4. You should also provide a refactored version of the code.

```bash
interface WalletBalance {
  currency: string;
  amount: number;
}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

class Datasource {
  // TODO: Implement datasource class
}

interface Props extends BoxProps {

}
const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
	const [prices, setPrices] = useState({});

  useEffect(() => {
    const datasource = new Datasource("https://interview.switcheo.com/prices.json");
    datasource.getPrices().then(prices => {
      setPrices(prices);
    }).catch(error => {
      console.err(error);
    });
  }, []);

	const getPriority = (blockchain: any): number => {
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
    return balances.filter((balance: WalletBalance) => {
		  const balancePriority = getPriority(balance.blockchain);
		  if (lhsPriority > -99) {
		     if (balance.amount <= 0) {
		       return true;
		     }
		  }
		  return false
		}).sort((lhs: WalletBalance, rhs: WalletBalance) => {
			const leftPriority = getPriority(lhs.blockchain);
		  const rightPriority = getPriority(rhs.blockchain);
		  if (leftPriority > rightPriority) {
		    return -1;
		  } else if (rightPriority > leftPriority) {
		    return 1;
		  }
    });
  }, [balances, prices]);

  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed()
    }
  })

  const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow 
        className={classes.row}
        key={index}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    )
  })

  return (
    <div {...rest}>
      {rows}
    </div>
  )
}
```

## Solution

### 1. Implemented DataSource Class
``` bash
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
```

### 2. Issues and Improvement
- Necessary hooks, clasess, components, and PropType are not imported
- Missing 'blockchain' props in 'WalletBalance'
- 'PricesOject' type is not specified
- 'balances' type is not specified
- then() involves promise chaining, less readbable compared to async/await
- 'blockchain' type is 'any'
- 'lhsPriority' is not defined
- Incorrect comparison on 'balancePriority <= -99'
- Redundant if statement for sort
- Incorrect usage of sortedBalances in rows
- 'children' is not returned
- 'WalletPage' is not exported

### 3. Refactored code  
   More detailed improvement can be acessed at the refactored code on `./WalletPageRefactored `
