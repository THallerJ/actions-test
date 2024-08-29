# Guitar Tabs

## Description

[Guitar Tabs](https://guitar-tab-site.vercel.app/) is a CRUD app that allows users to create guitar tablature (an alternative to sheet music for guitarists).

## Development

### Stack Information

- The app was built with [Next.js 14](https://nextjs.org/)

- The SQL query builder, [Kysely](https://kysely.dev/docs/intro), is used to interact with a [Postgres](https://www.postgresql.org/) database

- User authentication is handled using [Auth0](https://auth0.com/docs/quickstart/webapp/nextjs/interactive)

### Database Schema

The app creates a single table in the database to represent tabs:

| COLUMN           | TYPE      |
| ---------------- | --------- |
| id               | INTEGER   |
| created_at       | TIMESTAMP |
| notes            | JSON      |
| artist           | VARCHAR   |
| username         | VARCHAR   |
| is_private       | BOOLEAN   |
| note_count       | INTEGER   |
| gtr_string_count | INTEGER   |

The data in the notes column is stored as JSON since the data is dynamic (any number of notes could be saved). Storing the data as JSON is viable since queries are never executed against the notes column.

The JSON stored in the notes colum has the following structure:

`{note number: {guitar string number: fret number, bar: BOOLEAN}}`

- `note number` indicates a note's horizontal position in the tab
- `guitar string number` indicates a note's vertical position in the tab
- `fret number` indicates the text that is displayed at the note's position
- `bar` indicates the start of a new measure when true

## Running the app

There are several ways to run the app.

For running the app in docker, the necessary docker images can be accessed at my [Docker Hub respository](https://hub.docker.com/repositories/hallert60).

### Environment Variables

Depending on the context in which you are running the app, certain environamental variables must be provided:

| VARIABLE              | DESCRIPTION                                                                       | RUN LOCALLY | RUN IN DOCKER | RUN E2E TESTS |
| --------------------- | --------------------------------------------------------------------------------- | :---------: | :-----------: | :-----------: |
| AUTH0_ISSUER_BASE_URL | see [Auth0](https://auth0.com/docs/quickstart/webapp/nextjs/01-login)             |  &#10004;   |   &#10004;    |   &#10004;    |
| AUTH0_CLIENT_ID       | see [Auth0](https://auth0.com/docs/quickstart/webapp/nextjs/01-login)             |  &#10004;   |   &#10004;    |   &#10004;    |
| AUTH0_CLIENT_SECRET   | see [Auth0](https://auth0.com/docs/quickstart/webapp/nextjs/01-login)             |  &#10004;   |   &#10004;    |   &#10004;    |
| AUTH0_SECRET          | see [Auth0](https://auth0.com/docs/quickstart/webapp/nextjs/01-login)             |  &#10004;   |   &#10060;    |   &#10060;    |
| AUTH0_BASE_URL        | see [Auth0](https://auth0.com/docs/quickstart/webapp/nextjs/01-login)             |  &#10004;   |   &#10060;    |   &#10060;    |
| POSTGRES_PASSWORD     | see [Kysely](https://kysely.dev/docs/getting-started)                             |  &#10004;   |   &#10060;    |   &#10060;    |
| POSTGRES_USER         | see [Kysely](https://kysely.dev/docs/getting-started)                             |  &#10004;   |   &#10060;    |   &#10060;    |
| POSTGRES_HOST         | see [Kysely](https://kysely.dev/docs/getting-started)                             |  &#10004;   |   &#10060;    |   &#10060;    |
| POSTGRES_PORT         | see [Kysely](https://kysely.dev/docs/getting-started)                             |  &#10004;   |   &#10060;    |   &#10060;    |
| POSTGRES_DATABASE     | see [Kysely](https://kysely.dev/docs/getting-started)                             |  &#10004;   |   &#10060;    |   &#10060;    |
| EMAIL_1               | email address for main account used in e2e tests                                  |  &#10060;   |   &#10060;    |   &#10004;    |
| PASSWORD_1            | password for main account used in e2e tests                                       |  &#10060;   |   &#10060;    |   &#10004;    |
| EMAIL_2               | email address for secondary account used in e2e tests involving multiple accounts |  &#10060;   |   &#10060;    |   &#10004;    |
| PASSWORD_2            | password for secondary account used in e2e tests involving multiple accounts      |  &#10060;   |   &#10060;    |   &#10004;    |

### Running in Docker

To run the app, enter the command:

`pnpm docker-dev`

This will run the client-dev and db-dev docker containers.

The app can be accessed http://localhost:4000

### Running End-to-End Tests

The end-to-end tests should be run against an instance of the app running in docker. To do so, enter the command:

`pnpm docker-e2e`

This will run the client-e2e and db-e2e docker containers (The app can be accessed http://localhost:3000).

Then, in another terminal, run the tests by entering the command:

`pnpm e2e`

Alternatively, enter the command:

`pnpm e2e-ui`

to run the tests in ui mode, although the tests will run slower.
