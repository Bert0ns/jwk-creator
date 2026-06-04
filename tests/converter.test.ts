import { describe, it, expect } from 'vitest';
import { convertKey } from '../src/converter';

describe('Converter Module', () => {
  const sampleRsaPublicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAu1SU1LfVLPHCozMxH2Mo
4lgOEePzNm0tRgeLezV6ffAt0gunVTLw7onLRnrq0/IzW7yO739s5F56c1f/G1jF
V12+rZt+5Z2Hh3fD0F+E4fR6Y9n6sO7fCq9x7U1zF7o0H+M5e7K6/Xm7Y8H+pW4c
/O6Fw5j7L9v9E+s4Q4R8v/t+W5T+8/X9M9K6S7+hV7h0B2vT7V2e1+c8U1H8n/F7
R9W9/zV8V8L+v3k1J5V3y4l4bX5W/W5g+bO5g4G0+T4+xZ/K1w5a8v9l/m8c+Q8L
5c/M9v1Z+b+Q4r8w7H7L+D2u6q7V4s9f9/b5Y3j4s6F8r+a2c+K+L3j5X/D5X+E5
JwIDAQAB
-----END PUBLIC KEY-----`;

  it('should successfully convert a valid PEM public key to JWK', () => {
    const resultJson = convertKey(sampleRsaPublicKey);
    const result = JSON.parse(resultJson);
    
    expect(result).toHaveProperty('kty', 'RSA');
    expect(result).toHaveProperty('n');
    expect(result).toHaveProperty('e', 'AQAB');
  });

  it('should include optional parameters in the output JWK', () => {
    const resultJson = convertKey(sampleRsaPublicKey, {
      use: 'sig',
      alg: 'RS256',
      kid: 'test-key-id'
    });
    const result = JSON.parse(resultJson);

    expect(result).toHaveProperty('use', 'sig');
    expect(result).toHaveProperty('alg', 'RS256');
    expect(result).toHaveProperty('kid', 'test-key-id');
  });

  it('should throw an error for an empty string', () => {
    expect(() => convertKey('')).toThrowError('Empty PEM key');
    expect(() => convertKey('   ')).toThrowError('Empty PEM key');
  });

  it('should throw an error for an invalid PEM format', () => {
    expect(() => convertKey('INVALID PEM DATA')).toThrowError('Invalid PEM key format');
  });
});
