from errors.politician_not_found import PoliticianNotFound
from repositories.politician_repository import PoliticianRepository


class PoliticianDeleter:
    def __init__(
        self,
        politician_repository: PoliticianRepository,
    ) -> None:
        self.repository = politician_repository

    def execute(self, politician_id: str):
        politician = self.repository.find_one(politician_id)
        if not politician:
            raise PoliticianNotFound(politician_id)

        self.repository.delete(politician_id)
