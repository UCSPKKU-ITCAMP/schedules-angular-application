## STAGE 1: Build ###

# We label our stage as 'builder'
FROM node:10.2.1

RUN npm install -g @angular/cli

RUN mkdir /schedules
COPY . .
WORKDIR /schedules

RUN npm install --save @angular/material @angular/cdk
RUN npm install --save @angular/animations



EXPOSE 4200 49153