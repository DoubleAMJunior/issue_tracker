# Issue Tracker

## Setup

1. Copy the example `.env` file:

```bash
cp .env.example .env
```

2. Edit `.env` and change the `DATABASE` variable if needed (default is `sql`). Changing the value to any thing else will load the in memory driver

## Run with Docker

Build and start the app:

```bash
docker compose up --build
```

The app will be available at:

```
http://localhost:8000
```