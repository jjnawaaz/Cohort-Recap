import { Button, Card } from "@mui/material";
import React from "react";
import { atom, RecoilRoot, useRecoilValue, useSetRecoilState } from "recoil";

const RecoilCard = () => {
  return (
    <RecoilRoot>
      <div>
        Recoil Card
        <Card>
          <h3>Click counters</h3>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Increase />
            <Decrease />
          </div>
          <CountComponent />
        </Card>
      </div>
    </RecoilRoot>
  );
};

function Increase() {
  let setCount = useSetRecoilState(countAtom);
  console.log(setCount);

  return (
    <>
      <Button
        variant="outlined"
        onClick={() => setCount((existing) => existing + 1)}
      >
        Increase
      </Button>
    </>
  );
}

function Decrease() {
  let setCount = useSetRecoilState(countAtom);
  console.log(setCount);

  return (
    <>
      {" "}
      <Button
        variant="outlined"
        onClick={() => setCount((existing) => existing - 1)}
      >
        Decrease
      </Button>
    </>
  );
}

function CountComponent() {
  let count = useRecoilValue(countAtom);
  console.log(count);
  return (
    <>
      <center>
        <p>{count}</p>
      </center>
    </>
  );
}

const countAtom = atom({
  key: "countAtom",
  default: 0,
});

export default RecoilCard;
