import { magicLinkTokenStore } from "./magicLinkTokenStore";

export const checkToken = (token: string) => {
  let isToken = false;
  magicLinkTokenStore.forEach((obj) => {
    if (obj.token === token) {
      isToken = true;
      obj.token = null;
    }
  });

  return isToken;
};
