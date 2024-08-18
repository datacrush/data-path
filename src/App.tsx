import { useRef, useState } from "react";
import "./App.css";
import DiagramInput from "./components/DiagramInput";
import DiagramOutput from "./components/DiagramTableCell";
import Node, { NodeCoordinates } from "./components/Node";
import Edge from "./components/Edge";

function App() {
  const origin = { x: 0, y: 0 };

  const fieldRefs = {
    externalId: useRef<HTMLInputElement>(null),
    businessName: useRef<HTMLInputElement>(null),
    supplierNumber: useRef<HTMLInputElement>(null),
    model: useRef<HTMLInputElement>(null),
  };

  const tableRefs = {
    externalId: useRef<HTMLTableCellElement>(null),
    businessName: useRef<HTMLTableCellElement>(null),
    supplierNumber: useRef<HTMLTableCellElement>(null),
    model: useRef<HTMLTableCellElement>(null),
  };

  const [externalId, setExternalId] = useState<number>(57821);
  const [businessName, setBusinessName] = useState<string>("");
  const [supplierNumber, setSupplierNumber] = useState<string>("");
  const [model, setModel] = useState<string | null>("Alpha Platinum 9000");

  const nodeFieldRefs: Record<string, React.RefObject<NodeCoordinates>> = {
    externalId: useRef<NodeCoordinates>(null),
    businessName: useRef<NodeCoordinates>(null),
    supplierNumber: useRef<NodeCoordinates>(null),
    model: useRef<NodeCoordinates>(null),
  };

  const nodeTableRefs: Record<string, React.RefObject<NodeCoordinates>> = {
    externalId: useRef<NodeCoordinates>(null),
    businessName: useRef<NodeCoordinates>(null),
    supplierNumber: useRef<NodeCoordinates>(null),
    model: useRef<NodeCoordinates>(null),
  };

  return (
    <div>
      {Object.entries(fieldRefs).map(([key, value]) => (
        <Node ref={nodeFieldRefs[key]} key={key} elementRef={value} />
      ))}

      {Object.entries(tableRefs).map(([key, value]) => (
        <Node ref={nodeTableRefs[key]} key={key} elementRef={value} />
      ))}

      <Edge
        startPoint={nodeFieldRefs.externalId.current?.right ?? origin}
        endPoint={nodeTableRefs.externalId.current?.top ?? origin}
      />

      <Edge
        startPoint={nodeFieldRefs.businessName.current?.right ?? origin}
        endPoint={nodeTableRefs.businessName.current?.top ?? origin}
      />

      <Edge
        startPoint={nodeFieldRefs.supplierNumber.current?.right ?? origin}
        endPoint={nodeTableRefs.supplierNumber.current?.top ?? origin}
      />

      <Edge
        startPoint={nodeFieldRefs.model.current?.right ?? origin}
        endPoint={nodeTableRefs.model.current?.top ?? origin}
      />

      <div className="content">
        <div className="form">
          <DiagramInput
            inputRef={fieldRefs.externalId}
            label="External Id"
            type="number"
            name="externalId"
            value={externalId}
            onInput={(value) => setExternalId(Number(value))}
          />
          <DiagramInput
            inputRef={fieldRefs.businessName}
            label="Business Name"
            type="text"
            name="businessName"
            value={businessName}
            onInput={(value) => setBusinessName(String(value))}
          />
          <DiagramInput
            inputRef={fieldRefs.supplierNumber}
            label="Supplier Number"
            type="text"
            name="supplierNumber"
            value={supplierNumber}
            onInput={(value) => setSupplierNumber(String(value))}
          />
          <DiagramInput
            inputRef={fieldRefs.model}
            label="Model"
            type="text"
            name="model"
            value={model}
            onInput={(value) => setModel(String(value))}
          />
        </div>

        <div className="table">
          <table>
            <thead>
              <tr>
                <th>External Id</th>
                <th>Business Name</th>
                <th>Supplier Number</th>
                <th>Model</th>
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
                <DiagramOutput value={model} inputRef={tableRefs.model} />
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
