init_db:
	@`

	@docker run -d --name mongo-db -p 27017:27017 \
  		-e MONGO_INITDB_DATABASE=tealicious_db \
  		-e MONGO_INITDB_ROOT_USERNAME=tealicious_shop \
  		-e MONGO_INITDB_ROOT_PASSWORD=tealicious_shop \
  		-v ./mongodb/init.js:/docker-entrypoint-initdb.d/mongo-init.js:ro \
		-v ./.tealicious-volume:/var/lib/postgresql/data \
  		mongo:4.4.6

rm_db:
	@sudo rm -rf .tealicious-volume
	@docker rm -f postgres-db
	@docker rm -f mongo-db

install_cli_tool:
	@sudo npm install -g dotenv-cli

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
	@MODE=${env} docker compose up -d

down:
	@docker compose down -v
	@docker rmi -f tealicious-shop