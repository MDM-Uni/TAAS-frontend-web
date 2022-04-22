# TAAS frontend

## Come creare `components`

Metodo 1: terminale

``ng generate component components/<nome_component>``

Metodo 2: interfaccia IntelliJ

1. click destro directory `component`
2. "New Angular Schematic" > "component"
3. Dare il nome al component

## Come creare `modules` e `services`

Procedimento equivalente ai `components`.

## Versioni
> Node: 17.4.x  
> Package Manager: npm 8.3.x  
> Angular: 13.1.x  
> Angular CLI: 13.1.x  

# Come dockerizzare e pushare la web-app su Docker Hub
https://www.docker.com/blog/multi-arch-build-and-images-the-simple-way/  
`docker buildx build --push --platform linux/arm64,linux/amd64 --tag marcoscale98/taass:latest .`
Target platform possibili:
 - linux/arm64
 - linux/amd64
## Build e push docker image

Se non già fatto in precedenza fare l'accesso a Docker Hub:

```bash
docker login
```
Poi buildare l'immagine e pushare:
```bash
docker build -t marcoscale98/taass_frontend_web:<date> .
docker push marcoscale98/taass_frontend_web:<date>
```
dove `<date>` è la data di oggi in formato yyyyMMdd

