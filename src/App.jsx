import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import InputForm from "./components/inputForm/InputForm";
import DataLoader from "./components/dataLoader/DataLoader";
import ResultsContainer from "./components/results/ResultsContainer";
import "./app.css";

function App() {
  const [reqResp, setReqResp] = useState({});

  const onDataLoadResult = (result) => {
    setReqResp({ request: undefined, result });
  };

  const onFormSubmit = (request) => {
    setReqResp({ request, result: undefined });
  };

  const { request, result } = reqResp;
  let resultsClassnames = "animate__animated";
  if (request && !result) {
    resultsClassnames = `${resultsClassnames} animate__slideOutDown`;
  } else if (result) {
    resultsClassnames = `${resultsClassnames}  animate__slideInUp`;
  }

  return (
    <div className="app-container">
      <h1>Address Analyzer</h1>
      <div className="app-content">
        <Container maxWidth="md">
          <Paper elevation={5}>
            <InputForm doSubmit={onFormSubmit} />
          </Paper>
        </Container>
        {request && !result && (
          <DataLoader
            onDataLoadResult={onDataLoadResult}
            requestPayload={request}
          />
        )}
        <ResultsContainer
          classNames={resultsClassnames}
          resultPayload={result}
        />
      </div>
    </div>
  );
}

export default App;
