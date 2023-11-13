init_db:
	@docker run \
		--name postgres-db \
		--rm -e POSTGRES_USER=postgres \
		-e POSTGRES_PASSWORD=0000 \
		-e POSTGRES_DB=tealicious_db \
		-v ./.tealicious-volume:/var/lib/postgresql/data \
		-p 5432:5432 -it \
		-d postgres:latest

	@docker run -d --name mongo-db -p 27017:27017 \
  		-e MONGO_INITDB_DATABASE=tealicious_db \
  		-e MONGO_INITDB_ROOT_USERNAME=tealicious_shop \
  		-e MONGO_INITDB_ROOT_PASSWORD=tealicious_shop \
  		-v ./mongodb/init.js:/docker-entrypoint-initdb.d/mongo-init.js:ro \
		-v ./.tealicious-volume:/var/lib/postgresql/data \
  		mongo:latest

rm_db:
	@sudo rm -rf .tealicious-volume
	@docker rm -f postgres-db
	@docker rm -f mongo-db

install_cli_tool:
	@sudo npm install -g dotenv-cli

# make run env=local|prod
run: 
	@dotenv -e ./env/${env}.env -- npm run dev

# make build
build:
	@npm run build

start:
	@dotenv -e ./env/${env}.env -- npm run start
 
# make db_push env=local|prod
db_push:
	@dotenv -e ./env/${env}.env -- npx --yes prisma db push

# make db_migrate env=local|prod
db_migrate:
	@dotenv -e ./env/${env}.env -- npx --yes prisma migrate dev --name init 

# make db_migrate env=local|prod
db_seed:
	@dotenv -e ./env/${env}.env -- npx --yes prisma db seed

# make prisma_studio env=local|prod
prisma_studio:
	@dotenv -e ./env/${env}.env -- npx --yes prisma studio

# make up
up:
	@MODE=${env} docker compose up -d

down:
	@docker compose down -v
	@docker rmi -f tealicious-shop