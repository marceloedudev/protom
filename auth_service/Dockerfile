FROM node:16.17.1

WORKDIR /home/src/app

COPY package.json .
RUN npm cache clean --force
RUN npm install --silent
COPY . .

EXPOSE 4000

CMD ["npm", "start"]
