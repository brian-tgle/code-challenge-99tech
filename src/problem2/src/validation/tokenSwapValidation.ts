import * as yup from "yup"

const optionTypeSchema = yup.object().shape({
  value: yup.number().required(),
  label: yup.string().required(),
});

const schema = yup.object().shape({
  tokenInput: optionTypeSchema.required("Please select a token"),
  inputAmount: yup.number().required("Please enter an amount"),
  tokenOutput: optionTypeSchema.required("Please select a token"),
  outputAmount: yup.number().required("Please enter an amount"),
}).test({
  name: "tokenDifferent",
  message: "Tokens must be different",
  test: function (obj: { tokenInput?: { label?: string }; tokenOutput?: { label?: string } }) {
    console.log("Validating tokens:", obj);
    if (!obj.tokenInput || !obj.tokenOutput) return true;
    return obj.tokenInput.label !== obj.tokenOutput.label;
  }
});

export default schema;