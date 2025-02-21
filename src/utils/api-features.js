export const createApiFeatures = (query, queryStr) => {
  let modifiedQuery = query;

  const filter = () => {
    const queryObj = { ...queryStr };
    ['page', 'sort', 'limit', 'fields'].forEach((el) => delete queryObj[el]);

    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    modifiedQuery = modifiedQuery.find(JSON.parse(queryString));
    return self();
  };

  const sort = () => {
    if (queryStr.sort) {
      const sortBy = queryStr.sort.split(',').join(' ');
      modifiedQuery = modifiedQuery.sort(sortBy);
    } else {
      modifiedQuery = modifiedQuery.sort('-createdAt');
    }
    return self();
  };

  const paginate = () => {
    const page = queryStr.page * 1 || 1;
    const limit = queryStr.limit * 1 || 100;
    const skip = (page - 1) * limit;

    modifiedQuery = modifiedQuery.skip(skip).limit(limit);
    return self();
  };

  const self = () => ({ filter, sort, paginate, exec: () => modifiedQuery });

  return self();
};
