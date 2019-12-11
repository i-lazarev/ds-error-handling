const express = require("express")
const api = express()

let arrUsers = [
	{username: "Robmin", role:"Admin"},
	{username: "Rob", role: "User"}
]

api.listen(3000, () => console.log("Listening on 3000"))

api.use("/admin", (req, res, next) => {
	let username = req.query.username
	if(!username) {
		return next("Please provide a username")
	}

	let isAdmin = arrUsers.some(user => user.username == username && user.role == "Admin")
	if(!isAdmin) {
		let err = new Error("You are not admin")
		err.status = 401
		return next(err)
	}
	next()
})

api.get("/admin", (req, res, next) => {
	res.send("<h1>Welcome to Admin page</h1>")
})


api.use((req, res, next) => {
	res.status(404).send({
		error: `The route ${req.url} does not exist`
	})
})

api.use((err, req, res, next) => {
	let statusCode = err.status || 500
	let errMessage = err.message || err  

	res.status(statusCode).send({
		error: errMessage
	})
})
