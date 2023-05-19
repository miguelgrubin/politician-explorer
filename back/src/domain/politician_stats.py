from dataclasses import dataclass
from typing import Dict

from domain.politician import Politician


@dataclass
class PoliticianStats:
    median_base_salary: float
    average_base_salary: float
    base_salary_variability: float
    top_ten_base_salaries: Dict[int, Politician]

    def to_dict(self):
        return self.__dict__.copy()
