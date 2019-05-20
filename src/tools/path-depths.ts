import * as _ from 'lodash';
import * as path from 'path';
import * as R from 'ramda';

const getDepthOfAbsolutePath = (p: string): number =>
  _.split(p, path.sep).length - (p.startsWith(path.sep) ? 1 : 0);

const getRelativePathDepthChange = (relativePath: string): number =>
  R.pipe(
    (p: string) => _.split(p, path.sep),
    (arr: string[]) => _.filter(arr, el => el === '..'),
    (arr: string[]) => arr.length
  )(relativePath);

export const importRefersToRootModule = (
  srcFileAbsolutePath: string,
  workspaceFolderAbsolutePath: string,
  moduleImportRelativePath: string
) =>
  getDepthOfAbsolutePath(path.dirname(srcFileAbsolutePath)) -
    getDepthOfAbsolutePath(workspaceFolderAbsolutePath) -
    getRelativePathDepthChange(moduleImportRelativePath) <=
  1;

// console.log(getDepthOfAbsolutePath());
