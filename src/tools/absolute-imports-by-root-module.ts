import co from 'co';
import * as _ from 'lodash';
import * as path from 'path';
import * as R from 'ramda';
import { codeTransformer } from '../code-transformer';

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

const getAbsoluteImportPathByRootModule = (
  srcFilePath: string,
  relativeImportPath: string
): string => {
  if (path.isAbsolute(srcFilePath)) return relativeImportPath;
  const srcFileDirectory = path.dirname(srcFilePath);
  const pathAnalysis = analyseRelativeModuleImport(relativeImportPath);
  const moduleBaseName = path.basename(
    path.join(srcFileDirectory, pathAnalysis.dirChangers)
  );
  return path.join(moduleBaseName, pathAnalysis.moduleReference);
};

// console.log(
//   getAbsoluteImportPathByRootModule(
//     '/Users/tms/projects/vscode-automation-scripts/demo/zoo/visitors/family.js',
//     '../animals/amphibians/frogs-and-toads/golden-mantella'
//   )
// );

export const absoluteImportsByRootModule = (srcFilePath: string) => {
  co(function*() {
    const transformResult = yield codeTransformer(srcFilePath, {
      IMPORT_DETECTED: {
        transformNodeValue: node => {
          return getAbsoluteImportPathByRootModule(srcFilePath, node.value);
        }
      }
    });
    console.log(transformResult);
  });
};
