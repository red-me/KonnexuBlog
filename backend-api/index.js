const express = require('express')
const cors = require('cors');
//const bodyParser = require('body-parser');
const app = express();


const bootstrap= require("./tasks/bootstrap.js")


// Init Middleware
app.use(express.json());

// Reordered middleware setup to resolve issues

/* app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true })); */
app.use(express.urlencoded({extended: true})); 
app.use(express.json());   
app.use(cors());


// accept nginx header values
app.set('trust proxy', true);


//Add rate limiter to all routes
/* const {limit3x10}} = require("./middleware/ratelimit");
app.use(limit3x10); */


const PORT = process.env.PORT || 3023;



const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()



const path = require('path')


// These urls should later be protected from unauthorized users///
/* app.use('/apps', express.static(path.join(__dirname,  './protected/apps')))
app.use('/plugins', express.static(path.join(__dirname, './protected/plugins')))
app.use('/themes', express.static(path.join(__dirname, 'protected/themes')))
app.use('/profiles', express.static(path.join(__dirname, 'protected/profiles')))
 */


// requests logs
app.use((req, res, next) => {
  console.log(`➡️  [${req.method}] ${req.originalUrl}  ⌚ ${(new Date()).toLocaleString()}`);
  
  next();
})


const LoadRoutes = () => {


  app.use('/files', require('./routes/files.js'));
  app.use('/api/user', require('./routes/users'));
  app.use('/api/usergroups', require('./routes/userGroups'));
  app.use('/api/feed', require('./routes/feeds'));
  app.use('/api/post', require('./routes/posts'));
  app.use('/api/postcategories', require('./routes/postCategories'));
  app.use('/api/file', require('./routes/uploads'));
  app.use('/api/app', require('./routes/apps'));
  app.use('/api/theme', require('./routes/themes'));
  app.use('/api/menu', require('./routes/menus'));

}

LoadRoutes()


// reserved
const getIpFromRequest = req => {
  let ips = (
    req.headers['cf-connecting-ip'] ||
    req.headers['x-real-ip'] ||
    req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress || ''
  ).split(',');

  return ips[0].trim();
};


//echo test api
app.get('/', (req, res) => {
  res.send('Hello World! Your IP is: ' + req.ip);
});

bootstrap();

app.listen(PORT, () => console.log(`
🚀 Server ready at: http://localhost:${PORT}
⭐️ This is Konnexu.`));

