import express from 'express';
import methodOverride from 'method-override';

import {
  getAllSightings, getSightingForm, postSightingForm, getSightingByIndex, getSightingsEditForm, editSightings, getSightingsShapeList, getSightingsByShape, deleteSighting,
} from './routes.js';

const PORT = 3001;

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));

app.get('/', getAllSightings);
app.get('/sighting', getSightingForm);
app.post('/sighting', postSightingForm);
app.put('/sighting/:index/edit', editSightings);
app.get('/sighting/:index', getSightingByIndex);
app.get('/sighting/:index/edit', getSightingsEditForm);
app.get('/shapes', getSightingsShapeList);
app.get('/shapes/:shape', getSightingsByShape);
app.delete('/sighting/:index/delete', deleteSighting);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
