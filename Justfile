# Task orchestration

set shell := ["bash", "-cu"]

default:
	@just --list

install:
	npm install

test:
	npm test

lint:
	npm run lint

format:
	npm run format

render:
	npm run render:license && npm run render:readme && npm run render:roadmap

ci:
	npm ci && just render && npm test && npm run lint
