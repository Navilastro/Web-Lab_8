# Assignment 8 - Node.js and Express

In this project, I built a basic Node.js server using Express to serve static files and API routes.

## How to install and run the project

1. Open the project folder in your terminal.
2. Run `npm install` to install Express.
3. Run `npm run dev` to start the server.
4. Go to `http://localhost:3000` in your web browser.

## File organization

/assignment8
|-- public/
|   |-- index.html
|   |-- styles.css
|   |-- app.js
|-- server.js
|-- package.json
|-- package-lock.json
|-- .gitignore
|-- README.md

## Curl evidence

1. Successful JSON response
`curl --include http://localhost:3000/api/courses`
HTTP/1.1 200 OK

2. The 201 response
`curl --include -X POST http://localhost:3000/api/subscribe`
HTTP/1.1 201 Created

3. The 403 response
`curl --include http://localhost:3000/api/admin`
HTTP/1.1 403 Forbidden

4. The redirect
`curl --include http://localhost:3000/old-page`
HTTP/1.1 302 Found
Location: /hello

5. A 404 response on an /api path
`curl --include http://localhost:3000/api/test`
HTTP/1.1 404 Not Found
{"error":"Not found"}

6. A 404 response on a non-API path
`curl --include http://localhost:3000/random`
HTTP/1.1 404 Not Found

## Answers to the reasoning questions

1. **Route order:** I moved the 404 fallback to the top of `server.js`. When I did this, all routes returned 404. This happens because Express checks routes from top to bottom, so it matches the fallback first and stops.
2. **Middleware:** I removed `next()` from my logger. The server printed the log, but the browser just kept loading forever. The request couldn't continue to the route because `next()` was missing.
3. **Status codes:** `POST /api/subscribe` gets a 201 code because a new data (subscription) is created. For missing pages, we use 404 instead of 200 with an error message because 200 means the page was successfully found, which is not true.
4. **Configuration:** Using `process.env.PORT` allows cloud hostings to give a dynamic port to the server. If we only use 3000, it might crash on the host. 3000 is just a fallback for local testing.
5. **Dependencies:** We exclude `node_modules` because it is very big and has too many files. After cloning my repository, a teammate only needs to run `npm install`. This command downloads everything listed in `package.json`.
6. **Same origin:** If I opened the HTML file directly from my disk, the browser URL would start with `file://`. Then, relative URLs for the API wouldn't work. This browser security rule is called the Same-Origin Policy.

## Notes on the self-study items

- I checked the official Node.js documentation for the `process` object. I found `process.version` and `process.uptime()` to get the server's running time and Node version.
- I searched how to send plain text. I used `res.type("text/plain")` before `res.send()` for the `robots.txt` route.
- To display JSON neatly on the webpage, I used `JSON.stringify(json, null, 2)` inside `app.js` to add indentation.

## Challenges they faced

- The biggest challenge was understanding the order of the code. At first, my `app.listen` and 404 fallback were in the wrong places, so my API didn't work correctly. I fixed it by putting the middlewares at the top and the 404 fallback at the very end.