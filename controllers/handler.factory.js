import catchAsync from '../utils/catch-async';
import AppError from '../utils/app-error';
import {
  filterFeature,
  sortFeature,
  limitFeature,
  paginateFeature,
} from '../utils/api-features';

export const deleteOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) return next(new AppError('No document found with that ID', 404));

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

export const updateOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) return next(new AppError('No document found with that ID', 404));

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

export const createOne = Model =>
  catchAsync(async (req, res) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

export const getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) return next(new AppError('No document found with that ID', 404));

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

export const getAll = Model =>
  catchAsync(async (req, res) => {
    function Features(query, queryString) {
      const feature = {
        query,
        queryString,
      };

      return Object.assign(
        feature,
        filterFeature(feature),
        sortFeature(feature),
        limitFeature(feature),
        paginateFeature(feature),
      );
    }

    // To allow for nested Get reviws on tours
    let filter = {};
    if (req.params.tourId) filter = { tour: req.params.tourId };

    const features = new Features(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const doc = await features.query;

    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        data: doc,
      },
    });
  });
