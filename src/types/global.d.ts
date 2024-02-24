interface ImportMeta {
  env: {
    [key: string]: string;
  };
}

type Brand<K, T> = K & { __brand: T };

declare module '*.svg' {
  const content: string;
  export default content;
}
