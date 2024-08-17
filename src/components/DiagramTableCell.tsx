interface Props {
  value?: string | number | null;
  inputRef: React.RefObject<HTMLTableCellElement>;
}

export default function DiagramOutput({ inputRef, value }: Props) {
  return (
    <td style={{ height: "32px", padding: "0.25em 0.5em" }} ref={inputRef}>
      {value}
    </td>
  );
}
