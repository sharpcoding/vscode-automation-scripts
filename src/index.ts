import { absolutifyImports } from './tools';

const commandLineArgs = require('command-line-args');
const commandLineOptionDefinitions = [
  { name: 'path', alias: 'p', type: String, defaultOption: true },
  {
    name: 'absolutify-imports',
    alias: 'a',
    type: Boolean
  }
];
const options = commandLineArgs(commandLineOptionDefinitions);

if (options.path && options['absolutify-imports']) {
  absolutifyImports(options.path);
}
