import Keycloak from "keycloak-js";

const config = process.env.REACT_APP_ENVIRONMENT === "production" ? {
      offline: false,
      backend: "http://randevous.go.ro:8180/api",
      socketIoUrl: "http://randevous.go.ro:8180",
      keycloakInstance: Keycloak({
        url: "http://randevous.go.ro:8180/auth",
        realm: "capp",
        clientId: "auth-code",
      })
    }
    :
    {
      offline: false,
      backend: "http://localhost:3100",
      socketIoUrl: "http://localhost:3100",
      keycloakInstance: Keycloak({
        url: "http://localhost:8180/auth",
        realm: "capp",
        clientId: "auth-code",
      })
    };

export default config;
