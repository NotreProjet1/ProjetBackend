// app.js
const express = require('express');
const bodyParser = require('body-parser');
const participantRoutes = require('./routes/participantRoutes');
const courseRoutes = require('./routes/Coursroute');
const formationPRout = require('./routes/FormationPRoutes')
const formationGRout = require('./routes/FormationGRoutes')
const ResourceRoute = require('./routes/RessourceRoute')

const instructeurRoutes = require('./routes/instructeurRoutes') 
const authMiddleware = require('./middleware/authMiddleware');

const app = express();
const port = process.env.PORT || 3001;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/instructeur', instructeurRoutes);
app.use('/participants', participantRoutes);
app.use('/cours', courseRoutes);
app.use('/formationP', formationPRout);
app.use('/formationG', formationGRout);
app.use('/Resource', ResourceRoute);




app.listen(port, () => {
  console.log(`Server is running on port ${port}`);      
});
