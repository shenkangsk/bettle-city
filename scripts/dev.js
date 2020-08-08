const execa = require('execa');

execa('webpack-dev-server', ['--config', './scripts/webpack.dev.config.js'], {
  stderr: 'inherit',
  stdin: 'inherit',
  stdout: 'inherit',
});
