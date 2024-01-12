FROM node:15.13-alpine
WORKDIR /JUST_YOUR_KIDIEZ_WEBSITE
ENV PATH="./node_modules/.bin:$PATH"
COPY . .
RUN npm run build
CMD [ "npm", "start" ]
# docker build --tag react .
# docker run --publish 3000:3000 react
# docker run react
# docker-compose build .
# docker compose up
# docker-compose run app