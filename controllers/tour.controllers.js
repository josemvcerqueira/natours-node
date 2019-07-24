import fs from 'fs';

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
);

export const checkId = (req, res, next, val) => {
  if (Number(val) > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid ID',
    });
  }
  next();
};

export const checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price',
    });
  }
  next();
};

export const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

export const getTour = (req, res) => {
  const id = Number(req.params.id);
  const tour = tours.find(el => el.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

export const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = {
    id: newId,
    ...req.body,
  };

  const updatedTours = [...tours, newTour];

  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(updatedTours),
    error => {
      if (error) {
        res.status(404).json({
          status: 'fail',
          data: {
            tour: error,
          },
        });
      } else {
        res.status(201).json({
          status: 'success',
          data: {
            tour: newTour,
          },
        });
      }
    },
  );
};

export const updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here ...>',
    },
  });
};

export const deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: {
      tour: null,
    },
  });
};
