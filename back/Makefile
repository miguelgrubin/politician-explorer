.PHONY: audit
audit:
	safety check

.PHONY: format
format:
	isort --settings-path pyproject.toml .
	black --config pyproject.toml ./

.PHONY: test
test:
	pytest tests

.PHONY: coverage
coverage:
	coverage run -m pytest
	coverage report
	coverage html

.PHONY: lint
lint:
	PYTHONPATH=./src pylint ./src

.PHONY: start
start:
	PYTHONPATH=./src uvicorn  main:app.fastapi --reload --host 0.0.0.0 --port 3000

.PHONY: clean
clean: clean-pyc clean-test clean-build

## Remove Python file artifacts
clean-pyc:
	find . -name '*.pyc' -not -path "./venv/*" -exec rm -f {} +
	find . -name '*.pyo' -not -path "./venv/*" -exec rm -f {} +
	find . -name '*~' -not -path "./venv/*" -exec rm -f {} +
	find . -name '__pycache__' -exec rm -fr {} +

## Remove test and coverage artifacts
clean-test:
	rm -fr .tox/
	rm -f .coverage
	rm -f coverage.xml
	rm -f pytest.xml
	rm -f pylint-report.txt
	rm -fr htmlcov/
	rm -fr .pytest_cache

## Remove build artifacts
clean-build:
	rm -fr build
	rm -fr *.egg-info
