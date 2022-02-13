
<h4 align="center">
  This repo provides an implementation for the Donus Challenge made by <a href="https://github.com/ztech-company">Z-Tech</a>.
</h4>
<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/joao96/donus-challenge?style=flat-square">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/joao96/donus-challenge?style=flat-square">
  <img alt="License" src="https://img.shields.io/github/license/joao96/donus-challenge?style=flat-square">
</p>

<p align="center">
  <a href="#checkered_flag-technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#information_source-setup">Setup</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#test_tube-testing">Testing</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#sparkles-how-to-use">How To Use</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#page_facing_up-license">License</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#get-in-touch-monocle_face">Get in touch</a>
</p>

## :checkered_flag: Technologies

- [Typescript](https://www.typescriptlang.org/)
- [Node](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [Postgres - Official Image | Docker Hub](https://hub.docker.com/_/postgres)
- [Prisma](https://www.prisma.io/)
- [Swagger](https://swagger.io/specification/)
- [TSyringe](https://github.com/microsoft/tsyringe)
- [Jest](https://jestjs.io/)
- [Docker](https://www.docker.com/)
- [Sentry](https://sentry.io/welcome/)

- [VS Code][vc] with [EditorConfig][vceditconfig] and [ESLint][vceslint]

## :information_source: Setup

In order to run this application, it's required that you have [Git](https://git-scm.com), [Node.js v10.16][nodejs] or higher + [Yarn v1.13][yarn] or higher installed on your computer. 

From your command line:


**Step 1:** 

Clone this repo & run a `cd` into the project's folder.

**Step 2:** 

Install node modules as below:

```
npm install
```

if you prefer:

```
yarn
```

**Step 3:** 

Create a .env file in the root of your project and use the [.env.example](https://github.com/joao96/donus-challenge/blob/master/.env.example) file to assist you in filling out the necessary variables.

**IMPORTANT** 

Do not forget to provide an API_KEY value to the .env file.

**Step 4 (DOCKER):**

For the database, this project makes use of PostgreSQL. In order to make it operational, run the following command:

```
docker-compose up -d
```

Which will instanciate a container using a postgres image. Also, if you take a look at the [.env.example](https://github.com/joao96/donus-challenge/blob/master/.env.example), you will see there's a **DATABASE_URL** entry that uses the same user, password and database name as the [docker-compose](https://github.com/joao96/space-flight-news-challenge/blob/master/docker-compose.yml) file.

This command will create two databases, one for development called **_donus_** and another for testing called **_test_**.

**Step 5:**

We need to execute the migrations to correctly structure the main database (**_donus_**). So, run the next command:

```
yarn push:development
```

After that, we're finally ready to run the application:

```
yarn dev
```

Once the server is up, you should be able to use the API.


**Step 6 (SENTRY):**

Furthermore, [Sentry](https://sentry.io/welcome/) was added to this project in order to monitor the errors launched during the execution of the application. 
In your .env file, add the DNS string to the variable SENTRY_DSN (See [.env.example](https://github.com/joao96/donus-challenge/blob/master/.env.example)).

## :test_tube: Testing

To execute the test suite developed for this project, check if there's a database called **_test_** in the postgres container. It should have been created when you executed the command  ```docker-compose up -d```. If not, you can always do so using SQL.

With that out of the way, run the following command to push the migrations to the test database (**_test_**):

```
yarn push:test
```

After that, we're ready to run the test suites:

```
yarn test
```

**Note:** Server should be down for this operation to succeed.

## :sparkles: How To Use

Once the server is up, check out the OpenAPI documentation at http://localhost:3333/api-docs to learn more about the routes and features.

Important to note that in order to actually use application, you must provide a API_KEY to your .env file. 

Use the same value to operate the OpenAPI at http://localhost:3333/api-docs.

## :page_facing_up: License

<a href="https://github.com/joao96/donus-challenge/blob/master/LICENSE">
    <img alt="License" src="https://img.shields.io/github/license/joao96/donus-challenge">
</a>

<br />

This project is licensed under the MIT.


## Get in touch! :monocle_face:

[![Linkedin Badge](https://img.shields.io/badge/-João%20Victor%20Poletti-0e76a8?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/jvpoletti/)](https://www.linkedin.com/in/jvpoletti/)
[![Gmail Badge](https://img.shields.io/badge/-jvpoletti@gmail.com-ff512f?style=flat-square&logo=Gmail&logoColor=white&link=mailto:jvpoletti@gmail.com)](mailto:jvpoletti@gmail.com)

<br />

Made with :green_heart: by [João Victor Poletti](https://github.com/joao96).

[nodejs]: https://nodejs.org/
[yarn]: https://yarnpkg.com/
[vc]: https://code.visualstudio.com/
[vceditconfig]: https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig
[vceslint]: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
 
