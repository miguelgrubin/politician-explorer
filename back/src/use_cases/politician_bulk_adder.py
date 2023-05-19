from typing import List

from domain.politician import Politician
from repositories.politician_repository import PoliticianRepository
from services.extractor_service import ExtractorService


class PoliticianBulkAdder:
    def __init__(
        self,
        extractor_service: ExtractorService,
        politician_repository: PoliticianRepository,
    ) -> None:
        self.extractor = extractor_service
        self.repository = politician_repository

    def execute(self, csv_bytes: bytes) -> List[Politician]:
        politicians = self.extractor.execute(csv_bytes)
        self.repository.bulk_add(politicians)
        return politicians
