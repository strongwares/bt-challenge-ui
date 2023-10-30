import React from "react";
import PropTypes from "prop-types";
import { DataGrid } from "@mui/x-data-grid";
import ResultsBarChart from "./ResultsBarChart";
import "./results.css";

const columns = [
  {
    field: "address",
    headerName: "Address",
    width: 150,
    editable: false,
  },
  {
    field: "addressName",
    headerName: "Address Name",
    width: 150,
    editable: false,
  },
  {
    field: "addressType",
    headerName: "Address Type",
    width: 110,
    editable: false,
  },
  {
    field: "balance",
    headerName: "Balance",
    type: "number",
    width: 160,
  },
  {
    field: "totalSent",
    headerName: "Total Sent",
    type: "number",
    width: 160,
  },
  {
    field: "totalReceived",
    headerName: "Total Received",
    type: "number",
    width: 160,
  },
  {
    field: "riskScore",
    headerName: "Risk Score",
    type: "number",
    width: 160,
  },
];

// If we wanted pagination, these are the mui grid props
// to support that:
/*
initialState={{
    pagination: {
      paginationModel: {
        pageSize: 5,
      },
    },
  }}
  pageSizeOptions={[5]}
  checkboxSelection
  disableRowSelectionOnClick
*/

function ResultsContainer({ classNames, resultPayload }) {
  const { data = [], message, success } = resultPayload;

  let numRows = "";
  if (success) {
    numRows = `${data.length} Row${data.length === 1 ? "" : "s"}`;
  }

  const noRowsOverlay = () => {
    let msg = "No data";
    if (success && !data) {
      msg = "No data was loaded";
    } else if (!success && message) {
      msg = message;
    }
    return (
      <div style={{ paddingTop: "20px" }}>
        <h3>{msg}</h3>
      </div>
    );
  };

  return (
    <div className={`${classNames} results-container`}>
      <h2>{`Results: ${numRows}`}</h2>
      <div className="results-content">
        <div className="results-table">
          <DataGrid
            columns={columns}
            hideFooterPagination
            hideFooter
            rows={data}
            slots={{
              noRowsOverlay,
            }}
          />
        </div>
        <ResultsBarChart data={data} />
      </div>
    </div>
  );
}

ResultsContainer.propTypes = {
  classNames: PropTypes.string,
  resultPayload: PropTypes.shape({
    data: PropTypes.array,
    message: PropTypes.string,
    success: PropTypes.bool,
    timeout: PropTypes.bool,
  }),
};

ResultsContainer.defaultProps = {
  classNames: "",
  resultPayload: {},
};

export default ResultsContainer;
