const fs = require('fs');
const User = require('./../models/userModel');

// Request handlers
exports.getAllUsers = async (req, res) => {
    try {
        const queryObj = {...req.query};
        const excludeFields = ['page','sort','limit','fields'];
        excludeFields.forEach(field => delete queryObj[field]);

        const users = await User.find(queryObj);
        res.status(200).json({
            status: 'success',
            results: users.length,
            data: {
                users: users
            }
        })
    } catch (error) {
        res.status(400).json({
            status: 'error',
            data: error
        })
    }
};

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: {
                user: user
            }
        })
    } catch (error) {
        res.status(400).json({
            status: 'error',
            data: error
        })
    }
};

exports.createUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(200).json({
            status: 'success',
            data: {
                user: newUser
            }
        })
    } catch (error) {
        res.status(400).json({
            status: 'error',
            data: error
        })   
    }
};

exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: 'success',
            data: {
                user: user
            }
        })
    } catch (error) {
        res.status(400).json({
            status: 'error',
            data: error
        })   
    }
};

exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        
        res.status(204).json({
            status: 'success',
            data: null
        })
    } catch (error) {
        res.status(400).json({
            status: 'error',
            data: error
        })   
    }
};