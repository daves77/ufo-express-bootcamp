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
    res.render('sighting', { ...sighting, index });
  });
};

export const postSightingForm = (req, res) => {
  add('sightings', { ...req.body, date_created: new Date() }, (err, data) => {
    const parsedData = JSON.parse(data);
    res.redirect(`/sighting/${parsedData.sightings.length - 1}`);
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
    res.render('sightings-edit-form', { ...sighting, index });
  });
};

export const editSightings = (req, res) => {
  const { index } = req.params;
  console.log(index, 'editing this index');
  const readCallback = (err, jsonObj) => {
    console.log(jsonObj);
    jsonObj.sightings[index] = req.body;
  };

  edit(readCallback, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    res.redirect(`/sighting/${index}`);
  });
};

export const getSightingsShapeList = (req, res) => {
  read((err, jsonObj) => {
    if (err) {
      console.log(err);
    }

    const shapesArray = [
      ...new Set(
        jsonObj.sightings.map((sighting) => sighting.shape.toLowerCase()),
      ),
    ];

    res.render('shapes-list', { shapes: shapesArray });
  });
};

export const getSightingsByShape = (req, res) => {
  const { shape } = req.params;
  read((err, jsonObj) => {
    const sightings = jsonObj.sightings.filter((sighting) => sighting.shape.toLowerCase().includes(shape));
    res.render('shapes', { sightings, shape });
  });
};

export const deleteSighting = (req, res) => {
  const { index } = req.params;

  const handleReadCallback = (err, jsonObj) => {
    jsonObj.sightings.splice(index);
  };

  edit(handleReadCallback, (err) => console.log(err));

  res.redirect('/');
};
