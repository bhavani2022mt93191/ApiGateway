FROM node:lts-alpine
ENV NODE_ENV="development"
ENV API_GATEWAY_SERVICE_PORT=3001
ENV JWT_SECRET ="TEST_JWT_SECRET_KEY"
ENV USER_SERVICE='http://userservice:3002'
ENV APPOINTMENT_SERVICE='http://appointmentservice:3004'
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install && mv node_modules ../
COPY . .
EXPOSE 3001
CMD ["npm", "start"]
