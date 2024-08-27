# Blackjack

## Configuration/Deploying

The following environment variables need to be provided:
| Name          | Source        |
| ------------- | ------------- |
| `VITE_BACKEND`  | URL of backend server for HTTP API requests (refer to [xalbd/blackjack-server](https://github.com/xalbd/blackjack-server)) |
| `VITE_BACKEND_WS`  | URL of backend server for Websocket connections (refer to [xalbd/blackjack-server](https://github.com/xalbd/blackjack-server)) |
| `VITE_FIREBASE_API_KEY`  | Firebase Configuration  |
| `VITE_FIREBASE_AUTH_DOMAIN`  | ^  |
| `VITE_FIREBASE_PROJECT_ID`  | ^  |
| `VITE_FIREBASE_STORAGE_BUCKET`  | ^  |
| `VITE_FIREBASE_MESSAGING_SENDER_ID`  | ^  |
| `VITE_FIREBASE_APP_ID`  | ^  |

### Testing

Put these environment variables in a `.env` file in the repository root. Run `npm run dev` to launch a local development server.

### Deploying using Firebase & Github Actions

When deploying using Firebase Hosting & Github Actions, environment variables are retrieved from the repository variables configured through Github's repository settings. Be sure to configure them.

Note that the Github Action also requires a Firebase service account to be set up. This can be done with `firebase init hosting:github` in the repository root. This uploads the necessary secret key and sets up Github Actions appropriately. Note that to build, the build script that Firebase should be provided is `npm i && npm build`.
