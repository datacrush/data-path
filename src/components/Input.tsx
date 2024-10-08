import { useRef } from "react";
import { useRegisterNode } from "../lib/hooks";

interface Props {
  label: string;
  name: string;
  onInput?: (field: string, value: number | string) => void;
  position: "top" | "right" | "bottom" | "left";
  type?: string;
  value?: string | number | null;
}

export default function Input({
  label,
  name,
  onInput,
  position,
  type = "text",
  value,
}: Props) {
  const ref = useRef<HTMLInputElement>(null);
  const nodeName = `input.${name}.${position}`;

  useRegisterNode(ref, nodeName, "right");

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const element = event.target;
    if (onInput) {
      onInput(name, element.value ?? "");
    }
  };

  return (
    <div className="diagram-input">
      <label htmlFor={name}>{label}</label>
      <input
        onInput={handleInput}
        ref={ref}
        id={name}
        name={name}
        type={type}
        value={value ?? undefined}
      />
    </div>
  );
}
