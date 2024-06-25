import test from 'ava'
// import { writeFile } from 'node:fs/promises'
import { generateSecretKey, checkUserOTP } from '../../src/modules/2fa'

test('generateSecretKey', async (t) => {
  const { qrcode, secret } = generateSecretKey('My Secure Web App', 'username')

  // await writeFile('2fa.txt', qrcode)

  t.is(typeof qrcode, 'string')
  t.is(typeof secret, 'string')
})

test('validateToken', (t) => {
  const invalid = checkUserOTP('secret', '274650')
  t.false(invalid)
})
