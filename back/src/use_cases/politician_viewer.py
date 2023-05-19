from domain.politician import Politician
from errors.politician_not_found import PoliticianNotFound
from repositories.politician_repository import PoliticianRepository


class PoliticianViewer:
    def __init__(
        self,
        politician_repository: PoliticianRepository,
    ) -> None:
        self.repository = politician_repository

    def execute(self, politician_id: str) -> Politician:
        politician = self.repository.find_one(politician_id)
        if not politician:
            raise PoliticianNotFound(politician_id)

        return politician
