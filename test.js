const express = require('express');
const http = require('http');



app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

const server = app.listen(4000, () => {
  console.log('Server started on port 4000');

  const req = http.request(
    { hostname: 'localhost', port: 4000, path: '/health', method: 'GET' },
    (res) => {
      if (res.statusCode === 200) {
        console.log('Health check passed: app is healthy');
        server.close(() => process.exit(0));
      } else {
        console.error(`Health check failed: status ${res.statusCode}`);
        server.close(() => process.exit(1));
      }
    }
  );

  req.on('error', (err) => {
    console.error('Health check failed:', err.message);
    server.close(() => process.exit(1));
  });

  req.end();
});

server.on('error', (err) => {
  console.error('Server failed to start:', err.message);
  process.exit(1);
});
