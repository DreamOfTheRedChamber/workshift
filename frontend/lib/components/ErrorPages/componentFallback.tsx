import { FallbackProps } from "react-error-boundary";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

export const ComponentFallback: React.FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  return (
    <>
      <Alert severity="error">
        <AlertTitle>
          Something went wrong. Fallback into closet error boundary.
        </AlertTitle>
        {error.message}
      </Alert>
    </>
  );
};

export const LogFallbackErrors = (error: Error, info: React.ErrorInfo) => {
  console.error("Caught an error:", error, info);
};
