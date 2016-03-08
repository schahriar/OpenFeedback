module.exports = function (req, res) {
  req.schema.create(req.body, function (error, _id) {
    if (error) return res.json({ error: "Failed to create based on schema" });
    res.json({
      id: _id
    });
  });
};