# withthe tide (Rails Order Management System)

Fullstack application, with a React frontend and Rails backend.

## Description

- User Authentication for signup and login procedures with bcrypt security.
- Log in and manage orders specific to your account.
- View, update and delete existing orders and create new orders.
- Fully responsive frontend created with React Material UI and styled components.

## Requirements

- ruby version: 2.7.3p183
- npm version 7.21.0

## How to Use

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.
Clone repository and run the following command inside this project's directory to load dependencies

To set up rails backend:

```bash
bundle install
run rails db:create db:migrate db:seed
rails s
```

To set up react frontend:

```bash
npm install
npm start
```

Frontend Git Link: https://github.com/dariusVassel/phase-4-frontend-project

## Licensing

Copyright (c) 2012-2022 Samarth Gwalani

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
