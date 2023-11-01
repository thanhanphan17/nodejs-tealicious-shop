# make run env=local|prod
run: 
	@dotenv -f env/${env}.env run npm run dev

# make db_push env=local|prod
db_push:
	@dotenv -f ./env/${env}.env run npx prisma db push

# make db_migrate env=local|prod
db_migrate:
	@dotenv -f ./env/${env}.env run npx prisma migrate dev --name init

# make prisma_studio env=local|prod
prisma_studio:
	@dotenv -f ./env/${env}.env run npx prisma studio