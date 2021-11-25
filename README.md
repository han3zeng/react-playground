# React-Playground

## Introduction
* The project implement the token-based authorization and authentication system. It has two back-end servers which are implemented by node.js.
    1. [authorization-server](https://github.com/han3zeng/authorization-server)
    2. [resource-server](https://github.com/han3zeng/resource-server)

## Architecture
* Continuous Deployment from github repo
    * by google cloud run setting
* express server

## Script Instruction
* `npm run dev`: dev mode
* `npm run build`: build code
* `npm run start`: invoke the express server to serve the web apge


## PORT
* default: 3000
* to customize the port, edit `process.env.PORT=[your value]`

## Origin
* dev: localhost
* prod: https://react-playground-7kgn6zbeya-uc.a.run.app/


## To Do
* [ ] get csrf token at server side rendering
* [ ] PWA
* [ ] authentication front-end flow redesign
