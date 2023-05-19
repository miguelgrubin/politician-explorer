from typing import Annotated, Dict, List, Union

from fastapi import File, Request, status
from fastapi.responses import JSONResponse

from dtos.politician import (
    PoliticianBulkResponse,
    PoliticianPaginatedResponse,
    PoliticianResponse,
    PoliticianStatsResponse,
    PoliticianUpdateRequest,
)
from errors.politician_not_found import PoliticianNotFound
from factory import App

app = App()


@app.fastapi.exception_handler(PoliticianNotFound)
async def politician_not_found_handler(request: Request, exc: PoliticianNotFound):
    return JSONResponse(
        status_code=status.HTTP_404_NOT_FOUND,
        content={"message": exc.message},
    )


@app.fastapi.get("/")
def checkhealth():
    return {"ping": "pong"}


@app.fastapi.post("/api/v1/bulk")
async def bulk_insert_politicians(file: Annotated[bytes, File()]) -> PoliticianBulkResponse:
    politicians = app.use_cases.politician_bulk_adder.execute(file)
    return PoliticianBulkResponse(file_size=len(file), inserteds_row=len(politicians))


@app.fastapi.get("/api/v1/politicians/{politician_id}")
async def view_politician(politician_id: str) -> PoliticianResponse:
    politician = app.use_cases.politician_viewer.execute(politician_id)
    return PoliticianResponse(**politician.to_dict())


@app.fastapi.patch("/api/v1/politicians/{politician_id}")
async def update_politician(
    politician_id: str, payload: PoliticianUpdateRequest
) -> PoliticianResponse:
    politician = app.use_cases.politician_updater.execute(politician_id, payload)
    return PoliticianResponse(**politician.to_dict())


@app.fastapi.delete("/api/v1/politicians/{politician_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_politician(politician_id: str):
    app.use_cases.politician_deleter.execute(politician_id)


@app.fastapi.get("/api/v1/politicians")
async def search_politicians(
    full_name: Union[str, None] = None,
    gender: Union[str, None] = None,
    political_party: Union[str, None] = None,
    skip: int = 0,
    limit: int = 20,
) -> PoliticianPaginatedResponse:
    politicians, total = app.use_cases.politician_finder.execute(
        full_name, gender, political_party, skip, limit
    )
    data: List[PoliticianResponse] = []
    for politician in politicians:
        data.append(PoliticianResponse(**politician.to_dict()))
    return PoliticianPaginatedResponse(total=total, skip=skip, limit=limit, data=data)


@app.fastapi.get("/api/v1/statistics")
async def politicians_stats() -> PoliticianStatsResponse:
    stats = app.use_cases.politician_stats_viewer.execute()
    aggregations = stats.to_dict().copy()
    aggregations.pop("top_ten_base_salaries")
    top_ten: Dict[int, PoliticianResponse] = {}
    for key, politician in stats.top_ten_base_salaries.items():
        top_ten[key] = PoliticianResponse(**politician.to_dict())
    return PoliticianStatsResponse(**aggregations, top_ten_base_salaries=top_ten)
