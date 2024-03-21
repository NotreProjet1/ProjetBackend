// app.js
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const participantRoutes = require('./routes/participantRoutes');
const courseRoutes = require('./routes/Coursroute');
const formationPRout = require('./routes/FormationPRoutes')
const ResourceRoute = require('./routes/RessourceRoute')
const AdminRoute = require('./routes/AdminRoute')
const coursgratuis = require('./routes/CoursGroute')
const publication = require('./routes/PublicationRoute')
const instructeur = require('./routes/instructeurRoutes')
const authMiddleware = require('./middleware/authMiddleware');
const path = require('path');

const port = process.env.PORT || 3001; 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Configuration de CORS
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/participant', participantRoutes);
app.use('/cours', coursgratuis);
app.use('/formationP', formationPRout);
app.use('/Resource', ResourceRoute);
app.use('/Admin', AdminRoute); 
app.use('/publication', publication); 
app.use('/instructeur', instructeur); 
const staticFilesPath = path.join(__dirname, 'upload');

// Servir les fichiers statiques depuis le dossier upload
app.use('/uploads', express.static(staticFilesPath));


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);      
});
