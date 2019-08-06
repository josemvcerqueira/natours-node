import Tour from '../models/tour.model';
import catchAsync from '../utils/catch-async';
import AppError from '../utils/app-error';

export const getOverview = catchAsync(async (req, res) => {
  const tours = await Tour.find();

  // 2) Build Template
  // 3) Render that template using tour data from 1

  res.status(200).render('overview', {
    title: 'All Tours',
    tours,
  });
});

export const getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });

  if (!tour) return next(new AppError('There is no tour with that name.', 404));

  res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    tour,
  });
});

export const getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Log into your account',
  });
};

export const getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your account',
  });
};
