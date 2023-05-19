from typing import Any, Dict

import uuid
from dataclasses import dataclass, field


def generate_id():
    return str(uuid.uuid4())


@dataclass
class Politician:
    id: str = field(default_factory=generate_id)
    full_name: str = ""  # NOMBRE
    political_party: str = ""  # PARTIDO
    political_party_for_filter: str = ""  # PARTIDO_PARA_FILTRO
    gender: str = ""  # GENERO
    position: str = ""  # CARGO
    position_for_filter: str = ""  # CARGO_PARA_FILTRO
    institution: str = ""  # INSTITUCION
    ccaa: str = ""  # CCAA
    base_salary: float = 0  # SUELDOBASE_SUELDO
    salary_supplements: float = 0  # COMPLEMENTOS_SUELDO
    extra_salary: float = 0  # PAGASEXTRA_SUELDO
    other_diets_and_mentions: float = 0  # OTRASDIETASEINDEMNIZACIONES_SUELDO
    triennia: float = 0  # TRIENIOS_SUELDO
    monthly_remuneration: float = 0  # RETRIBUCIONMENSUAL
    annual_remuneration: float = 0  # RETRIBUCIONANUAL
    observations: str = ""  # OBSERVACIONES

    def to_dict(self):
        return self.__dict__.copy()

    def update(self, payload: Dict[str, Any]):
        for key, val in payload.items():
            if val and hasattr(self, key):
                setattr(self, key, val)
