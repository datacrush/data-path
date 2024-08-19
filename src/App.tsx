import { useState } from "react";
import { Provider } from "react-redux";

import "./App.css";
import Edge from "./components/Edge";
import HeaderCell from "./components/HeaderCell";
import Input from "./components/Input";
import { store } from "./state/store";

function App() {
  const [externalId, setExternalId] = useState<number>(57821);
  const [businessName, setBusinessName] = useState<string>("");
  const [supplierNumber, setSupplierNumber] = useState<string>("");
  const [model, setModel] = useState<string | null>("Alpha Platinum 9000");

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
      <div>
        <div className="content">
          <div className="form">
            <Input
              label="External Id"
              name="externalId"
              onInput={(value) => setExternalId(Number(value))}
              position="right"
              type="number"
              value={externalId}
            />
            <Input
              label="Business Name"
              name="businessName"
              onInput={(value) => setBusinessName(String(value))}
              position="right"
              type="text"
              value={businessName}
            />
            <Input
              label="Supplier Number"
              name="supplierNumber"
              onInput={(value) => setSupplierNumber(String(value))}
              position="right"
              type="text"
              value={supplierNumber}
            />
            <Input
              label="Model"
              name="model"
              onInput={(value) => setModel(String(value))}
              position="right"
              type="text"
              value={model}
            />
          </div>

          <div className="table">
            <table>
              <thead>
                <tr>
                  <HeaderCell name="externalId">External Id</HeaderCell>
                  <HeaderCell name="businessName">Business Name</HeaderCell>
                  <HeaderCell name="supplierNumber">Supplier Number</HeaderCell>
                  <HeaderCell name="model">Model</HeaderCell>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{externalId}</td>
                  <td>{businessName}</td>
                  <td>{supplierNumber}</td>
                  <td>{model}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default App;
