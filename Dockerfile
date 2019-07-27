FROM mhart/alpine-node:9

RUN mkdir /app
RUN mkdir /app/lib
RUN mkdir /app/out

WORKDIR /app

COPY package.json /app
COPY tsconfig.json /app
COPY package-lock.json /app
COPY lib /app/lib

RUN npm i -g typescript
RUN npm i

RUN tsc

EXPOSE 8080
CMD ["node", "/app/out/main.js"]
