import React, { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import useFetch from "../hooks/useFetch";
import TokenSelection from "./TokenSelection";
import { ACCOUNT_BALANCE } from "../App";

type TokenConversion = {
  currency: string;
  price: number;
};

interface TokenInputProps {
  name: string;
  selectionName: string;
  label?: string;
}

const TokenInput: React.FC<TokenInputProps> = ({
  name,
  selectionName,
  label,
}) => {
  const {
    register,
    getValues,
    formState: { errors },
  } = useFormContext();
  const { data } = useFetch<Array<TokenConversion>>(
    "https://interview.switcheo.com/prices.json"
  );

  const tokenOptions = useMemo(() => {
    if (!data) return [];
    return data.map(({ currency, price }) => ({
      value: price,
      label: currency,
    }));
  }, [data]);

  return (
    <>
      <div className="token-row">
        <div className="token-input-group">
          <div className="token-info">
            <TokenSelection tokens={tokenOptions} name={selectionName} />
            {getValues(selectionName) && (
              <div className="swap-rate-label">{`1 ${
                getValues(selectionName)?.label
              } = $${getValues(selectionName)?.value.toFixed(4)}`}</div>
            )}
          </div>
          <div className="token-amount">
            <label htmlFor={name}>{label}</label>
            <input
              {...register(name)}
              id={name}
              className="swap-input"
              placeholder="0.0"
              type="number"
            />
            {getValues(selectionName) && (
              <div className="exchange-info">{`Maximun ${
                getValues(selectionName)?.label
              } you can exchange: ${Math.floor(
                ACCOUNT_BALANCE / getValues(selectionName)?.value
              )}`}</div>
            )}
          </div>
        </div>
      </div>
      {(errors[name] || errors[selectionName] || errors.tokenDifferent) && (
        <span className="error-text">
          {errors[name]?.message?.toString() ||
            errors[selectionName]?.message?.toString() ||
            errors.tokenDifferent?.message?.toString()}
        </span>
      )}
    </>
  );
};

export default TokenInput;
