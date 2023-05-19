import { Troubleshoot } from "@mui/icons-material";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";

export default function AppHeader() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Troubleshoot sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Politician Explorer
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
