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

Read a random popular essay:

```
npx pg-essays read random
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

Host the Express API yourself on [fly.io](https://fly.io) for free:

```bash
# Install fly cli
brew install flyctl
# Set up Docker image
fly launch
# Deploy app
fly deploy
# Open app in browser
fly open
```
