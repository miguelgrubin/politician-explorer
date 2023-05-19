import {
  Box,
  Breadcrumbs,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Link,
  Paper,
  Typography,
} from "@mui/material";
import { Female, Male } from "@mui/icons-material";
import AppHeader from "../components/AppHeader";
import { useParams } from "react-router-dom";
import { usePolitician } from "../hooks/queries/politicians";

export default function PoliticianDetail() {
  const { politicianId } = useParams<string>();
  const { data, isLoading } = usePolitician(politicianId);

  const formatter = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  });

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
          <Typography variant="h6" component="h2">
            {data.fullName}
            {data.gender == "Mujer" ? <Female /> : <Male />}
          </Typography>
          <Divider />
          <Grid container>
            <Grid item xs={6} md={6}>
              <dl>
                <dt>Partido Político:</dt>
                <dd>{data.politicalParty}</dd>

                <dt>Cargo:</dt>
                <dd>{data.position}</dd>

                <dt>Institución:</dt>
                <dd>{data.institution}</dd>

                <dt>CCAA:</dt>
                <dd>{data.ccaa}</dd>

                <dt>Observaciones:</dt>
                <dd>{data.observations}</dd>

                <dt>Salario Base:</dt>
                <dd>{formatter.format(data.baseSalary || 0)}</dd>
              </dl>
            </Grid>
            <Grid item xs={6} md={6}>
              <dl>
                <dt>Complementos:</dt>
                <dd>{formatter.format(data.salarySupplements || 0)}</dd>

                <dt>Pagas Extra:</dt>
                <dd>{formatter.format(data.extraSalary || 0)}</dd>

                <dt>Otras Dietas e Indemnizaciones:</dt>
                <dd>{formatter.format(data.otherDietsAndMentions || 0)}</dd>

                <dt>Trienios:</dt>
                <dd>{formatter.format(data.triennia || 0)}</dd>

                <dt>Retribución Mensual:</dt>
                <dd>{formatter.format(data.monthlyRemuneration || 0)}</dd>

                <dt>Retribución Anual:</dt>
                <dd>{formatter.format(data.annualRemuneration || 0)}</dd>
              </dl>
            </Grid>
          </Grid>
        </Paper>
      )}
    </Container>
  );
}
