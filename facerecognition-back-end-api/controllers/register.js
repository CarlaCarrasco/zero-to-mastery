const handleRegister = (req, res, db, bcrypt) => {
    const { email, name, password} = req.body;
    if (!email || !name || !password) {
        return res.status(400).json('Invalid Registration');
    }
    const hash = bcrypt.hashSync(password); 
        // Create transation because we need to do more than two things at once
        // user trx object instead of db to perform operation
        db.transaction(trx => { 
            // instert into login
            trx.insert({
                hash: hash,
                email: email
            })
            .into('login')
            .returning('email') // return email
            .then(loginEmail => { // User login email to return another transaciton
                // database communicates w/ server and registers user
                return trx('users') // return another transation
                .returning('*') // insert into users
                .insert({
                    email: loginEmail[0],
                    name: name,
                    joined: new Date()
                })
                .then(user => {
                    res.json(user[0]); 
                })
            })
            .then(trx.commit) // commit to changes
            .catch(trx.rollback) // If error w/ transaction rollback changes
        })
        // Catch error if user information is incorrect 
        // And account could not be created
        .catch(err => res.status(400).json('Agh! Sorry, we are unable to register your account. :['))
}

module.exports = {
    handleRegister: handleRegister
}; 