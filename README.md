# Express Backend API With Prisma and TypeScript

## Author:

[Younesse ElKars](#) - [LinkedIn](https://www.linkedin.com/in/younesse-elkars/)

## Description:

A RESTFull API With Express , TypeScript and Prisma that handles authentication and CRUD Operations

## Features

- MVC Pattern
- Prima as ORM
- Authentication Routes (/Login , /Logout)
- JWT (HTTP-Only)
- Protected Routes
- Validation With Zod as middleware
- Error Handler middleware :
  - Prisma Errors
  - Zod Errors
  - JWT Parsing Errors
  - Route Not Found Error
- CRUD Operations ( Author , Books resources)
- Custom Handler for Response
- Custom HTTP Codes enum list
- CORS Middleware with custom config object

## Getting Started

#### Clone the repo:

```bash
git clone https://github.com/Unesdevdev/express-prisma-ts.git
```

#### Install dependencies:

```bash
npm install
```

#### Set environment variables:

```bash
cp .env.example .env
```

## Running Locally

```bash
npm run dev
```

## Running in Production

```bash
npm run start
```

## Contributions

Contributions are welcome! Feel free to submit issues, feature requests, or pull requests to enhance the functionality or fix any issues.
