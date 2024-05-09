const express = require('express')
const app = express()

const userRouter = require('./routers/userRouter')
const articleRouter = require('./routers/articleRouter')
const commentRouter = require('./routers/commentRouter')
const categoryRouter = require('./routers/categoryRouter')

app.use(express.json())

app.use('/api', userRouter)
app.use('/api', articleRouter)
app.use('/api', commentRouter)
app.use('/api', categoryRouter)


module.exports = app;

