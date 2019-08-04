export const getOverview = (req, res) => {
  res.status(200).render('overview', {
    title: 'All Tours',
  });
};

export const getTour = (req, res) => {
  res.status(200).render('tour', {
    title: 'The Forest Hiker Tour',
  });
};
