export const sortFeature = state => ({
  sort() {
    if (state.queryString.sort) {
      const sortBy = state.queryString.sort.split(',').join(' ');
      state.query = state.query.sort(sortBy);
    } else {
      state.query = state.query.sort('-createdAt');
    }
    return state;
  },
});

export const limitFeature = state => ({
  limitFields() {
    if (state.queryString.fields) {
      const fields = state.queryString.fields.split(',').join(' ');
      state.query = state.query.select(fields);
    } else {
      state.query = state.query.select('-__v');
    }
    return state;
  },
});

export const paginateFeature = state => ({
  paginate() {
    const page = parseFloat(state.page) || 1;
    const limit = state.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    state.query = state.query.skip(skip).limit(limit);

    return state;
  },
});

export const filterFeature = state => ({
  filter() {
    const queryObj = { ...state.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte?|lte?)\b/g, match => `$${match}`);
    state.query = state.query.find(JSON.parse(queryStr));
    return state;
  },
});
