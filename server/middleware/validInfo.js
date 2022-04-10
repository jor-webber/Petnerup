module.exports = (req, res, next) => {
  const { email, firstName, lastName, dateOfBirth, password } = req.body;

  function validEmail(userEmail) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  }

  if (req.path === '/register') {

    console.log(!email.length);
    if (![email, firstName, lastName, dateOfBirth, password].every(Boolean)) {
      return res.status(401).json({ msg: 'Missing Credentials' });
    } else if (!validEmail(email)) {
      return res.status(401).json({ msg: 'Invalid Email' });
    }

  } else if (req.path === '/login') {

    if (![email, password].every(Boolean)) {
      return res.status(401).json({ msg: 'Missing Credentials' });
    } else if (!validEmail(email)) {
      return res.status(401).json({ msg: 'Invalid Email' });
    }

  }

  next(); 
};
