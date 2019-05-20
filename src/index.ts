import { rootModuleAbsoluteImportPaths } from './tools';

const commandLineArgs = require('command-line-args');
const commandLineOptionDefinitions = [
  { name: 'path', alias: 'p', type: String, defaultOption: true },
  {
    name: 'absolute-imports-by-root-module',
    alias: 'a',
    type: Boolean
  },
  {
    name: 'workspace-folder',
    type: String
  }
];
const options = commandLineArgs(commandLineOptionDefinitions);

if (
  options.path &&
  options['absolute-imports-by-root-module'] &&
  options['workspace-folder']
) {
  rootModuleAbsoluteImportPaths(options.path, options['workspace-folder']);
}
