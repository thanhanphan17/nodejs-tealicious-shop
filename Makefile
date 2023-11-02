init_db:
	@docker run \
		--name postgres-db \
		--rm -e POSTGRES_USER=postgres \
		-e POSTGRES_PASSWORD=0000 \
		-e POSTGRES_DB=tealicious_db \
		-v ./.tealicious-volume:/var/lib/postgresql/data \
		-p 5432:5432 -it \
		-d postgres:latest

install_cli_tool:
	@sudo npm install -g dotenv-cli

# remove 
rm_db:
	@sudo rm -rf .tealicious-volume
	@docker rm -f postgres-db

# make run env=local|prod
run: 
	@dotenv -e ./env/${env}.env -- npm run dev

start:
	@dotenv -e ./env/${env}.env -- npm run start

# make db_push env=local|prod
db_push:
	@dotenv -e ./env/${env}.env -- npx prisma db push

# make db_migrate env=local|prod
db_migrate:
	@dotenv -e ./env/${env}.env -- npx prisma migrate dev --name init

# make prisma_studio env=local|prod
prisma_studio:
	@dotenv -e ./env/${env}.env -- npx prisma studio

# make up
up:
	@docker compose up -d

down:
	@docker compose down -v
	@docker rmi -f tealicious-shop