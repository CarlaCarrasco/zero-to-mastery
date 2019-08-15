const handleProfileGet = (req, res, db) => {
    const { id } = req.params;
    // grab array of user from database with id value
    db.select('*').from('users').where({id}).then(user => {
        if(user.length){  // if there is an item in the array
            res.json(user[0]);
        }
        else { // if response provides an empty array user is not found
            res.status(400).json('Not Found!')
        }
    }) // Any other errors 
    .catch(err => res.status(400).json('Error getting user. '));
}

module.exports = {
    handleProfileGet
}; 