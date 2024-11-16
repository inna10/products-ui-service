FROM node:alpine
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm install -g @angular/cli
#ng add @angular/material
RUN npm install
EXPOSE 4200
#--disable-host-check - to prevent Invalid host header
CMD ["ng", "serve", "--host", "0.0.0.0", "--disable-host-check"]
