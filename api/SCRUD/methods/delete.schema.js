module.exports = function (req, res) {
  // if (!req.query || (Object.keys(req.query).length < 1)) return res.json({ error: "Invalid query" });
  req.schema.delete({
    id: req.params.id  
  }, function (error) {
    if (error) return res.json({ error: "Failed to delete based on id" });
    res.json({ success: true });
  });
};