import { useRef, useState } from "react";
import "./App.css";
import DiagramInput from "./components/DiagramInput";
import Node from "./components/Node";
import DiagramOutput from "./components/DiagramTableCell";

function App() {
  const fieldRefs = {
    externalId: useRef<HTMLInputElement>(null),
    businessName: useRef<HTMLInputElement>(null),
    supplierNumber: useRef<HTMLInputElement>(null),
  };

  const tableRefs = {
    externalId: useRef<HTMLTableCellElement>(null),
    businessName: useRef<HTMLTableCellElement>(null),
    supplierNumber: useRef<HTMLTableCellElement>(null),
  };

  const [externalId, setExternalId] = useState<number | null>(null);
  const [businessName, setBusinessName] = useState<string | null>(null);
  const [supplierNumber, setSupplierNumber] = useState<string | null>(null);

  return (
    <div>
      {Object.entries(fieldRefs).map(([key, value]) => (
        <Node key={key} elementRef={value} />
      ))}

      {Object.entries(tableRefs).map(([key, value]) => (
        <Node key={key} elementRef={value} />
      ))}

      <div className="form">
        <DiagramInput
          inputRef={fieldRefs.externalId}
          label="Lbmx Id"
          type="number"
          name="externalId"
          onInput={(value) => setExternalId(Number(value))}
        />
        <DiagramInput
          inputRef={fieldRefs.businessName}
          label="Business Name"
          type="text"
          name="businessName"
          onInput={(value) => setBusinessName(String(value))}
        />
        <DiagramInput
          inputRef={fieldRefs.supplierNumber}
          label="Supplier Number"
          type="text"
          name="supplierNumber"
          onInput={(value) => setSupplierNumber(String(value))}
        />
      </div>

      <div className="table">
        <table>
          <thead>
            <tr>
              <th>Lbmx Id</th>
              <th>Business Name</th>
              <th>Supplier Number</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <DiagramOutput
                value={externalId}
                inputRef={tableRefs.externalId}
              />
              <DiagramOutput
                value={businessName}
                inputRef={tableRefs.businessName}
              />
              <DiagramOutput
                value={supplierNumber}
                inputRef={tableRefs.supplierNumber}
              />
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
