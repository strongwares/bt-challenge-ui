import { useEffect } from "react";

const url = "https://localhost:8090/analyze/v1";
// const url = "/analyze/v1";

export default function useAnalyzeAddressRequest(
  payload,
  resultCallback,
  abortTimeout = 0
) {
  // On a possibly too long running request,
  // provide a timeout mechanism to cancel an
  // in flight request:
  let signal;
  let timeoutId;
  if (abortTimeout) {
    const controller = new AbortController();
    ({ signal } = controller);
    timeoutId = window.setTimeout(() => {
      timeoutId = undefined;
      controller.abort();
    }, abortTimeout);
  }

  const fetchData = async (payload) => {
    try {
      const response = await fetch(url, {
        body: JSON.stringify(payload),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Cache-Control": "private, no-cache, no-store, must-revalidate",
          "Last-Modified": new Date().toUTCString(),
        },
        method: "POST",
        signal,
      });
      const json = await response.json();
      const { status } = response;

      if (status < 400) {
        resultCallback({
          data: json.results,
          success: true,
          message: "Success",
        });
      } else {
        const { error, message } = json;
        let fetchError;
        if (message) {
          fetchError = message;
        } else if (error) {
          fetchError = error;
        }

        let msg = fetchError;
        if (status) {
          msg = `${msg} (${status})`;
        }
        resultCallback({
          message: msg,
          success: false,
        });
      }
    } catch (error) {
      const { message } = error;
      let msg = message;
      if (message.indexOf("aborted") >= 0) {
        msg = "Request taking to long, was aborted";
      }
      resultCallback({
        message: msg,
        success: false,
      });
    } finally {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
        timeoutId = undefined;
      }
    }
  };

  useEffect(() => {
    fetchData(payload);
  }, [fetchData, payload]);

  return [];
}
