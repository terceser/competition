FROM node:8.17.0-jessie

# this dockerfile will build app automatically
# not a wise approach though

RUN mkdir -p /app
WORKDIR /app
COPY . /app/
RUN npm install
RUN npm run build:client
EXPOSE 3009
CMD ["npm", "start"]