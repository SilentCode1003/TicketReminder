import crypto from "crypto";
const algorithm = "aes-256-cbc";
const initVector = Buffer.alloc(16, "5LSOLUTIONS");
const Securitykey = Buffer.alloc(32, "DEV42FIRSTDEV");
const salt = "$2b$10$nsumtNnZ5fP5s5GHybnCu."; //bcrypt.genSaltSync(saltRound

export const Encrypter = (password) => {
  try {
    let cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);
    let encryptedData = cipher.update(password, "utf-8", "hex");
    encryptedData += cipher.final("hex");

    return encryptedData;
  } catch (error) {
    return error;
  }
};

export const Decrypter = (hash) => {
  try {
    let decipher = crypto.createDecipheriv(algorithm, Securitykey, initVector);
    let decryptedData = decipher.update(hash, "hex", "utf8");
    decryptedData += decipher.final("utf-8");

    return decryptedData;
  } catch (error) {
    return error;
  }
};
