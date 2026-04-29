let handler;
try {
  const serverModule = await import('../server.js');
  handler = serverModule.default;
} catch (error) {
  // If the server fails to load, this fallback function will run
  // and print the exact error message to the browser!
  handler = (req, res) => {
    res.status(500).json({
      message: "Server initialization failed",
      error: error.message,
      stack: error.stack
    });
  };
}

export default handler;
