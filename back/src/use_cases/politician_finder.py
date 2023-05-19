from typing import List, Tuple

from domain.politician import Politician
from repositories.politician_repository import PoliticianRepository


class PoliticianFinder:
    def __init__(
        self,
        politician_repository: PoliticianRepository,
    ) -> None:
        self.repository = politician_repository

    def execute(
        self, full_name: str, gender: str, political_party: str, skip: int, limit: int
    ) -> Tuple[List[Politician], int]:
        return self.repository.find_many(full_name, gender, political_party, skip, limit)
