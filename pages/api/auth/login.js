import { serialize } from 'cookie'
import jwt from 'jsonwebtoken'

export default async function loginHandler (req, res) {
  const user = req.body
  const data = await fetch('http://localhost:3500/api/user/login', {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
  if (data.ok) {
    const token = jwt.sign({
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7),
      username: user.name
    }, process.env.SECRET_KEY_JWT, {
      algorithm: 'HS256',
      allowInsecureKeySizes: true
    })
    const serializedToken = serialize('tokenAuth', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 7,
      path: '/'
    })
    res.setHeader('Set-Cookie', serializedToken)
    return res.json({ ok: true, status: 200 })
  }

  return res.json({ ok: false, status: 401 })
}
