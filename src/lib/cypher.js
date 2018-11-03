import crypto from "crypto";
const Buffer = require("buffer/").Buffer;

export function encrypt(raw,secKey) {
  const encrypted = crypto.privateEncrypt(secKey, new Buffer.from(raw));
  return encrypted.toString("base64");
}

export function decrypt(encrypted, publicKey) {
  const decrypted = crypto.publicDecrypt(
    publicKey,
    new Buffer.from(encrypted, "base64")
  );
  return decrypted.toString("utf8");
}
