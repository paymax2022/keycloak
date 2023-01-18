FROM quay.io/keycloak/keycloak:latest

COPY keycloak.keystore /secret/keycloak.keystore
COPY hmo-realm.json /opt/keycloak/data/import/hmo-realm.json

ENTRYPOINT /opt/keycloak/bin/kc.sh start \
    --import-realm \
    --https-key-store-file=/secret/keycloak.keystore