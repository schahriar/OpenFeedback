module.exports = function (req, res) {
  if (!req.schema.definition()) return res.json({ error: "Definition not found" });
  res.json(req.schema.definition());
};