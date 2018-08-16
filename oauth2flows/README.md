# Sample application implementing various OAuth2 flow using Auth0

It supports the following grant flows:
- Autorization Code
- Client Credentials
- Resource Owner Password
- Autorization Code with PKCE

For more informnation visit:
[Authorization Code](https://auth0.com/docs/quickstart/webapp/nodejs)
[Client Credentials ](https://auth0.com/docs/api-auth/tutorials/client-credentials)
[Resource Owner Password](https://auth0.com/docs/api-auth/tutorials/password-grant)
[Authorization Code with PKCE](https://auth0.com/docs/api-auth/tutorials/authorization-code-grant-pkce)

## Run

Set the environment variables needed
```
export DOMAIN={YOUR DOMAIN}
export AUTH0_CLIENT_ID={YOUR CLIENT ID}
export AUTH0_CLIENT_SECRET={YOUR CLIENT_SECRET}
export CALLBACKURL={YOUR CALLBACK URL}
export AUDIENCEURL={YOUR AUDIENCE URL}
```

Then run:
```
npm install
node server.js
```
