interface ImportMeta {
  env: {
    [key: string]: string;
  };
}

declare module '*.svg' {
  const content: string;
  export default content;
}
