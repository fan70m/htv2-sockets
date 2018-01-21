require('browser-sync')({
  server: './client',
});

require('nodemon')({
  script: './server/main.js',
});
