const execa = require('execa');

execa('webpack', ['--config', './scripts/webpack.config.js'], {
  stdout: 'inherit',
  stdin: 'inherit',
  stderr: 'inherit',
});
