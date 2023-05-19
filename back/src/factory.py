from fastapi import FastAPI

from repositories.politician_repository import (
    PoliticianRepository,
    PoliticianRepositoryElasticsearch,
)
from services.extractor_service import ExtractorService
from use_cases.politician_stats_viewer import PoliticianStatsViewer
from use_cases.politician_bulk_adder import PoliticianBulkAdder
from use_cases.politician_deleter import PoliticianDeleter
from use_cases.politician_finder import PoliticianFinder
from use_cases.politician_updater import PoliticianUpdater
from use_cases.politician_viewer import PoliticianViewer


class Repositories:
    politician: PoliticianRepository

    def __init__(self) -> None:
        self.politician = PoliticianRepositoryElasticsearch()


class Services:
    extractor: ExtractorService

    def __init__(self) -> None:
        self.extractor = ExtractorService


class UseCases:
    politician_bulk_adder: PoliticianBulkAdder
    politician_viewer: PoliticianViewer
    politician_finder: PoliticianFinder
    politician_updater: PoliticianUpdater
    politician_deleter: PoliticianDeleter
    politician_stats_viewer: PoliticianStatsViewer

    def __init__(self, services: Services, repositories: Repositories) -> None:
        self.politician_bulk_adder = PoliticianBulkAdder(
            services.extractor, repositories.politician
        )
        self.politician_viewer = PoliticianViewer(repositories.politician)
        self.politician_finder = PoliticianFinder(repositories.politician)
        self.politician_updater = PoliticianUpdater(repositories.politician)
        self.politician_deleter = PoliticianDeleter(repositories.politician)
        self.politician_stats_viewer = PoliticianStatsViewer(repositories.politician)


class App:
    services: Services
    repositories: Repositories
    use_cases: UseCases
    fastapi: FastAPI

    def __init__(self) -> None:
        self.services = Services()
        self.repositories = Repositories()
        self.use_cases = UseCases(self.services, self.repositories)
        self.fastapi = FastAPI()
