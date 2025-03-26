import { Button, Card } from "@mui/material";
import React, { createContext, useContext, useState } from "react";

const CountContext = createContext();

const UseContext = () => {
  const [count, setCount] = useState(0);
  return (
    <CountContext.Provider
      value={{
        count: count,
        setCount: setCount,
      }}
    >
      <div>
        useContext() Hook Card
        <Card>
          <h3>Click counters</h3>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Increase />
            <Decrease />
          </div>
          <CountComponent />
        </Card>
      </div>
    </CountContext.Provider>
  );
};

function Increase() {
  let { count, setCount } = useContext(CountContext);
  console.log(count, setCount);
  return (
    <>
      <Button variant="outlined" onClick={() => setCount(count + 1)}>
        Increase
      </Button>
    </>
  );
}

function Decrease() {
  let { count, setCount } = useContext(CountContext);
  return (
    <>
      {" "}
      <Button variant="outlined" onClick={() => setCount(count - 1)}>
        Decrease
      </Button>
    </>
  );
}

function CountComponent() {
  const { count } = useContext(CountContext);
  return (
    <>
      <center>
        <p>{count}</p>
      </center>
    </>
  );
}

export default UseContext;
