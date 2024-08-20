import { FormState } from "./Form";
import HeaderCell from "./HeaderCell";

export interface ColumnSchema {
  label: string;
}

export type TableSchema<T> = {
  [K in keyof T]: ColumnSchema;
};

export type TableState<T> = {
  [K in keyof T]: T[K];
};

interface Props<T> {
  name?: string;
  schema: TableSchema<T>;
  state: FormState<T>;
}

export default function Table<T>({ name, schema, state }: Props<T>) {
  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            {Object.keys(schema).map((key) => (
              <HeaderCell key={key} name={`${name}.${key}`}>
                {schema[key as keyof T].label}
              </HeaderCell>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {Object.keys(schema).map((key) => (
              <td key={key}>{String(state[key as keyof T])}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
