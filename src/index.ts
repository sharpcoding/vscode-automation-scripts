import { absoluteImportsByRootModule } from './tools';

const commandLineArgs = require('command-line-args');
const commandLineOptionDefinitions = [
  { name: 'path', alias: 'p', type: String, defaultOption: true },
  {
    name: 'absolute-imports-by-root-module',
    alias: 'a',
    type: Boolean
  }
];
const options = commandLineArgs(commandLineOptionDefinitions);

if (options.path && options['absolute-imports-by-root-module']) {
  absoluteImportsByRootModule(options.path);
}
