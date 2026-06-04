// @ts-ignore
import { pem2jwk } from 'pem-jwk'

export function convertKey(pem: string, options: { use?: string, alg?: string, kid?: string } = {}) {
  if (!pem || !pem.trim()) {
    throw new Error('Empty PEM key');
  }

  const extras: Record<string, string> = {};
  if (options.use) extras.use = options.use;
  if (options.alg) extras.alg = options.alg;
  if (options.kid) extras.kid = options.kid;

  try {
    const jwk = pem2jwk(pem.trim(), extras);
    return JSON.stringify(jwk, null, 2);
  } catch (error) {
    throw new Error('Invalid PEM key format');
  }
}
