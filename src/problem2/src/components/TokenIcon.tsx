interface TokenIconProps {
  name: string;
}
const TokenIcon = ({ name }: TokenIconProps) => {
  return (
    <img
      src={`/token-icons/tokens/${name}.svg`}
      alt={name}
      style={{ width: 20, height: 20 }}
    />
  )
}

export default TokenIcon
