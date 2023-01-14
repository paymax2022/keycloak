FROM quay.io/keycloak/keycloak:latest
COPY keycloak-server.crt.pem keycloak-server.crt.pem
COPY keycloak-server.key.pem keycloak-server.key.pem
RUN /opt/keycloak/bin/kc.sh build

ENTRYPOINT /opt/keycloak/bin/kc.sh start --https-certificate-file=keycloak-server.crt.pem --https-certificate-key-file=keycloak-server.key.pem