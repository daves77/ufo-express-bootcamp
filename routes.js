import {
  read, write, edit, add,
} from './jsonStorage.js';

export const getAllSightings = (req, res) => {
  read((err, jsonObj) => {
    if (err) {
      res.status(500).send({ err });
      return;
    }
    const { sightings } = jsonObj;

    res.render('index', { sightings });
  });
};

export const getSightingByIndex = (req, res) => {
  const { index } = req.params;

  read((err, jsonObj) => {
    if (err) {
      res.status(404).send({ error: err });
    }
    const sighting = jsonObj.sightings[index];
    res.status(200).send({ message: 'successful' });
    res.render('sighting', sighting);
  });
};

export const postSightingForm = (req, res) => {
  add('sightings', req.body, (err, data) => {
    console.log('added');
    console.log(data);
  });
};

export const getSightingForm = (req, res) => {
  res.render('sighting-form');
};

export const getSightingsEditForm = (req, res) => {
  const { index } = req.params;
  read((err, jsonObj) => {
    if (err) {
      res.status(404).send({ err });
    }
    const sighting = jsonObj.sightings[index];
    res.render('sightings-edit-form', sighting);
  });
};
