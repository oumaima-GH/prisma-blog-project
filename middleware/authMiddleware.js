const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const express = require('express');
const {promisify} = require('util');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

const isAuthenticated = async (req, res, next) => {
    try {
    const bearer = req.header('Authorization');
    if (!bearer) {
        return res.status(401).json({ error: 'Unauthorized', message: 'Authorization header missing' });
    }
    let token = bearer.split(' ')[1];

    console.log("Token:", token);
   
        const verify = await promisify(jwt.verify)(token, SECRET_KEY);
        console.log("Verify:", verify);
        const currentUser = await prisma.user.findUnique({where:{id:verify.userId}});
       if (!currentUser) {
         return next(
        //    new AppError(
        //      'The user belonging to this token does no longer exist.',
        //      401
        //    )
        res.status(401).json({
            status : "fail",
            message : "The user belonging to this token does no longer exist."
       }))
       }
       req.user = currentUser;
        next();
    } catch (error) {
        console.error("Error authenticating user:", error);
        res.status(401).json({ error: 'Unauthorized', message: 'Invalid token' });
    }
};

const isAuthorized = (...roles) => {
    return (req, res, next) => {
        if (!req.user || (req.user && !req.user.role) || !roles.includes(req.user.role)) {
            return res.status(403).json({
                status: "fail",
                message: "You are not allowed to perform this action"
            });
        }
        console.log("Authorization details:", req.user);
        next();
    };
};

module.exports = { isAuthenticated, isAuthorized };

