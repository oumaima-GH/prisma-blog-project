const express = require('express')
const app = express()

const authRouter = require('./routers/authRouter')
const userRouter = require('./routers/userRouter')
const articleRouter = require('./routers/articleRouter')
const commentRouter = require('./routers/commentRouter')
const categoryRouter = require('./routers/categoryRouter')
const {isAuthorized, isAuthenticated} = require('./middleware/authMiddleware')

app.use(express.json())

app.use('/api/v1', authRouter)
app.use('/api/v1', isAuthenticated ,isAuthorized('author', 'admin'),userRouter)
app.use('/api/v1', isAuthenticated ,isAuthorized('author'), articleRouter)
app.use('/api/v1', isAuthenticated, commentRouter)
app.use('/api/v1', isAuthenticated,isAuthorized('admin'), categoryRouter)


module.exports = app;

