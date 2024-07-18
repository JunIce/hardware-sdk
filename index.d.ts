import { RPC, PlayerControl, Pubsub } from "./type";

// global.d.ts
declare global {
  var RPC: RPC;
  var PlayerControl: PlayerControl;
  var pubsub: Pubsub;

  function setCookie(arg0: string, arg1: string, arg2: number) {
    throw new Error("Function not implemented.");
  }

  function _getSession(): string {}

  function BrowserType(): string {}

  function ajax(object: { url: string }): void;

  function loginError(object: any): void;

  interface Window {
    RPC: RPC;
    setIP: (s: string) => void;
  }
}
