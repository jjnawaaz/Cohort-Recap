import { Button, Card } from "@mui/material";
import React, { useContext, useState } from "react";

const PropDrilling = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      PROP Drilling Card
      <Card>
        <h3>Click counters</h3>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Increase count={count} setCount={setCount} />
          <Decrease count={count} setCount={setCount} />
        </div>
        <CountComponent count={count} setCount={setCount} />
      </Card>
    </div>
  );
};

function Increase({ count, setCount }) {
  return (
    <>
      <Button variant="outlined" onClick={() => setCount(count + 1)}>
        Increase
      </Button>
    </>
  );
}

function Decrease({ count, setCount }) {
  return (
    <>
      {" "}
      <Button variant="outlined" onClick={() => setCount(count - 1)}>
        Decrease
      </Button>
    </>
  );
}

function CountComponent({ count }) {
  return (
    <>
      <center>
        <p>{count}</p>
      </center>
    </>
  );
}

export default PropDrilling;
