init_db:
	@docker run \
		--name postgres-db \
		--rm -e POSTGRES_USER=postgres \
		-e POSTGRES_PASSWORD=0000 \
		-e POSTGRES_DB=tealicious_db \
		-v ./.tealicious-volume:/var/lib/postgresql/data \
		-p 5432:5432 -it \
		-d postgres:latest
rm_db:
	@sudo rm -rf .tealicious-volume
	@docker rm -f postgres-db

# make run env=local|prod
run: 
	@NODE_ENV=${env} npm run dev

# make db_push env=local|prod
db_push:
	@dotenv -f ./env/${env}.env run npx prisma db push

# make db_migrate env=local|prod
db_migrate:
	@dotenv -f ./env/${env}.env run npx prisma migrate dev --name init

# make prisma_studio env=local|prod
prisma_studio:
	@dotenv -f ./env/${env}.env run npx prisma studio