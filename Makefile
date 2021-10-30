include .env
export

PRISMA_SCHEMA="--schema=./src/database/schema.prisma"
db-push:
	DATABASE_URL=${DATABASE_MIGRATE_URL} yarn prisma db push ${PRISMA_SCHEMA}

db-generate: 
	DATABASE_URL=${DATABASE_URL} PRISMA_CLIENT_ENGINE_TYPE='dataproxy' yarn prisma generate ${PRISMA_SCHEMA}

db-migrate:
	DATABASE_URL=${DATABASE_MIGRATE_URL} PRISMA_CLIENT_ENGINE_TYPE='dataproxy' yarn prisma migrate deploy ${PRISMA_SCHEMA}


db-pull:
	DATABASE_URL=${DATABASE_MIGRATE_URL} yarn prisma db pull ${PRISMA_SCHEMA}