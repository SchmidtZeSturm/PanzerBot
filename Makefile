.ONESHELL:
SHELL := /usr/bin/env sh
ROOT_DIR:="$(shell dirname $(realpath $(firstword $(MAKEFILE_LIST))))"
.DEFAULT: help
.PHONY: help
ifndef VERBOSE
.SILENT:
endif

docker-build: docker-down
	docker-compose build

docker-down:
	docker-compose down

docker-prune: docker-down
	docker volume prune -f
	docker builder prune --all -f

docker-login:
	docker-compose run --entrypoint /bin/sh panzerbot

test:
	docker-compose run --entrypoint "yarn test" panzerbot
