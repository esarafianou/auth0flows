# Sample app using OAuth2 implicit grant flow via Auth0

## Run

Create an auth0-config.js file under the src folder with the following
contents: 

```
export const config = {
  DOMAIN: {YOUR DOMAIN},
  CLIENT_ID: {YOUR CLIENT ID},
  REDIRECTURI: {YOUR REDIRECT URI}
}
```
Then run:

```
npm install
npm start
```

For more information visit [Auth0 react
tutorial](https://auth0.com/docs/quickstart/spa/react/)
