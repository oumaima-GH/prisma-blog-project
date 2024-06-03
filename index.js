
const express = require('express');
const path = require('path');
const app = express();

const authRouter = require('./routers/authRouter');
const userRouter = require('./routers/userRouter');
const articleRouter = require('./routers/articleRouter');
const commentRouter = require('./routers/commentRouter');
const categoryRouter = require('./routers/categoryRouter');
const { isAuthorized, isAuthenticated } = require('./middleware/authMiddleware');

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); 

app.use('/api/v1', authRouter);
app.use('/api/v1', isAuthenticated, isAuthorized('admin', 'author', 'guest'), userRouter);
app.use('/api/v1', isAuthenticated, isAuthorized('author', 'guest'), articleRouter);
app.use('/api/v1', isAuthenticated, isAuthorized('author', 'admin'), commentRouter);
app.use('/api/v1', isAuthenticated, isAuthorized('admin'), categoryRouter);

module.exports = app;
