// app.js
const express = require('express');
const bodyParser = require('body-parser');
const participantRoutes = require('./routes/participantRoutes');
const courseRoutes = require('./routes/Coursroute');
const formationPRout = require('./routes/FormationPRoutes')
const ResourceRoute = require('./routes/RessourceRoute')
const AdminRoute = require('./routes/AdminRoute')
const coursgratuis = require('./routes/CoursGroute')
const authMiddleware = require('./middleware/authMiddleware');
const app = express();
const port = process.env.PORT || 3001; 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/participant', participantRoutes);
app.use('/cours', coursgratuis);
app.use('/formationP', formationPRout);
app.use('/Resource', ResourceRoute);
app.use('/Admin', AdminRoute);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);      
});
