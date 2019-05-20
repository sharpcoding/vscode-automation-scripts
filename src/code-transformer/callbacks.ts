export enum CallbackType {
  IMPORT_DETECTED = 'IMPORT_DETECTED'
}

export interface Callback {
  transformNodeValue: (node: any) => any;
}

export type Callbacks = { [key in CallbackType]?: Callback };
