import Input from "./Input";

export interface Action {
  type: string;
  field: string;
  value: string | number;
}

interface Props<T> {
  state: T;
  updateField: (field: string, value: string | number) => void;
}

export default function Form<T>({ updateField, state }: Props<T>) {
  return (
    <div className="form">
      {Object.entries(state as Record<string, string | number>).map(
        ([field, value]) => {
          return (
            <Input
              key={field}
              label={field}
              name={field}
              onInput={updateField}
              position="right"
              value={value}
            />
          );
        }
      )}
    </div>
  );
}
