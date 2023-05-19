import {
  Box,
  Breadcrumbs,
  Button,
  CircularProgress,
  Container,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import AppHeader from "../components/AppHeader";
import { useNavigate, useParams } from "react-router-dom";
import { usePolitician } from "../hooks/queries/politicians";
import { Controller, useForm } from "react-hook-form";
import { usePoliticianUpdate } from "../hooks/mutations/politicians";

export default function PoliticianEdit() {
  const { politicianId } = useParams<string>();
  const { data, isLoading, isSuccess } = usePolitician(politicianId);
  const { mutate } = usePoliticianUpdate();
  const navigate = useNavigate();
  const { handleSubmit, control, setValue } = useForm({
    defaultValues: {
      fullName: "",
      politicalParty: "",
      politicalPartyForFilter: "",
      gender: "",
      position: "",
      positionForFilter: "",
      institution: "",
      ccaa: "",
      baseSalary: 0,
      salarySupplements: 0,
      extraSalary: 0,
      otherDietsAndMentions: 0,
      triennia: 0,
      monthlyRemuneration: 0,
      annualRemuneration: 0,
      observations: "",
    },
  });

  const onSubmit = (data: any) => {
    if (politicianId)
      mutate({
        politicianId,
        payload: data,
      });
    navigate("/");
  };

  if (isSuccess && data) {
    for (const key in data) {
      setValue(key, data[key]);
    }
  }

  return (
    <Container>
      <AppHeader />
      <Box sx={{ m: 4 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            Inicio
          </Link>
          <Typography color="text.primary">Detalle</Typography>
        </Breadcrumbs>
      </Box>
      {isLoading && (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      )}
      {!isLoading && data && (
        <Paper sx={{ m: 4, p: 2 }}>
          <form noValidate autoComplete="off">
            <Box sx={{ my: 2 }}>
              <Controller
                name="fullName"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label={"Nombre"} />
                )}
              />
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="gender-select-label">Género</InputLabel>
                    <Select {...field} autoWidth labelId="gender-select-label">
                      <MenuItem value="Mujer">Mujer</MenuItem>
                      <MenuItem value="Hombre">Hombre</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
            </Box>
            <Box sx={{ my: 2 }}>
              <Controller
                name="politicalParty"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label={"Partido Político"} />
                )}
              />
              <Controller
                name="position"
                control={control}
                render={({ field }) => <TextField {...field} label={"Cargo"} />}
              />

              <Controller
                name="institution"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label={"Institución"} />
                )}
              />

              <Controller
                name="ccaa"
                control={control}
                render={({ field }) => <TextField {...field} label={"CCAA"} />}
              />
            </Box>
            <Box sx={{ my: 2 }}>
              <Controller
                name="baseSalary"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label={"Salario Base"} />
                )}
              />

              <Controller
                name="salarySupplements"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label={"Complementos"} />
                )}
              />

              <Controller
                name="extraSalary"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label={"Pagas Extra"} />
                )}
              />

              <Controller
                name="otherDietsAndMentions"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={"Otras Dietas e Indemnizaciones"}
                  />
                )}
              />
            </Box>
            <Box sx={{ my: 2 }}>
              <Controller
                name="triennia"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label={"Trienios"} />
                )}
              />

              <Controller
                name="monthlyRemuneration"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label={"Retribución Mensual"} />
                )}
              />

              <Controller
                name="annualRemuneration"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label={"Retribución Anual"} />
                )}
              />
            </Box>
            <Box sx={{ my: 2 }}>
              <Controller
                name="observations"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label={"Observaciones"} />
                )}
              />
            </Box>
            <Button onClick={handleSubmit(onSubmit)}>Editar</Button>
            <Button onClick={() => navigate("/")} variant={"outlined"}>
              Cancelar
            </Button>
          </form>
        </Paper>
      )}
    </Container>
  );
}
