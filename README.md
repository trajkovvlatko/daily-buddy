# README

Install dependencies:

```
yarn
```

Start dev server:

```
yarn rw dev
```

## Database

### Local

Update schema:

```
api/db/schema.prisma
```

Run migration locally:

```
yarn rw prisma migrate dev
```

### Planetscale

Create a branch here: https://app.planetscale.com/trajkovvlatko/daily_production/branches


Login to planetscale and pick branch:

```
pscale connect daily_production
```

Get local address from `pscale`'s output and use as `DATABASE_URL` in `.env`. For ex.:
```
DATABASE_URL="mysql://root@127.0.0.1:32893/daily_production"
```

Create a new deploy request in Planetscale https://app.planetscale.com/trajkovvlatko/daily_production/deploy-requests


Open a new terminal tab and push db changes:
```
npx prisma db push --schema api/db/schema.prisma
```

Go to Planetscale and refresh schema in deploy request.
Apply and delete branch.


Mark any failed migrations as resolved:
```
npx prisma migrate resolve --applied "20221114194730_create_note" --schema api/db/schema.prisma
```

Redeploy on Vercel if needed.


## Scaffold

```
yarn redwood g scaffold post
```

## Deployment

```
yarn rw setup deploy --help
```


```
yarn rw setup auth --help
```
