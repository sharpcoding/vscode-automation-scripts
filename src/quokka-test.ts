import * as _ from 'lodash';
import * as path from 'path';
import * as fs from 'fs';
import * as R from 'ramda';

interface AnalyseRelativeModuleImportResult {
  dirChangers: string;
  moduleReference: string;
}

const analyseRelativeModuleImport = (
  importPath: string
): AnalyseRelativeModuleImportResult => {
  const piped = (equals: boolean) =>
    R.pipe(
      (p: string) => _.split(p, path.sep),
      (arr: string[]) =>
        _.filter(arr, el => (equals ? el === '..' : el !== '..')),
      (arr: string[]) => _.join(arr, path.sep)
    );

  return {
    dirChangers: piped(true)(importPath),
    moduleReference: piped(false)(importPath)
  } as AnalyseRelativeModuleImportResult;
};

const srcFilePath =
  '/Users/tms/projects/vscode-automation-scripts/demo/zoo/visitors/family.js';
const relativeImportPath = '../animals/amphibians/frogs-and-toads/tomato-frog';
const workspacePath = '/Users/tms/projects/vscode-automation-scripts';

console.log(path.resolve(srcFilePath, relativeImportPath));
