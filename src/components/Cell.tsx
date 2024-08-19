import { useRef } from "react";
import { useRegisterNode } from "../lib/hooks";

interface Props {
  name: string;
  value?: string | number | null;
}

export default function Cell({ name, value }: Props) {
  const ref = useRef<HTMLTableCellElement>(null);
  const nodeName = `td.${name}.top`;

  useRegisterNode(ref, nodeName, "top");

  return (
    <td style={{ height: "32px", padding: "0.25em 0.5em" }} ref={ref}>
      {value}
    </td>
  );
}
