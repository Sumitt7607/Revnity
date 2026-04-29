export default async function handler(req, res) {
  try {
    // Dynamically import the server to catch ANY initialization errors
    const serverModule = await import('../server.js');
    const app = serverModule.default;
    
    // Pass the request to the Express app
    return app(req, res);
  } catch (error) {
    // If anything crashes, return the exact error to the browser
    return res.status(500).json({
      error: "SERVER_CRASH",
      message: error.message,
      stack: error.stack
    });
  }
}
