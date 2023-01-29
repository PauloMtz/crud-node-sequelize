const Address = require('../models/Address')
const userModel = require('../models/User')

module.exports = function (app) {
    // load homepage
    app.get('/', (req, res) => {
        res.render('home')
    })

    // load user form add
    app.get('/user/create', function (req, res) {
        res.render('adduser')
    })

    // create the user
    app.post('/user/create', function (req, res) {
        const name = req.body.name
        const occupation = req.body.occupation
        let newsletter = req.body.newsletter
      
        if (newsletter === 'on') {
          newsletter = true
        } else {
            newsletter = false
        }
        
        // this create method is equals to insert into table values
        userModel.create({ name, occupation, newsletter })
      
        res.redirect('/user/list')
    })

    // show users list
    app.get("/user/list", (req, res) => {
        // this findAll is equals to 'SELECT * FROM users'
        userModel.findAll({
            raw: true,
            order: [["name", "ASC"]],
          })
          .then((users) => {
            res.render('listusers', {
              users_view: users,
            });
        });
    });

    // load user details (just one user)
    app.get('/user/:id', function (req, res) {
        const id = req.params.id
      
        userModel.findOne({
          include: Address,
          where: {
            id: id,
          },
        })
        .then((user) => {
        console.log(user)
        res.render('userdetails', { user: user.get({ plain: true }) })
        })
        .catch((err) => console.log(err))
    })

    app.get('/user/delete/:id', function (req, res) {
      const id = req.params.id
    
      userModel.destroy({
        where: {
          id: id,
        },
      })
        .then((user) => {
          res.redirect('/user/list')
        })
        .catch((err) => console.log(err))
    })

    // load edit form
    app.get('/user/edit/:id', function (req, res) {
      const id = req.params.id
    
      userModel.findOne({
        include: Address,
        where: {
          id: id,
        },
      })
      .then((user) => {
        console.log(user)
        res.render('useredit', { user: user.get({ plain: true }) }) // get user
      })
      .catch((err) => console.log(err))
    })

    // update data
    app.post('/user/edit', function (req, res) {
      const id = req.body.id
      const name = req.body.name
      const occupation = req.body.occupation
      let newsletter = req.body.newsletter
    
      if (newsletter === 'on') {
        newsletter = true
      } else {
        newsletter = false
      }
    
      const userData = {
        id,
        name,
        occupation,
        newsletter,
      }
    
      userModel.update(userData, {
        where: {
          id: id,
        },
      })
        .then((user) => {
          console.log(user)
          res.redirect('/user/list')
        })
        .catch((err) => console.log(err))
    })
}