import HeaderCell from "./HeaderCell";

export interface ColumnSchema {
  label: string;
}

export type TableSchema = Record<string, ColumnSchema>;

export type TableState<T> = {
  [K in keyof T]: number | string;
};

interface Props<T> {
  name?: string;
  schema: TableSchema;
  state: TableState<T>;
}

export default function Table<T>({ schema, state }: Props<T>) {
  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            {Object.keys(schema).map((key) => (
              <HeaderCell key={key} name={key}>
                {schema[key].label}
              </HeaderCell>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {Object.entries(state).map(([field, value]) => (
              <td key={field}>{String(value)}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
