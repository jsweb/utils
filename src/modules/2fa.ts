import { TOTP } from 'otpauth'
import QRCode from 'qrcode-svg'

/**
 * Generates a user secret key for a two-factor authentication (2FA) system.
 * Returns the secret key along with a QR code image for authenticator app activation.
 *
 * @param {string} app - The name of the application for which the secret key is generated.
 * @param {string} user - The username of the user for whom the secret key is generated.
 * @return {Promise<{secret: string, qrcode: string}>} - A promise that resolves to an object containing the secret key and the QR code image encoded in base64 format for browsers.
 */
export async function generateSecretKey(
  app: string,
  user: string
): Promise<{ secret: string; qrcode: string }> {
  const totp = new TOTP({ issuer: app, label: user })
  const uri = totp.toString()

  const qrcode = new QRCode(uri)
  const svg = qrcode.svg().replace(/\s{2,}/g, '')
  const b64 = Buffer.from(svg).toString('base64')

  return {
    secret: totp.secret.base32,
    qrcode: `data:image/svg+xml;base64,${b64}`,
  }
}

/**
 * Checks if the user-entered OTP is valid for the given secret key.
 *
 * @param {string} secret - The secret key for generating OTP.
 * @param {string} otp - The one-time password entered by the user.
 * @return {boolean} Whether the OTP is valid or not.
 */
export function checkUserOTP(secret: string, otp: string): boolean {
  const totp = new TOTP({ secret })
  const valid = totp.validate({ token: otp })

  return Number.isFinite(valid)
}
