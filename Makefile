.ONESHELL:
SHELL:= /usr/bin/env sh
ROOT_DIR:="$(shell dirname $(realpath $(firstword $(MAKEFILE_LIST))))"
.DEFAULT: help
.PHONY: help
ifndef VERBOSE
.SILENT:
endif

docker-build: docker-down
	DOCKER_BUILDKIT=0 docker-compose build --no-cache

docker-down:
	docker-compose down

docker-prune: docker-down
	docker volume prune -f
	docker builder prune --all -f

docker-up:
	docker-compose up

docker-login:
	docker-compose run --entrypoint /bin/sh panzerbot

upgrade:
	docker-compose run --entrypoint "yarn upgrade" panzerbot

test:
	docker-compose run --entrypoint "yarn jest --coverage" panzerbot

compile:
	docker-compose run --entrypoint "yarn compile" panzerbot

jaaa: docker-build compile docker-up
