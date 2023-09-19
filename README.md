# pg-cli

A dumb little cli tool for reading Paul Graham's (PG) essays in the terminal as markdown.

## Usage

View all essays:

```
npx pg-essays list
```

Read an essay by slug:

```
npx pg-essays read greatwork
```

## API

You can also access this data via API:

- https://pg-essays.fly.dev/api/essays
- https://pg-essays.fly.dev/api/essays/greatwork

```
curl https://pg-essays.fly.dev/api/essays

curl https://pg-essays.fly.dev/api/essays/greatwork
```

## Deploy to Fly

Host the Express API yourself on [fly.io](https://fly.io)

```bash
brew install flyctl
fly launch
fly deploy
fly open
```
