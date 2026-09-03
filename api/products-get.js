module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if(req.method === 'OPTIONS') return res.status(200).end();
  try {
    const r = await fetch(`${process.env.UPSTASH_REDIS_REST_URL}/get/lwn_products`, {
      headers: { 'Authorization': `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}` }
    });
    const d = await r.json();
    let products = [];
    if(d.result) {
      const parsed = JSON.parse(d.result);
      products = Array.isArray(parsed) ? parsed : JSON.parse(parsed);
    }
    return res.status(200).json({ products });
  } catch(err) {
    return res.status(200).json({ products: [] });
  }
};
