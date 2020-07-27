// Microbundle handles this
declare const __DEV__: boolean;

declare module '@ngard/tiny-get' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export function get(object: any, path: string | Array<string>, defaultValue?: any): any;
}
