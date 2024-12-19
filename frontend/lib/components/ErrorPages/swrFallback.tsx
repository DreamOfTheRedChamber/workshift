import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { GenericResponseModel } from "../../services/genericResponseModel";

export function shouldRenderErrorPages<T>(
  data: GenericResponseModel<T> | undefined,
  isLoading: boolean,
  error: Error | undefined
) {
  return (
    isLoading ||
    data?.succeed == false ||
    data == undefined ||
    data.data == undefined ||
    error != undefined
  );
}

export function renderErrorPages<T>(
  data: GenericResponseModel<T> | undefined,
  isLoading: boolean,
  error: Error | undefined
) {
  if (isLoading) {
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    );
  } else if (data == undefined || data.data == undefined) {
    return (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        Response body is empty and error is not set in SWR response.
      </Alert>
    );
  } else if (data.succeed == false) {
    return (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {data.message}:{data.messageDetail}.
      </Alert>
    );
  } else if (error != undefined) {
    return (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {error.message}
        {error.stack}
      </Alert>
    );
  } else {
    return (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        This should not happen.
      </Alert>
    );
  }
}
