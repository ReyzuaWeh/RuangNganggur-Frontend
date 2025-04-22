FROM node:23-alpine3.20

WORKDIR /bkk-frontend

ARG VITE_BACKEND_SERVER

ENV VITE_BACKEND_SERVER=$VITE_BACKEND_SERVER

COPY ./package.json /bkk-frontend/
COPY ./yarn.lock /bkk-frontend/
COPY ./tsconfig*.json /bkk-frontend/
COPY ./vite.config.ts /bkk-frontend/
COPY ./src /bkk-frontend/src
COPY ./eslint.config.js /bkk-frontend/
COPY ./index.html /bkk-frontend/
COPY ./tailwind.config.js /bkk-frontend/
COPY ./postcss.config.js /bkk-frontend/
COPY ./public /bkk-frontend/public

RUN yarn install --frozen-lockfile
RUN yarn build

EXPOSE 4173

CMD ["yarn", "preview", "--host", "--port", "4173"]