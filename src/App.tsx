import { useReducer } from "react";
import { Provider } from "react-redux";

import "./App.css";
import Edge from "./components/Edge";
import Form, { Action, FormSchema, FormState } from "./components/Form";
import Table from "./components/Table";
import { store } from "./state/store";

interface AccountForm {
  externalId: number;
  businessName: string;
  supplierNumber: string;
  model: string;
}

const initialState: FormState<AccountForm> = {
  externalId: 57821,
  businessName: "",
  supplierNumber: "",
  model: "Alpha Platinum 9000",
};

function reducer(state: FormState<AccountForm>, action: Action) {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        [action.field]: action.value,
      };
    default:
      return state;
  }
}

const schema: FormSchema = {
  externalId: {
    type: "number",
    label: "External ID",
  },
  businessName: {
    type: "string",
    label: "Business Name",
  },
  supplierNumber: {
    type: "string",
    label: "Supplier Number",
  },
  model: {
    type: "string",
    label: "Model",
  },
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const updateField = (field: string, value: string | number) => {
    dispatch({ type: "SET_FIELD", field, value });
  };

  return (
    <Provider store={store}>
      <Edge startPoint="input.externalId.right" endPoint="th.externalId.top" />
      <Edge
        startPoint="input.businessName.right"
        endPoint="th.businessName.top"
      />
      <Edge
        startPoint="input.supplierNumber.right"
        endPoint="th.supplierNumber.top"
      />
      <Edge startPoint="input.model.right" endPoint="th.model.top" />

      <div className="content">
        <Form schema={schema} state={state} updateField={updateField} />

        <Table name="Account" schema={schema} state={state} />
      </div>
    </Provider>
  );
}

export default App;
