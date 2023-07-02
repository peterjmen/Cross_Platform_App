# Cross-platform Web Application

This is a cross-platform web application that can be used on any device with a web browser.

## Technologies Used

The client is built using [React](https://reactjs.org/), while the server is built using [Express](https://expressjs.com/) and uses [MongoDB](https://www.mongodb.com/) as its database.

## Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Setup

To setup the project, start by cloning the repository.

```sh
git clone https://github.com/peterjmen/Cross_Platform_App
cd Cross_Platform_App
```

Then install the NPM packages.

```sh
npm install
```

Finally create a `.env` file within the `server` and `client` directorys and add the environment variables listed in the `.env.example` file in the same directorys.

### Running the Application

There are two ways to start the application, either in development mode or production mode.

#### Development Mode

The following command will start both the client and the server in development, where the client hot-reloads on changes and the server restarts on changes.

```sh
npm run dev
```

#### Production Mode

The following commands will build the client and start the server in production mode.

```sh
npm run build
npm run start
```

## Postman Collection

We've provided a Postman collection that can be used to test the API endpoints. You can find the collection at the root of this repository, just import that into Postman and you're good to go.
