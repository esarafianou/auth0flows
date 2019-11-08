# Sample app using OAuth2 implicit grant flow via Auth0

## Run

Copy src/auth0-config.example.js file to src/auth0-config.js and fill the following
contents:

```
export const config = {
  DOMAIN: {YOUR DOMAIN},
  CLIENT_ID: {YOUR CLIENT ID},
  REDIRECTURI: {YOUR REDIRECT URI},
  REALM: {realm} //needed for co/authenticate
}
```
Then run:

```
npm install
npm start
```

For more information visit [Auth0 react
tutorial](https://auth0.com/docs/quickstart/spa/react/)
