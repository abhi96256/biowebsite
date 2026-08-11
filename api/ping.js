module.exports = async (req, res) => {
  // Optional secret to avoid random abuse
  const expected = process.env.CRON_SECRET;
  if (expected) {
    const provided = req.headers["x-cron-secret"];
    if (provided !== expected) {
      return res.status(401).json({ ok: false, error: "unauthorized" });
    }
  }

  const target =
    process.env.BACKEND_HEALTH_URL ||
    "https://ias-website-api.onrender.com/api/health";

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    const response = await fetch(target, { method: "GET", signal: controller.signal });
    clearTimeout(timeout);
    const bodyText = await response.text();
    return res.status(200).json({
      ok: response.ok,
      status: response.status,
      target,
      body: bodyText.slice(0, 200),
      at: new Date().toISOString(),
    });
  } catch (error) {
    const isTimeout = error?.name === "AbortError";
    return res.status(isTimeout ? 504 : 500).json({
      ok: false,
      target,
      error: isTimeout ? "ping timeout (backend sleeping/cold start)" : (error.message || "ping failed"),
      at: new Date().toISOString(),
    });
  }
};
