const handleSignin = (req, res, db, bcrypt) => {
    const {email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json('Invalid Registration');
    }
    db.select('email', 'hash').from('login') // select email and password from login page
        .where('email', '=', email)
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].hash); // check is password is correct using bycrpt
            if(isValid) { // if password is true do the following
                return db.select('*').from('users')
                    .where('email', '=', email) // match email given w/ email in db
                    .then(user => {
                        res.json(user[0]); // return user object 
                    })
                    .catch(err => res.status(400).json('unable to get user')) // if issue with getting user information
            }
            else { // if password is invalid return this message
                res.status(400).json('Wrong Credentials')
            }
        })
}

module.exports = {
    handleSignin
}; 