from repositories.politician_repository import PoliticianRepository
from src.domain.politician_stats import PoliticianStats


class PoliticianStatsViewer:
    def __init__(
        self,
        politician_repository: PoliticianRepository,
    ) -> None:
        self.repository = politician_repository

    def execute(self) -> PoliticianStats:
        politician_stats = self.repository.stats()

        return politician_stats
