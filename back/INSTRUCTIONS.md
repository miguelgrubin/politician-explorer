# INSTRUCTIONS

- `POST` - `/bulk` in order to import a CSV file
- `GET` - `/politicians` that shows a paginated list
  - It must have a param to use fuzzy finding on name
  - It must have a filter on party
  - It must have a filter on gender
- `GET` - `/politicians/:id` that gets a politician by ID
- `PATCH` - `/politicians/:id` that modifies a politician
- `DELETE` - `/politicians/:id` that removes a politician
- `GET` - `/statistics`
  - Median base salary
  - Average base salary
  - Top 10 base salaries

## Restrictions

- Do it in a seven days.
- Use Elasticsearch as DB.
- Generate a Swagger, OpenAPI or similar.

## Extra

- Unit testing
- Style and formatting
- Documentation
- Good practices
- Use Docker
