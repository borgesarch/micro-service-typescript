import { Server, Request, ResponseToolkit } from '@hapi/hapi'
import * as dotenv from 'dotenv'

dotenv.config()

async function initServer () {
  const server = new Server()
  server.settings.port = process.env.PORT || 3445
  server.settings.routes = {
    cors: {
      origin: ['*'],
    },
  }
  server.settings.debug = {
    request: ['error'],
  }
 
  const authKeycloak = require("hapi-auth-keycloak");

  await server.register({ plugin: authKeycloak });

  server.auth.strategy("keycloak-jwt", "keycloak-jwt", {
    realmUrl: process.env.REALM_URL,
    clientId: process.env.CLIENT_ID,
    minTimeBetweenJwksRequests: 15,
    cache: false,
    userInfo: ["name", "email"],
  });

  server.start()
  return server
}

export default initServer
