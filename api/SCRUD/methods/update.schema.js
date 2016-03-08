module.exports = function (req, res) {
  // if (!req.query || (Object.keys(req.query).length < 1)) return res.json({ error: "Invalid query" });
  req.schema.update({
    id: req.params.id
  }, req.body, function (error, _id) {
    if (error) return res.json({ error: "Failed to update based on schema and id" });
    res.json({
      id: _id
    });
  });
};