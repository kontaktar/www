include .env
export

PRISMA_SCHEMA="--schema=./src/database/schema.prisma"

db-generate: 
	DATABASE_URL=${DATABASE_PROXY_URL} PRISMA_CLIENT_ENGINE_TYPE='dataproxy' yarn prisma generate

db-migrate:
	DATABASE_URL=${DATABASE_MIGRATE_URL} yarn prisma migrate deploy

db-status:
	DATABASE_URL=${DATABASE_MIGRATE_URL} yarn prisma migrate status --preview-feature ${PRISMA_SCHEMA}

db-migrate-dev:
	DATABASE_URL=${DATABASE_MIGRATE_URL} yarn prisma migrate dev --name init ${PRISMA_SCHEMA}

db-deploy:
	DATABASE_URL=${DATABASE_MIGRATE_URL} yarn prisma deploy

db-pull:
	DATABASE_URL=${DATABASE_MIGRATE_URL} yarn prisma db pull ${PRISMA_SCHEMA}

db-push:
	DATABASE_URL=${DATABASE_MIGRATE_URL} yarn prisma db push

db-studio:
	DATABASE_URL=${DATABASE_MIGRATE_URL} yarn prisma studio ${PRISMA_SCHEMA}

db-tbd:
	DATABASE_URL=${DATABASE_MIGRATE_URL} yarn prisma migrate deploy ${PRISMA_SCHEMA}

db-seed:
	DATABASE_URL=${DATABASE_MIGRATE_URL} yarn prisma db seed

db-reset:
	DATABASE_URL=${DATABASE_MIGRATE_URL} yarn prisma migrate reset --force --preview-feature && DATABASE_URL=${DATABASE_MIGRATE_URL} yarn prisma migrate deploy --preview-feature

# Got an error when using db-reset, "The table 'public.User' does not exist in the current database
# seemed to work to do db-migrate, db-push, db-pull