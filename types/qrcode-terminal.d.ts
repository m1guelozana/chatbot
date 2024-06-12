declare module 'qrcode-terminal' {
  interface GenerateOptions {
    small?: boolean;
  }

  function generate(qr: string, options?: GenerateOptions): void;

  export { generate };
}