const app = require('./src/config/server')

app.listen(3000, function () {
    console.log('Application running at http://localhost:3000/')
})

/* -------------------------------------------------------------------------------------------------
    INSTALATIONS***
    - npm init -y                             ---> start application with default configuration
    - npm install --save-dev nodemon          ---> script to run app (package.json)
                                                1. start --> npm start      (run the app)
                                                2. serve --> npm run serve  (run the app)
    - npm install express express-handlebars  ---> framework express and template engine handlebars
    - npm install consign                     ---> for controllers
    - npm install sequelize mysql2            ---> for database (with sequelize)
    
    - npm install mysql                       ---> for mysql without sequelize
--------------------------------------------------------------------------------------------------- */