from domain.politician import Politician
from dtos.politician import PoliticianUpdateRequest
from errors.politician_not_found import PoliticianNotFound
from repositories.politician_repository import PoliticianRepository


class PoliticianUpdater:
    def __init__(
        self,
        politician_repository: PoliticianRepository,
    ) -> None:
        self.repository = politician_repository

    def execute(self, politician_id: str, payload: PoliticianUpdateRequest) -> Politician:
        politician = self.repository.find_one(politician_id)
        if not politician:
            raise PoliticianNotFound(politician_id)

        politician.update(payload.dict())
        self.repository.save(politician)
        return politician
