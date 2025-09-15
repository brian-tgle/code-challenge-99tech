import Select, {
  components,
  type OptionProps,
  type StylesConfig,
  type SingleValueProps,
} from "react-select";
import TokenIcon from "./TokenIcon";
import { Controller, useFormContext } from "react-hook-form";

export type OptionType = {
  value: number;
  label: string;
};

interface TokenSelectionProps {
  tokens: OptionType[];
  name: string;
}

const customStyles: StylesConfig<OptionType, false> = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "#23262f",
    borderColor: state.isFocused ? "#ffe900" : "#353945",
    color: "#fff",
    boxShadow: state.isFocused ? "0 0 0 2px #ffe900" : "none",
    minHeight: 40,
    fontSize: 13,
    borderRadius: "20px",
    transition: "border-color 0.2s",
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "#181a20",
    color: "#fff",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#353945" : "#181a20",
    color: "#fff",
    cursor: "pointer",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#fff",
  }),
  input: (provided) => ({
    ...provided,
    color: "#fff",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#8a8fa3",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: "#8a8fa3",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
};

const OptionWithIcon = ({ label }: { label: string }) => (
  <div className="option-with-icon">
    <TokenIcon name={label} />
    {label}
  </div>
);

const TokenSelection = ({ tokens, name }: TokenSelectionProps) => {
  const { control, trigger } = useFormContext();
  const IconSingleValue = (props: SingleValueProps<OptionType, false>) => (
    <components.SingleValue {...props}>
      <OptionWithIcon label={props.data.label} />
    </components.SingleValue>
  );
  const IconOption = (props: OptionProps<OptionType>) => (
    <components.Option {...props}>
      <OptionWithIcon label={props.data.label} />
    </components.Option>
  );

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ref } }) => (
        <Select
          isMulti={false}
          options={tokens}
          onChange={(value) => {
            onChange(value);
            trigger();
          }}
          value={value}
          ref={ref}
          components={{ Option: IconOption, SingleValue: IconSingleValue }}
          styles={customStyles}
          placeholder="Select token"
        />
      )}
    />
  );
};

export default TokenSelection;
