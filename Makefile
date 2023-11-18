install_pgadmin:
	@docker run -p 8000:80 \
		--name pg_admin \
        -e 'PGADMIN_DEFAULT_EMAIL=thanhphan17@gmail.com' \
        -e 'PGADMIN_DEFAULT_PASSWORD=000000' \
        -v 	./.pg_admin:/var/lib/pgadmin/data \
        -d dpage/pgadmin4

init_db:
	@docker run \
		--name postgres-db \
		-e POSTGRES_USER=postgres \
		-e POSTGRES_PASSWORD=0000 \
		-e POSTGRES_DB=tealicious_db \
		-v ./.tealicious-volume:/var/lib/postgresql/data \
		-p 5432:5432 -it \
		-d --restart unless-stopped postgres:latest

	@docker start postgres-db

	@docker run -d --name mongo-db -p 27017:27017 \
  		-e MONGO_INITDB_DATABASE=tealicious_db \
  		-e MONGO_INITDB_ROOT_USERNAME=tealicious_shop \
  		-e MONGO_INITDB_ROOT_PASSWORD=tealicious_shop \
  		-v ./mongodb/init.js:/docker-entrypoint-initdb.d/mongo-init.js:ro \
		-v ./.tealicious-volume:/var/lib/postgresql/data \
		-d --restart unless-stopped\
  		mongo:latest

	@docker start mongo-db
	
rm_db:
	@sudo rm -rf .tealicious-volume
	@docker rm -f postgres-db
	@docker rm -f mongo-db

install_cli_tool:
	@sudo npm install -g dotenv-cli

### APPLICATION COMMANDS

# make run env=local|prod
run: 
	@dotenv -e ./env/${env}.env -- npm run dev

# make build
build:
	@npm run build

start:
	@dotenv -e ./env/${env}.env -- npm run start

### DATABASE COMMANDS

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

### DOCKER COMPOSE COMMANDS

# User Acceptance Testing
uat_up:
	@docker compose -f docker-compose-uat.yml up -d

uat_down:
	@docker compose -f docker-compose-uat.yml down -v
	@docker rm -f tealicious-shop
	@docker rmi -f tealicious-shop
	@sudo rm -rf .tealicious-volume

# Production
prod_up:
	@docker compose -f docker-compose-prod.yml up --detach

prod_down:
	@docker compose -f docker-compose-prod.yml down -v
	@docker rm -f tealicious-shop
	@docker rmi -f tealicious-shop
