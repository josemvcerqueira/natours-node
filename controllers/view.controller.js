import Tour from '../models/tour.model';
import catchAsync from '../utils/catch-async';

export const getOverview = catchAsync(async (req, res) => {
  const tours = await Tour.find();

  // Todo 2) Build Template
  // Todo 3) Render that template using tour data from 1

  res.status(200).render('overview', {
    title: 'All Tours',
    tours,
  });
});

export const getTour = catchAsync(async (req, res) => {
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });

  res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    tour,
  });
});
