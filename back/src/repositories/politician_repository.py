from typing import Dict, List, Optional, Tuple

import abc

from elasticsearch import Elasticsearch

from config import ELASTICSEARCH_HOST, get_config
from domain.politician import Politician
from domain.politician_stats import PoliticianStats


class PoliticianRepository(abc.ABC):
    def __init__(self) -> None:
        pass

    @abc.abstractmethod
    def bulk_add(self, politicians: List[Politician]):
        pass

    @abc.abstractmethod
    def find_one(self, politician_id: str) -> Optional[Politician]:
        pass

    @abc.abstractmethod
    def find_many(
        self, name: str, gender: str, political_party: str, skip: int, limit: int
    ) -> Tuple[List[Politician], int]:
        pass

    @abc.abstractmethod
    def save(self, politician: Politician):
        pass

    @abc.abstractmethod
    def delete(self, politician_id: str):
        pass

    @abc.abstractmethod
    def stats(self) -> PoliticianStats:
        pass


class PoliticianRepositoryElasticsearch(PoliticianRepository):
    def __init__(self) -> None:
        config = get_config()
        self.es_client = Elasticsearch(hosts=[config.get(ELASTICSEARCH_HOST)])
        self.index_name = "politicians"

    def bulk_add(self, politicians: List[Politician]):
        actions = []
        for row in politicians:
            action = {"index": {"_index": self.index_name, "_id": row.id}}
            doc = row.to_dict()
            actions.append(action)
            actions.append(doc)

        self.es_client.bulk(actions, index=self.index_name)

    def find_one(self, politician_id: str) -> Optional[Politician]:
        try:
            res = self.es_client.get(index=self.index_name, id=politician_id)
            return Politician(**res["_source"])
        except:
            return None

    def find_many(
        self, name: str, gender: str, political_party: str, skip: int, limit: int
    ) -> Tuple[List[Politician], int]:
        query = {"bool": {}}
        filters = []
        if name:
            query["bool"]["must"] = [
                {
                    "match": {
                        "full_name": {
                            "query": name.lower(),
                            "fuzziness": "AUTO",
                        }
                    }
                }
            ]

        if gender:
            filters.append({"term": {"gender": gender.lower()}})
        if political_party:
            filters.append({"term": {"political_party": political_party.lower()}})

        if filters:
            query["bool"]["filter"] = filters

        res = self.es_client.search(index=self.index_name, query=query, from_=skip, size=limit)

        result: List[Politician] = []
        total = res["hits"]["total"]["value"]
        for hit in res["hits"]["hits"]:
            result.append(Politician(**hit["_source"]))

        return result, total

    def save(self, politician: Politician):
        self.es_client.index(index=self.index_name, id=politician.id, document=politician.to_dict())
        self.es_client.indices.refresh(index=self.index_name)

    def delete(self, politician_id: str):
        self.es_client.delete(index=self.index_name, id=politician_id)

    def stats(self) -> PoliticianStats:
        query = {
            "bool": {
                "filter": [
                    {"range": {"base_salary": {"gt": 0}}},
                ],
            },
        }
        sort = [{"base_salary": "desc"}]
        aggs = {
            "avg_base_salary": {"avg": {"field": "base_salary"}},
            "base_salary_variability": {"median_absolute_deviation": {"field": "base_salary"}},
            "base_salary_median": {"percentiles": {"field": "base_salary", "percents": [50]}},
        }
        res = self.es_client.search(
            index=self.index_name, query=query, size=10, sort=sort, aggs=aggs
        )

        top_ten: Dict[int, PoliticianStats] = {}
        i = 0
        for hit in res["hits"]["hits"]:
            i += 1
            top_ten[i] = Politician(**hit["_source"])
        aggregations = {
            "median_base_salary": res["aggregations"]["base_salary_median"]["values"]["50.0"],
            "average_base_salary": res["aggregations"]["avg_base_salary"]["value"],
            "base_salary_variability": res["aggregations"]["base_salary_variability"]["value"],
        }
        return PoliticianStats(**aggregations, top_ten_base_salaries=top_ten)
