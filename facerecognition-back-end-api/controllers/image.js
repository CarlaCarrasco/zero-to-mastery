const Clarifai = require('clarifai'); 

const app = new Clarifai.App({
    apiKey: '6c46dc22769f4fd09b96c7ee63b28c73'
  })

  const handApiCall =  (req, res) => {
    app.models.
        predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('unable to work with API'));
  }

// put is better since we are updating profile 
const handleImage = (req, res, db) => {
    const { id } = req.body; 
    db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
      res.json(entries[0]);
  })
  .catch(err => res.status(400).json('unable to get entries'))

}

module.exports = {
    handleImage,
    handApiCall
};   