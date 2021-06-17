import { enc, AES, mode, pad, WordArray, DecryptedMessage } from 'crypto-js'

const PUBLIC_KEY: string = '1234123412ABCDEF'
const PUBLIC_IV: string = 'ABCDEF1234123412'

/**
 * 加密
 */
export const enCrypto = (word: string, key: string = PUBLIC_KEY, iv: string = PUBLIC_IV): string => {
  const _word = enc.Utf8.parse(word)
  const _key = enc.Utf8.parse(key)
  const _iv = enc.Utf8.parse(iv)

  const encrypted: WordArray = AES.encrypt(_word, _key, {
    iv: _iv,
    mode: mode.CBC,
    padding: pad.ZeroPadding
  })

  return enc.Base64.stringify(encrypted.ciphertext)
}

/**
 * 解密
 */
export const deCrypto = (word: string, key: string = PUBLIC_KEY, iv: string = PUBLIC_IV): string => {
  const _key = enc.Utf8.parse(key)
  const _iv = enc.Utf8.parse(iv)
  const base64 = enc.Base64.parse(word)
  const src: string = enc.Base64.stringify(base64)

  const decrypt: DecryptedMessage = AES.decrypt(src, _key, {
    iv: _iv,
    mode: mode.CBC,
    padding: pad.ZeroPadding
  })

  const decryptedStr: string = decrypt.toString(enc.Utf8)

  return decryptedStr.toString()
}
