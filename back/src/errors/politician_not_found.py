from errors.base_error import BaseError


class PoliticianNotFound(BaseError):
    def __init__(self, politician_id: str) -> None:
        super().__init__(f"Politician with ID {politician_id} not found.")
        self.politician_id = politician_id
