from typing import List

from collections import OrderedDict
from io import BytesIO

import pandas as pd

import numpy as np
from domain.politician import Politician

SUELDOBASE_SUELDO = "SUELDOBASE_SUELDO"
COMPLEMENTOS_SUELDO = "COMPLEMENTOS_SUELDO"
PAGASEXTRA_SUELDO = "PAGASEXTRA_SUELDO"
OTRASDIETASEINDEMNIZACIONES_SUELDO = "OTRASDIETASEINDEMNIZACIONES_SUELDO"
TRIENIOS_SUELDO = "TRIENIOS_SUELDO"
RETRIBUCIONMENSUAL = "RETRIBUCIONMENSUAL"
RETRIBUCIONANUAL = "RETRIBUCIONANUAL"


class ExtractorService:
    @staticmethod
    def execute(csv_bytes: bytes) -> List[Politician]:
        df = pd.read_csv(BytesIO(csv_bytes), encoding="utf8", sep=";").replace({np.nan: "0"})
        df[SUELDOBASE_SUELDO] = df.apply(
            lambda row: float(str(row[SUELDOBASE_SUELDO]).replace(",", ".")), axis=1
        )
        df[COMPLEMENTOS_SUELDO] = df.apply(
            lambda row: float(str(row[COMPLEMENTOS_SUELDO]).replace(",", ".")), axis=1
        )
        df[PAGASEXTRA_SUELDO] = df.apply(
            lambda row: float(str(row[PAGASEXTRA_SUELDO]).replace(",", ".")), axis=1
        )
        df[OTRASDIETASEINDEMNIZACIONES_SUELDO] = df.apply(
            lambda row: float(str(row[OTRASDIETASEINDEMNIZACIONES_SUELDO]).replace(",", ".")),
            axis=1,
        )
        df[TRIENIOS_SUELDO] = df.apply(
            lambda row: float(str(row[TRIENIOS_SUELDO]).replace(",", ".")), axis=1
        )
        df[RETRIBUCIONMENSUAL] = df.apply(
            lambda row: float(str(row[RETRIBUCIONMENSUAL]).replace(",", ".")), axis=1
        )
        df[RETRIBUCIONANUAL] = df.apply(
            lambda row: float(str(row[RETRIBUCIONANUAL]).replace(",", ".")), axis=1
        )

        politicians: List[Politician] = []
        for _, row in df.to_dict("index", into=OrderedDict).items():
            politicians.append(
                Politician(
                    full_name=row.get("NOMBRE"),
                    political_party=row.get("PARTIDO"),
                    political_party_for_filter=row.get("PARTIDO_PARA_FILTRO"),
                    gender=row.get("GENERO"),
                    position=row.get("CARGO"),
                    position_for_filter=row.get("CARGO_PARA_FILTRO"),
                    institution=row.get("INSTITUCION"),
                    ccaa=row.get("CCAA"),
                    base_salary=row.get("SUELDOBASE_SUELDO"),
                    salary_supplements=row.get("COMPLEMENTOS_SUELDO"),
                    extra_salary=row.get("PAGASEXTRA_SUELDO"),
                    other_diets_and_mentions=row.get("OTRASDIETASEINDEMNIZACIONES_SUELDO"),
                    triennia=row.get("TRIENIOS_SUELDO"),
                    monthly_remuneration=row.get("RETRIBUCIONMENSUAL"),
                    annual_remuneration=row.get("RETRIBUCIONANUAL"),
                    observations=row.get("OBSERVACIONES"),
                )
            )
        return politicians
