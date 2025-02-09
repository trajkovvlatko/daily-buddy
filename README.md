## Local development using Docker

Start dev server with docker compose:

```
docker compose -f docker-compose.dev.yml up
```

On first run or when adding a new migration, connect to the container and run migrations:

```
docker compose -f ./docker-compose.dev.yml run --rm -it console /bin/bash
root@...:/home/node/app# yarn rw prisma migrate dev
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

Generate a CRUD scaffold:

```
yarn rw g scaffold post
```

## Deployment
