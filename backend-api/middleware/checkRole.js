
//role: [string]
module.exports = function (...roles) {
  return (req, res, next) => {
    if(!roles||roles.length==0) next();// nothing happened
    
    if (!req.user) {
      return res.status(401).json({ msg: 'No token, authorization denied.' });
    }

    // Verify role access of current user
    try {
      if (  roles.indexOf(req.user.role)==-1) {
        return res.status(401).json({ msg: 'Unauthorized access.' });
      } else {
    
        next();
      }
    } catch (err) {
      console.error('something wrong with role check middleware');
      res.status(500).json({ msg: 'Server Error' });
    }
  };
};
