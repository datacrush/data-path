import { useRef } from "react";
import { useRegisterNode } from "../lib/hooks";

interface Props {
  children: React.ReactNode;
  name: string;
}

export default function Cell({ children, name }: Props) {
  const ref = useRef<HTMLTableCellElement>(null);
  const nodeName = `${name}.bottom`;

  useRegisterNode(ref, nodeName, "bottom");

  return <td ref={ref}>{children}</td>;
}
