const intentionalError = (req, res, next) => {
    const err = Error('Intentional 500 error')
    err.status = 500  // Explicitly set the error status 
    next(err);
  }
  
  module.exports = intentionalError