import { Box, Container } from "@mui/material";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import AppHeader from "../components/AppHeader";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  if (isRouteErrorResponse(error)) {
    return (
      <Container>
        <AppHeader />
        <Box sx={{ mx: 4 }}>
          <h1>Oops!</h1>
          <h2>{error.status}</h2>
          <p>{error.statusText}</p>
          {error.data?.message && <p>{error.data.message}</p>}
        </Box>
      </Container>
    );
  } else {
    return <div>Oops</div>;
  }
}
