import co from 'co';
import * as _ from 'lodash';
import * as path from 'path';
import * as R from 'ramda';
import { codeTransformer } from '../code-transformer';
import { importRefersToRootModule } from './path-depths';

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

const looksLikeNodeModulesImport = (relativeImportPath): boolean =>
  _.split(relativeImportPath, path.sep).length === 1;

const getAbsoluteImportPathByRootModule = (
  srcFileAbsolutePath: string,
  workspaceFolderAbsolutePath: string,
  moduleImportRelativePath: string
): string => {
  if (looksLikeNodeModulesImport(moduleImportRelativePath)) {
    return moduleImportRelativePath;
  }
  const srcFileDirectory = path.dirname(srcFileAbsolutePath);
  const pathAnalysis = analyseRelativeModuleImport(moduleImportRelativePath);
  const moduleBaseName = path.basename(
    path.join(srcFileDirectory, pathAnalysis.dirChangers)
  );
  const refersToRootModule = importRefersToRootModule(
    srcFileAbsolutePath,
    workspaceFolderAbsolutePath,
    moduleImportRelativePath
  );
  const modifier = refersToRootModule ? '' : '{rel_path_to_root_module}/';
  return `${modifier}${path.join(
    moduleBaseName,
    pathAnalysis.moduleReference
  )}`;
};

export const absoluteImportsByRootModule = (
  srcFileAbsolutePath: string,
  workspaceFolderAbsolutePath: string
) => {
  co(function*() {
    const transformResult = yield codeTransformer(srcFileAbsolutePath, {
      IMPORT_DETECTED: {
        transformNodeValue: node => {
          return getAbsoluteImportPathByRootModule(
            srcFileAbsolutePath,
            workspaceFolderAbsolutePath,
            node.value
          );
        }
      }
    });
    console.log(transformResult);
  });
};
