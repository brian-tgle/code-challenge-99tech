import React, { useMemo, FC } from 'react';
import { getPriority } from './utils';
interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}

interface BoxProps { }

// BoxProps is not defined yet.
interface Props extends BoxProps {

}
// Use PropsWithChildren if children is needed
const WalletPage: FC<Props> = (props: Props) => {
  const balances = useWalletBalances();
  const prices = usePrices();

  const prioritizedBalances = useMemo(() => {
    if (!balances || !balances.length) {
      return [];
    }
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain)
        return balancePriority > -99 && balance.amount > 0
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) =>
        getPriority(rhs.blockchain) - getPriority(lhs.blockchain)
      )
  }, [balances]);

  const walletBalanceRows = useMemo(() => {
    if (!prioritizedBalances.length) {
      return <div>No balances available</div>;
    }
    return prioritizedBalances.map((balance: WalletBalance) => {
      const price = prices?.[balance.currency] ?? 0
      const usdValue = price * balance.amount;
      return (
        <WalletRow
          className={classes.row}
          key={`${balance.currency}-${balance.blockchain}`}
          amount={balance.amount}
          usdValue={usdValue}
          currency={balance.currency}
          blockchain={balance.blockchain}
          formattedAmount={balance.amount.toFixed(2)}
        />
      )
    })
  }, [prioritizedBalances, prices]);

  return (
    <div>
      {walletBalanceRows}
    </div>
  )
}