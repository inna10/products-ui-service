# InnaEisenProductsUiService

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.5.
The "Angular Material" is used in project for UI components
(by running 'ng add @angular/material')

## Development server

Run `ng serve` for a dev server. Navigate to `http://<ui-service-host-ip>:4200/`. 
The application will automatically reload if you change any of the source files.

IMPORTANT NOTE:

UI application uses API-endpoint "ubuntu-2:8081".
apiUrl = 'http://ubuntu-2:8081/api/products';
So, please provide address resolution
for "ubuntu-2" into server-host address (say, via /etc/hosts, at machine, where web-browser is opened)

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Dockerizing

Clone project from github to any host, with Docker installed

Perform the following commands:
```bash
>cd inna-eisen-products-ui-service
~/inna-eisen-products-ui-service$ sudo docker build -t inna-eisen-products-ui .
~/inna-eisen-products-ui-service$ sudo docker images
REPOSITORY               TAG           IMAGE ID       CREATED         SIZE
inna-eisen-products-ui   latest        80b36e684a04   3 minutes ago   633MB
```

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


