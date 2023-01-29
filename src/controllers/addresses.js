const addressModel = require('../models/Address')

module.exports = function (app) {
    app.post('/address/create', function (req, res) {
        const userId = req.body.UserId
        const street = req.body.street
        const number = req.body.number
        const city = req.body.city
    
        const address = {
            street,
            number,
            city,
            userId,
        }
    
        addressModel.create(address)
            .then(res.redirect('/user/list'))
            .catch((err) => console.log(err))
    })

    app.post('/address/delete', function (req, res) {
        const id = req.body.id
        const userId = req.body.UserId
      
        addressModel.destroy({
          where: {
            id: id
          }
        })
        .then(res.redirect('/user/list'))
        .catch((err) => console.log(err))
      })
}