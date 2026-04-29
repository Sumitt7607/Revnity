// This is a CommonJS wrapper for Vercel.
// Vercel's lambda builder often crashes with "FUNCTION_INVOCATION_FAILED" 
// when trying to require() an ES Module ("type": "module" in package.json).
// This wrapper uses CommonJS syntax to satisfy Vercel, and dynamically
// imports the ES Module Express app at runtime.

module.exports = async function (req, res) {
  try {
    const serverModule = await import('./server.js');
    const app = serverModule.default;
    return app(req, res);
  } catch (error) {
    console.error("Failed to load server.js:", error);
    res.status(500).json({ error: "Server Initialization Error", details: error.message });
  }
};
