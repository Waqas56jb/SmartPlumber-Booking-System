// i re export the app for serverless entry so vercel hits the same express instance
const app = require('../server');
module.exports = app;
