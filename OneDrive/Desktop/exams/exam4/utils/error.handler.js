const responscha = require("../utils/response")

const errorHandler = (func) => {
    return (req, res, next) => {
        func(req, res, next).catch((err) => {
            console.log(err, "errorcha");
            responscha(res, 404, 'Xatolik: ' + err.message);
        });
    };
};

const authErrorHandler = (func) => {
    return (req, res, next) => {
        func(req, res, next).catch((err) => {
            console.log(err, "errorcha");
            responscha(res, 401, 'Xatolik: ' + err.message);
        });
    };
};

const serverErrorHandler = (func) => {
    return (req, res, next) => {
        func(req, res, next).catch((err) => {
            console.log(err, "errorcha");
            responscha(res, 500, 'Server xatosi: ' + err.message);
        });
    };
};


module.exports = { errorHandler, authErrorHandler, serverErrorHandler };
