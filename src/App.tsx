import { useReducer } from "react";
import { Provider } from "react-redux";

import "./App.css";
import Edge from "./components/Edge";
import Form, { Action } from "./components/Form";
import HeaderCell from "./components/HeaderCell";
import { store } from "./state/store";

interface FormState {
  externalId: number;
  businessName: string;
  supplierNumber: string;
  model: string;
}

const initialState: FormState = {
  externalId: 57821,
  businessName: "",
  supplierNumber: "",
  model: "Alpha Platinum 9000",
};

function reducer(state: FormState, action: Action) {
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
        <Form state={state} updateField={updateField} />

        <div className="table">
          <table>
            <thead>
              <tr>
                <HeaderCell name="model">Model</HeaderCell>
                <HeaderCell name="supplierNumber">Supplier Number</HeaderCell>
                <HeaderCell name="businessName">Business Name</HeaderCell>
                <HeaderCell name="externalId">External Id</HeaderCell>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{state.model}</td>
                <td>{state.supplierNumber}</td>
                <td>{state.businessName}</td>
                <td>{state.externalId}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Provider>
  );
}

export default App;
