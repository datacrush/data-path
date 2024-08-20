import { useRef } from "react";
import { useRegisterNode } from "../lib/hooks";

interface Props {
  children: React.ReactNode;
  name: string;
}

export default function HeaderCell({ children, name }: Props) {
  const ref = useRef<HTMLTableCellElement>(null);
  const nodeName = `${name}.top`;

  useRegisterNode(ref, nodeName, "top");

  return <th ref={ref}>{children}</th>;
}
