interface Props {
  label: string;
  type: string;
  name: string;
  inputRef: React.RefObject<HTMLInputElement>;
  onInput?: (value: number | string | null) => void;
}

export default function DiagramInput({
  inputRef,
  label,
  name,
  onInput,
  type,
}: Props) {
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const element = event.target;
    if (onInput) {
      onInput(element.value ?? null);
    }
  };

  return (
    <div className="diagram-input">
      <label htmlFor={name}>{label}</label>
      <input
        onInput={handleInput}
        ref={inputRef}
        id={name}
        name={name}
        type={type}
      />
    </div>
  );
}
