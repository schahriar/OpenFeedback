module.exports = function (req, res) {
  if (req.params.id) {
    // Find one
    req.schema.get({
      id: req.params.id
    }, function (error, item) {
      if (error) return res.json({ error: "Failed to fetch item based on id"});
      if (!item) return res.json({ error: "Item not found"});
      res.json({ item: item });
    });
  } else {
    // Find all (search)
    if (!req.query || (Object.keys(req.query).length < 1)) return res.json({ error: "Invalid query" });
    req.schema.search(req.query, function (error, items) {
      if (error) return res.json({ error: "Failed to fetch items based on query"});
      res.json({ items: items });
    });
  }
};