import express from 'express';

import {
  getAllSightings, getSightingForm, postSightingForm, getSightingByIndex, getSightingsEditForm,
} from './routes.js';

const PORT = 3001;

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.get('/', getAllSightings);
app.get('/sighting', getSightingForm);
app.post('/sighting', postSightingForm);
app.get('/sighting/:index', getSightingByIndex);
app.get('/sighting/:index/edit', getSightingsEditForm);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
