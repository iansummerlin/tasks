import { Input } from "../ui/input";

type CustomInputProps = React.ComponentProps<typeof Input> & {
  label: string;
  error?: boolean;
  errorMessage?: string;
};

export default function CustomInput({
  id,
  label,
  error,
  errorMessage,
  ...props
}: CustomInputProps) {
  return (
    <>
      <label htmlFor={id} className="text-sm text-muted-foreground">
        {label}:
      </label>
      <Input
        id={id}
        className={error ? "border-red-500 focus-visible:ring-red-500" : ""}
        {...props}
      />
      {error && <p className="text-red-500 text-sm">{errorMessage}</p>}
    </>
  );
}
