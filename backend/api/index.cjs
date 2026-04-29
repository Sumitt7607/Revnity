// This CommonJS wrapper lives in the /api folder.
// Vercel's modern native builder will process this flawlessly,
// entirely avoiding the legacy @vercel/node builder bugs.
module.exports = async function (req, res) {
  try {
    const serverModule = await import('../server.js');
    const app = serverModule.default;
    return app(req, res);
  } catch (error) {
    console.error("Failed to load server.js:", error);
    res.status(500).json({ error: "Server Initialization Error", details: error.message, stack: error.stack });
  }
};
