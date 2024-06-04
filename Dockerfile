ARG ALWATR_NGINX_VERSION=2.3.2

FROM node:21-alpine3.18 as builder

WORKDIR /app

ENV NODE_ENV production

RUN apk add --no-cache git
RUN set -ex; corepack enable;

COPY . .

RUN set -eux; \
  yarn install --immutable; \
  yarn build; \
  ls -lahF .; \
  ls -RlahF .;

# ---

FROM ghcr.io/alwatr/nginx-pwa:${ALWATR_NGINX_VERSION} as nginx

COPY --from=builder /app/dist/ .

RUN pwd; ls -lAhF;

EXPOSE 80
