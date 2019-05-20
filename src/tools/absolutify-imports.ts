import co from 'co';
import { codeTransformer } from '../code-transformer';

export const absolutifyImports = (path: string) => {
  co(function*() {
    const transformResult = yield codeTransformer(path, {
      IMPORT_DETECTED: {
        transformNodeValue: node => {
          return 'surprise_import';
          // return node.value;
        }
      }
    });
    console.log(transformResult);
  });
};
