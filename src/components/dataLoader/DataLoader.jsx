import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Fade from "@mui/material/Fade";
import useAnalyzeAddressRequest from "../../hooks/useAnalyzeAddressRequest";

function DataLoader({ onDataLoadResult, requestPayload }) {
  // Bail out after 30 seconds: 30000
  // If no third value provided to this hook, we'll keep waiting...
  useAnalyzeAddressRequest(requestPayload, onDataLoadResult, 30000);

  // This shows a spinner only after a short delay:
  // UX design indicates users need feedback only after about a second:
  return (
    <Box sx={{ height: 40 }}>
      <Fade
        in={true}
        style={{
          transitionDelay: "800ms",
        }}
        unmountOnExit
      >
        <CircularProgress />
      </Fade>
    </Box>
  );
}

DataLoader.propTypes = {
  onDataLoadResult: PropTypes.func.isRequired,
  requestPayload: PropTypes.shape({
    addressList: PropTypes.arrayOf(PropTypes.string),
    addressType: PropTypes.string,
    apiKey: PropTypes.string,
  }),
};

DataLoader.defaultProps = {
  requestPayload: undefined,
};

export default DataLoader;
