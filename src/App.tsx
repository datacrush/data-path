import { useReducer } from "react";
import { Provider } from "react-redux";

import "./App.css";
import Edge from "./components/Edge";
import Form, { Action, FormSchema, FormState } from "./components/Form";
import Table, { TableSchema } from "./components/Table";
import { store } from "./state/store";

interface AccountForm {
  accountKey: number;
  accountLocationKey?: number;
  externalId: number;
  businessName: string;
  supplierNumber: string;
  model: string;
}

const initialState: FormState<AccountForm> = {
  accountKey: 12345,
  accountLocationKey: 67890,
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
  accountKey: {
    type: "number",
    label: "AccountKey",
    display: false,
  },
  accountLocationKey: {
    type: "number",
    label: "AccountLocationKey",
    display: false,
  },
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

const accountTable: TableSchema<AccountForm> = {
  accountKey: {
    label: "AccountKey",
  },
  model: {
    label: "Model",
  },
  supplierNumber: {
    label: "SupplierNumber",
  },
  businessName: {
    label: "BusinessName",
  },
  externalId: {
    label: "ExternalId",
  },
};

const accountLocationTable: TableSchema<AccountForm> = {
  accountLocationKey: {
    label: "AccountLocationKey",
  },
  accountKey: {
    label: "AccountKey",
  },
  model: {
    label: "Model",
  },
  supplierNumber: {
    label: "SupplierNumber",
  },
  businessName: {
    label: "BusinessName",
  },
  externalId: {
    label: "ExternalId",
  },
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const updateField = (field: string, value: string | number) => {
    dispatch({ type: "SET_FIELD", field, value });
  };

  return (
    <Provider store={store}>
      <Edge
        startPoint="input.externalId.right"
        endPoint="account.externalId.top"
      />
      <Edge
        startPoint="input.businessName.right"
        endPoint="account.businessName.top"
      />
      <Edge
        startPoint="input.supplierNumber.right"
        endPoint="account.supplierNumber.top"
      />
      <Edge startPoint="input.model.right" endPoint="account.model.top" />

      <div className="content">
        <Form schema={schema} state={state} updateField={updateField} />

        <Table name="account" schema={accountTable} state={state} />
        <Table
          name="AccountLocation"
          schema={accountLocationTable}
          state={state}
        />
      </div>
    </Provider>
  );
}

export default App;
