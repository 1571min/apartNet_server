import * as crypto from 'crypto';

export const AesEncrypt = {
  encrypt: (str:string, master: string) => {
    const iv = crypto.randomBytes(16)

    const salt = crypto.randomBytes(64)

    const key = crypto.pbkdf2Sync(master, salt,2020,32, 'sha512')

    const cipher = crypto.createCipheriv('aes-256-gcm',key,iv)
    const encryptedStr = Buffer.concat([cipher.update(str,'utf8'),cipher.final()])
    const authTag = cipher.getAuthTag()
    return Buffer.concat([salt,iv,authTag,encryptedStr]).toString('base64')
  },

  decrypt: (encryptPw: string, master:string)=> {
    const binaryData = Buffer.from(encryptPw,'base64')

    const salt = binaryData.slice(0,64)
    const iv = binaryData.slice(64,80)
    const authTag = binaryData.slice(80,96)
    const text = binaryData.slice(96)

    const key = crypto.pbkdf2Sync(master, salt,2020,32, 'sha512')

    const deCipher = crypto.createDecipheriv('aes-256-gcm',key,iv)
    deCipher.setAuthTag(authTag)
    const decrypted = deCipher.update(text, 'binary', 'utf8') + deCipher.final('utf8');

    return decrypted;
  }
}

const encrypt = AesEncrypt.encrypt('hello world','apartnet')
console.log(encrypt)
const decrypt = AesEncrypt.decrypt(encrypt,'apartnet')
console.log(decrypt)