var env = process.env.NODE_ENV || 'development';

if (env === 'development') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://shubham:123thedude@ds018848.mlab.com:18848/todoapp2';
} else if (env === 'test') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://shubham:123thedude@ds247101.mlab.com:47101/todoapp2test';
}
