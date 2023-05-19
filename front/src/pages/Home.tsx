import {
  AccountCircle,
  Groups,
  Visibility,
  ModeEdit,
  Delete,
} from "@mui/icons-material";
import {
  Box,
  Breadcrumbs,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import AppHeader from "../components/AppHeader";
import { usePaginatedPoliticians } from "../hooks/queries/politicians";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [politicalParty, setPoliticalParty] = useState<string>("");

  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { data, isLoading } = usePaginatedPoliticians(
    { page, rowsPerPage },
    { name, gender, politicalParty }
  );

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Container>
      <AppHeader />
      <Box sx={{ m: 4 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Typography color="text.primary">Inicio</Typography>
        </Breadcrumbs>
      </Box>
      <Grid container columns={12}>
        <Grid item xs={12} m={3} xl={3}>
          <Typography variant="h6" component="h2">
            Filtros
          </Typography>
          <FormControl sx={{ my: 2 }} fullWidth>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                id="input-full-name"
                label="Nombre"
                variant="standard"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
              />
            </Box>
          </FormControl>

          <FormControl sx={{ my: 2 }} fullWidth>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <Groups sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                id="input-political-party"
                label="Partído Político"
                variant="standard"
                value={politicalParty}
                onChange={(e) => setPoliticalParty(e.target.value)}
                fullWidth
              />
            </Box>
          </FormControl>

          <FormControl sx={{ my: 2 }} fullWidth>
            <InputLabel id="gender-select-label">Género</InputLabel>
            <Select
              labelId="gender-select-label"
              id="gender-select"
              value={gender}
              label="Género"
              onChange={(e) => setGender(e.target.value)}
            >
              <MenuItem value="">Ambos</MenuItem>
              <MenuItem value="mujer">Femenino</MenuItem>
              <MenuItem value="hombre">Masculino</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} m={7} xl={7}>
          <TableContainer component={Paper}>
            <Table aria-label="custom pagination table">
              <TableBody>
                {!isLoading &&
                  data &&
                  data.data.map((row) => (
                    <TableRow key={row.fullName}>
                      <TableCell component="th" scope="row">
                        {row.fullName}
                      </TableCell>
                      <TableCell style={{ width: 160 }}>
                        {row.politicalParty}
                      </TableCell>
                      <TableCell style={{ width: 160 }} align="right">
                        {row.baseSalary} €
                      </TableCell>
                      <TableCell style={{ width: 160 }} align="right">
                        <IconButton
                          aria-label="show"
                          onClick={() => {
                            return navigate(`detail/${row.id}/`);
                          }}
                        >
                          <Visibility />
                        </IconButton>
                        <IconButton
                          aria-label="edit"
                          onClick={() => navigate(`/edit/${row.id}`)}
                        >
                          <ModeEdit />
                        </IconButton>
                        <IconButton aria-label="delete">
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 20]}
                    colSpan={3}
                    count={data?.total || 0}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    labelRowsPerPage="Filas por página"
                    SelectProps={{
                      inputProps: {
                        "aria-label": "filas por página",
                      },
                      native: true,
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
