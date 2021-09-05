const authService = require('../services/authService')
const catchAsync = require('../utils/CatchAsync')

//Search the user in the db and authenticates them, returning their token
exports.loginUser = catchAsync(async(req, res, next) => {

    const user = await authService.loginUser(req)

    res.status(200).json({
        status: 'success',
        data: user
    })
})