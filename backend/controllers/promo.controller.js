export const validatePromo = (req, res) => {
  const { code } = req.body;
  const promos = {
    SAVE10: 0.1,
    FLAT100: 100,
  };

  if (promos[code]) res.json({ valid: true, discount: promos[code] });
  else res.status(400).json({ valid: false, message: "Invalid promo code" });
};
