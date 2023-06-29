# Frontend e-commerce

## Description

This e-commerce frontend alication project is ready for most basic core tasks like authorization, authentication, login register, admin panel CRUD.

## Features

* User registration and login
* Authentication via JWT
* Praduct cart
* Admin panel
* Design Ant design
* Typescript, React Redux/toolkit

### Installing

```
git clone https://github.com/mhertovm/Frontend-e-commerce_with_React_and_Node.git
cd .. Frontend-e-commerce_with_React_and_Node
npm install
```

## Getting Started

To test the application

* default request port http://localhost:3001/

```
Start the application
    npm start
```

# Backend e-commerce

## Description

This e-commerce backend alication project is ready for most basic core tasks like authorization, authentication, email verification and CRUD.

## Features

* User registration and login
* Authentication via JWT
* Email confirmation
* CRUD
* MySql database

### Installing

```
git clone https://github.com/mhertovm/Backend-e-commerce_with_React_and_Node.git
cd .. Backend-e-commerce_with_React_and_Node
npm install
```

## Getting Started

To test the application

* In config folder create MySql database and choose a username and password for it
* Create config.json file and add the database data as in the example
```
    {
    "development": {
        "username": "username",
        "password": "password",
        "database": "database name",
        "host": "host",
        "port": "port",
        "dialect": "mysql"
    },
    "test": {
        "username": "username",
        "password": "password",
        "database": "database name",
        "host": "host",
        "port": "port",
        "dialect": "mysql"
    },
    "production": {
        "username": "username",
        "password": "password",
        "database": "database name",
        "host": "host",
        "port": "port",
        "dialect": "mysql"
    }
    }
```

* Create .env file and add 
    * PORT = port(the port on which you want to send a request)
    * T_SECRET = secret(the password with which the token will be issued)
    * EMAIL = email(the email from which you want to send a code for verification)
    * EMAIL_PASSWORD = password (Enable 2 factor authentication and click on app passwords (gmail example: https://support.google.com/mail/answer/185833?hl=en))

```
Create the database tables
    npx sequelize-cli db:migrate
Create admin in MySql workbench example
    INSERT INTO Carts (discount)
    VALUES ('0');
    INSERT INTO Users (name, surname, email, password, role, cart_id)
    VALUES ('', '', '', '', 'admin', '1(cart id)');
Start the application
    npm start
```

## Authors

Contributors names and contact info

ex. mher tovmasyan
ex. https://github.com/mhertovm