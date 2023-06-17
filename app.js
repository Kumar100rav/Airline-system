// import dotenv from 'dotenv'
// dotenv.config()
// import express from 'express'
// import cors from 'cors'
// import connectDB from './config/connectdb.js'
// import connection  from 'mongoose'
// import userRoutes from './routes/userRoutes.js'
// const app = express()
// const port = process.env.port
// const DATABASE_URL=process.env.DATABASE_URL

// // cors policy
// app.use(cors())

// // database connection
// connectDB(DATABASE_URL)
// //JSON
// app.use(express.json())
// //Load Routes
// app.use("/api/user",userRoutes)

// app.listen(port, () => {
//     console.log(`Server listening at http://localhost:${port}`)
// })


import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import flash from 'connect-flash';
import passport from 'passport';

import userRoutes from './route/user.js';
import adminRoutes from './route/admin.js';

const app = express();
const port = 8000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/flight_booking', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));

// Middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/user', userRoutes);
app.use('/admin', adminRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
