import * as fs from 'fs';
import co from 'co';

import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import generate from '@babel/generator';

import { Callbacks, CallbackType } from './callbacks';

export const codeTransformer = (
  path: string,
  callbacks: Callbacks
): Promise<string> => {
  return co(function*() {
    const exists = fs.existsSync(path);

    if (!exists) {
      throw new Error(`File ${path} does not exist !`);
    }

    const contents = yield (path => cb => fs.readFile(path, 'utf8', cb))(path);
    const ast = parse(contents, {
      sourceType: 'module'
    });

    const getNodeType = path => {
      const {
        node: { type }
      } = path;
      return type;
    };

    const getParentNodeType = path => {
      const {
        parent: { type }
      } = path;
      return type;
    };

    traverse(ast, {
      enter(path) {
        if (
          getNodeType(path) === 'StringLiteral' &&
          getParentNodeType(path) === 'ImportDeclaration' &&
          callbacks[CallbackType.IMPORT_DETECTED]
        ) {
          path.node.value = callbacks[
            CallbackType.IMPORT_DETECTED
          ].transformNodeValue(path.node);
        }
      }
    });

    const { code } = generate(ast);
    return code;
  });
};
