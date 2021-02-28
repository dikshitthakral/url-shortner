# Short - Url

Short Url service

## Purpose

The purpose of this service is, to take care of shortening url functionality.
This service caters creating a short url , getById and getList of urls

## Version specification
- node: v14.13.1
- express v4.17.1

## IDE recommendations and setup

- VSCode IDE
- Eslint vscode plugin
- Prettier vscode plugin for linting warnings (auto fix on save)
- Add the following setting in vscode settings.json 
```json
"eslint.autoFixOnSave": true
```

## Dev setup
- Install all the dependencies using `npm install`
- To run the server with watch use `npm run start`
- To run the test cases in watch mode use `npm run test`
- To run the test cases with coverage `npm run test:cov`

## Test

- Unit Test: We are using Jest for assertion and mocking

### Optional
- Default we are using console log we can change into 

## Build With
* Node - The runtime server framework used
* ExpressJS - minimalist web framework for Node.js
* MongoDB - Backend Database used
* Mongoose - to model your application data with MongoDB
* nanoid - to get the 10 character unique id for shortening url
* valid-url - to get the valid url.

## Development

Default port is 5000.

There are 3 API end points :
* Create a short url
  ```
  http://localhost:5000/api/url/shorten - Post

  Body: {
    "url": "https://stackoverflow.com",
    "description": "code-sandbox"
  }
  ```
* Get by unique Id.
  ```
  http://localhost:5000/api/url/nOZweZLzpB - Get
  ```
* Get all list of urls.
  ```
  http://localhost:5000/api/all-urls - Get
  ```
  
If you're using VSCode as your IDE, simply hit F5 to run the service.  While the service is running, you can use swagger, 
Postman, or curl to exercise the API.