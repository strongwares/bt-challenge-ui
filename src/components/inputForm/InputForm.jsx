import { useState } from "react";
import PropTypes from "prop-types";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./inputform.css";

function InputForm({ doSubmit }) {
  const [addresses, setAddresses] = useState("");
  const [addressesError, setAddressesError] = useState("");

  const [addressType, setAddressType] = useState("btc");

  const [apiKey, setApiKey] = useState("");
  const [apiKeyError, setApiKeyError] = useState("");

  const [rand, setRand] = useState("");
  const [randError, setRandError] = useState("");

  const [submitError, setSubmitError] = useState("");

  const onAddressesChange = ({ target }) => {
    const { value } = target;
    setAddresses(value);
    if (value) {
      setAddressesError("");
    } else {
      setAddressesError("Addresses Are Required");
    }
  };

  const onAddressTypeChange = ({ target }) => {
    setAddressType(target.value);
  };

  const onApiKeyChange = ({ target }) => {
    const { value } = target;
    setApiKey(value);
    if (value) {
      setApiKeyError("");
    } else {
      setApiKeyError("API Key Is Required");
    }
  };

  const onRandChange = ({ target }) => {
    const { value } = target;
    setRand(value);
    if (value) {
      setRandError("");
    } else {
      setRandError("Random Number Is Required");
    }
  };

  const onSubmitClick = (e) => {
    e.preventDefault();
    let canSubmit = true;
    let submitError = "";

    if (!apiKey) {
      if (!apiKeyError) {
        setApiKeyError("API Key Is Required");
      }
      submitError = "API Key Is Required";
      canSubmit = false;
    }

    if (!rand) {
      if (!randError) {
        setRandError("Random Numbers Are Required");
      }
      submitError = submitError
        ? `${submitError} and Random Numbers Are Required`
        : "Random Numbers Are Required";
      canSubmit = false;
    }

    if (!addresses) {
      if (!addressesError) {
        setAddressesError("Addresses Are Required");
      }
      submitError = submitError
        ? `${submitError} and Addresses Are Required`
        : "Addresses Are Required";
      canSubmit = false;
    }
    setSubmitError(submitError);

    if (!canSubmit) {
      return;
    }

    const addressList = [];
    addresses.split("\n").forEach((line) => {
      if (line.indexOf(",") >= 0) {
        const addrs = line.split(",");
        addrs.forEach((addrEle) => {
          const addr = addrEle.trim();
          if (addr && !addressList.includes(addr)) {
            addressList.push(addr);
          }
        });
      } else {
        const addr = line.trim();
        if (addr && !addressList.includes(addr)) {
          addressList.push(addr);
        }
      }
    });
    doSubmit({ addressList, addressType, apiKey, randomNumbers: rand });
  };

  return (
    <div className="input-form-container">
      <div className="input-form-body">
        <div className="input-form-elements">
          <h3>Address Type:</h3>
          <Select
            autoComplete="new-password"
            fullWidth
            id="addressType"
            onChange={onAddressTypeChange}
            size="small"
            value={addressType}
          >
            <MenuItem value="btc">btc</MenuItem>
            <MenuItem value="eth">eth</MenuItem>
          </Select>

          <h3>API Key:</h3>
          <TextField
            autoComplete="new-password"
            error={!!apiKeyError}
            fullWidth
            id="apiKey"
            label={apiKeyError}
            onChange={onApiKeyChange}
            required
            size="small"
            type="text"
            value={apiKey}
          />

          <h3>Random Numbers:</h3>
          <TextField
            autoComplete="new-password"
            error={!!randError}
            fullWidth
            id="randomNumbers"
            label={randError}
            onChange={onRandChange}
            required
            size="small"
            type="text"
            value={rand}
          />
        </div>

        <div className="input-form-elements">
          <h2>Addresses:</h2>
          <TextField
            autoComplete="new-password"
            error={!!addressesError}
            fullWidth
            id="addresses"
            label={addressesError}
            minRows={5}
            maxRows={5}
            multiline
            onChange={onAddressesChange}
            required
            asx={{ margin: "-10px 10px 0px 10px" }}
          />
        </div>
      </div>

      <div style={{ margin: "auto" }}>
        <Button
          onClick={onSubmitClick}
          sx={{ width: "100px" }}
          title={submitError}
          variant="outlined"
        >
          Submit
        </Button>
      </div>
    </div>
  );
}

InputForm.propTypes = {
  doSubmit: PropTypes.func.isRequired,
};

export default InputForm;
