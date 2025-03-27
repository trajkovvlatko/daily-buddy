## Local development

Create a .env file and set the environment variables

```
cp .env.example .env
```

Install required packages:

```
yarn
```

Run migrations:

```
yarn rw prisma migrate dev
```

Start dev server:

```
yarn rw dev
```

## Local development using Docker compose

Start dev server with docker compose:

```
docker compose -f docker-compose.dev.yml up
```

On first run or when adding a new migration, connect to the container and run migrations:

Start a bash in the container:
```
docker compose -f ./docker-compose.dev.yml run --rm -it console /bin/bash
```

In the container:
```
yarn rw prisma migrate dev
```

## Run a container from a prebuilt image (suitable for self-hosting)

Pull a docker image from docker hub:

```
docker pull trajkovvlatko/daily-buddy:latest
```

Start a container (make sure to set correct values for the environment variables):

```
docker run \
  -p 8910:8910 \
  -e ENABLE_REGISTRATIONS=true \
  -e SESSION_SECRET=super_secret_session_key_change_me_in_production_please \
  -e DATABASE_URL=postgres://redwood:redwood@192.168.10.171:5432/redwood \
trajkovvlatko/daily-buddy:latest
```

## Database

### Adding a new migration

Update schema:

```
api/db/schema.prisma
```

Run migration locally:

```
yarn rw prisma migrate dev
```

## Scaffold

Create a new database table, by editing api/db/schema.prisma.

Run the migration.

Generate a CRUD scaffold:

```
yarn rw g scaffold post
```
