FROM node:8.17.0-jessie
RUN mkdir -p /app
WORKDIR /app
COPY . /app/
RUN npm install
RUN npm run postinstall
EXPOSE 3009
CMD ["npm", "start"]