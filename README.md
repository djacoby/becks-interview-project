# Monorepo for Becks Interview

This monorepo contains the following repos:

- deliver-wrk-email: email delivery worker than subscribes to a bull queue to receive and process email jobs.
- seed-order-api: Express API that exposes the system's data for consumption by clients
- seed-order-client: React SPA with a Material UI data grid to display seed information and process seed orders.
- sdk: Shared typescript interfaces between all aformentioned systems.

## Development

- Create a postgres database named "becks" on the default connection settings (localhost:5432, username: postgres, password: pass)

- Run `pnpm run seed` to run the migrations and seed the database

- Once the database is seeded run `pnpm run dev` to start all the microservices at the same time.
