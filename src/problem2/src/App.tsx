/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import {
  useForm,
  type SubmitHandler,
  type FieldValues,
  FormProvider,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TokenInput from "./components/TokenInput";
import schema from "./validation/tokenSwapValidation";
import "./App.css";
import { toast, ToastContainer } from "react-tiny-toast";

type OptionType = {
  value: number;
  label: string;
};
type Inputs = {
  tokenInput: OptionType;
  inputAmount: number;
  tokenOutput: OptionType;
  outputAmount: number;
};

export const ACCOUNT_BALANCE = 5000;

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const methods = useForm<Inputs>({
    defaultValues: {
      inputAmount: 0,
      outputAmount: 0,
    },
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const {
    watch,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = methods;
  const inputAmount = watch("inputAmount");
  const tokenInput = watch("tokenInput");
  const tokenOutput = watch("tokenOutput");
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setLoading(true);
    timer.current = setTimeout(() => {
      console.log(data);
      setLoading(false);
      toast.show("Swap successful!", {
        position: "top-center",
        variant: "success",
      });
    }, 2000);
  };
  const handleSwapInputs = () => {
    const currentInputAmount = getValues("inputAmount");
    const currentTokenInput = getValues("tokenInput");
    const currentOutputAmount = getValues("outputAmount");
    const currentTokenOutput = getValues("tokenOutput");
    setValue("inputAmount", currentOutputAmount);
    setValue("tokenInput", currentTokenOutput);
    setValue("outputAmount", currentInputAmount);
    setValue("tokenOutput", currentTokenInput);
  };

  useEffect(() => {
    if (inputAmount && tokenInput && tokenOutput) {
      const inputAmountToToken = inputAmount * tokenInput.value;
      const tokenOututCalulated = Math.floor(inputAmountToToken / (tokenOutput.value || 1));
      setValue("outputAmount", tokenOututCalulated);
    } else {
      setValue("outputAmount", 0);
    }
  }, [inputAmount, tokenInput, tokenOutput, setValue]);

  useEffect(() => {
    return () => {
      if (timer) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  return (
    <>
      <ToastContainer />
      <FormProvider {...methods}>
        <form className="swap-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="swap-header">
            <h2 className="swap-title">Swap</h2>
            <h5 className="swap-balance">{`Your account balance: $${ACCOUNT_BALANCE}`}</h5>
          </div>
          <TokenInput name="inputAmount" selectionName="tokenInput" label="Amount to send:" />
          <div className="swap-divider">
            <button
              type="button"
              className="swap-icon"
              aria-label="Swap tokens"
              onClick={handleSwapInputs}
            >
              &#8646;
            </button>
          </div>
          <TokenInput name="outputAmount" selectionName="tokenOutput" label="Amount to receive:" />
          {(errors as Record<string, any>)[""]?.message && (
            <span className="error-text">
              {(errors as Record<string, any>)[""]?.message}
            </span>
          )}
          <button className="swap-btn" type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Confirm Swap"}
          </button>
        </form>
      </FormProvider>
    </>
  );
}

export default App;
