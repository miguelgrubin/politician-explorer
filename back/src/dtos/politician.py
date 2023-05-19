from re import sub
from typing import Dict, List, Optional

from pydantic import BaseModel


class PoliticianBulkResponse(BaseModel):
    file_size: int
    inserteds_row: int


class PoliticianResponse(BaseModel):
    id: Optional[str]
    full_name: Optional[str]
    political_party: Optional[str]
    political_party_for_filter: Optional[str]
    gender: Optional[str]
    position: Optional[str]
    position_for_filter: Optional[str]
    institution: Optional[str]
    ccaa: Optional[str]
    base_salary: Optional[float]
    salary_supplements: Optional[float]
    extra_salary: Optional[float]
    other_diets_and_mentions: Optional[float]
    triennia: Optional[float]
    monthly_remuneration: Optional[float]
    annual_remuneration: Optional[float]
    observations: Optional[str]


class PoliticianUpdateRequest(BaseModel):
    full_name: Optional[str] = None
    political_party: Optional[str] = None
    political_party_for_filter: Optional[str] = None
    gender: Optional[str] = None
    position: Optional[str] = None
    position_for_filter: Optional[str] = None
    institution: Optional[str] = None
    ccaa: Optional[str] = None
    base_salary: Optional[float] = None
    salary_supplements: Optional[float] = None
    extra_salary: Optional[float] = None
    other_diets_and_mentions: Optional[float] = None
    triennia: Optional[float] = None
    monthly_remuneration: Optional[float] = None
    annual_remuneration: Optional[float] = None
    observations: Optional[str] = None


class PoliticianPaginatedResponse(BaseModel):
    total: int
    skip: int
    limit: int
    data: List[PoliticianResponse]


class PoliticianStatsResponse(BaseModel):
    median_base_salary: float
    average_base_salary: float
    base_salary_variability: float
    top_ten_base_salaries: Dict[int, PoliticianResponse]
