import { Box, Container } from "@mui/material";
import AppHeader from "../components/AppHeader";

const Statistics: React.FC = () => {
  return (
    <Container>
      <AppHeader />
      <Box sx={{ mx: 4 }}>
        <h1>Statistics!</h1>
      </Box>
    </Container>
  );
};

export default Statistics;
