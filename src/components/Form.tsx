import Input from "./Input";

export interface Action {
  type: string;
  field: string;
  value: string | number;
}

export interface FieldSchema {
  type: string;
  label: string;
  display?: boolean;
}

export type FormSchema = Record<string, FieldSchema>;

export type FormState<T> = {
  [K in keyof T]: T[K];
};

interface Props {
  schema: FormSchema;
  state: Record<string, string | number>;
  updateField: (field: string, value: string | number) => void;
}

export default function Form({ schema, state, updateField }: Props) {
  return (
    <div className="form">
      {Object.entries<FieldSchema>(schema).map(([field, value]) => {
        return value.display ?? true ? (
          <Input
            key={field}
            label={value.label}
            name={field}
            onInput={updateField}
            position="right"
            type={value.type}
            value={state[field]}
          />
        ) : null;
      })}
    </div>
  );
}
