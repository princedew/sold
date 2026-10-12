import { retry, handleWhen, ExponentialBackoff } from "cockatiel";

const retryOn = (error: unknown): boolean => {
  if (typeof error === "object" || error !== null) {
    return error.code === "ECONNRESET";
  }
};

export const retryExponentially = retry(handleWhen(retryOn), {
  maxAttempts: 3,
  backoff: new ExponentialBackoff(),
});


