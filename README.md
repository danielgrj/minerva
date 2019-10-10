# Minerva

Minerva is a quotes and references manager that aims to become and useful tool for humanistic research. Minervas goal is
to be a powerful resource for quotes management but easy to use.

## Installation

To install Minerva, first you need to clone this git repository.

`git clone https://github.com/danielgrj/minerva`

For the express server you have to go to the backend directory and install the dependencies with npm:

`npm install`

The server needs an .env file for configurations with the following variables.

```
PORT=
DB=
SECRET=
FACEBOOK_APP_ID=
FACEBOOK_APP_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
CLOUDINARY_NAME=
CLOUDINARY_KEY=
CLOUDINARY_SECRET=
```

To run the react app, go to the frontend and install all the dependencies using yarn:

`yarn install`

## Usage

Everyone can create an account on [Minerva](https://atldan-minerva.herokuapp.com/), but if you want to test the app, you
can use the following credentials.

```
  User 1
  Email: christhina@example.com
  Password: 123

  User 2
  Email: jojo123@example.com
  Password: 123
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
