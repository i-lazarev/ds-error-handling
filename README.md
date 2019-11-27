# Express - Exercise Erros

## Write me an error check

We want to check for a user role. But this time we want to throw an error, if the user has not sufficient permissions. And catch the error centrally.


### Instructions

* Install express
* Setup an express app in a file server.js
* Paste the following array before your route definitions:
    ```
    let arrUsers = [
        {username: "yourname", role:"Admin"},
        {username: "Rob", role: "User"}
    ]
    ```
    => replace yourname with your real name

* Add a GET route /admin
    * send an HTML message `<h1>Welcome to Admin page</h1>`

* Write a middleware which protects the admin route
    * Check for a field "username" on the URL (=> req.query)
    * Check if the given user exists in our array and has the role "Admin"
    * if so: call the next() function to proceed
    * if not:
        * create an error object "err" with a message "You are not admin"
        * set a status code of 401 on the error
        * call the next() function with the error or use `throw err`

* Attach the middleware to the route /admin

* Test it out by calling the route from the browser
    with different query strings


### Bonus

* Implement a middleware that catches all calls to non-existing routes 
    => caution: this must be placed AFTER all normal routes
    * Create a 404 error and an error message
    * Send the error as JSON back to the client (browser)

* Provie a catch-all-errors middleware at the very end of your file
    * Send the given error message to the user as JSON
    * Also provide the received error HTTP code in the response:
        {error: err.message, code: \<the-error-code\>}
    => if no error code was provided: Use 500 as default error code

## Bonus 2

* Adapt the 404 not found error handler:
    * Use the HTTP Errors library to create a "NotFound" error in this middleware:
    => HowTo: [http-errors package doc](https://www.npmjs.com/package/http-errors)
    => with this package you can use string names instead of error codes, so e.g. "NotFound" instead of 404 or "Unauthorized" instead of code 401
