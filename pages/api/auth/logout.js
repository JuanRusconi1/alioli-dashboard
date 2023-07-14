import { verify } from 'jsonwebtoken'
import { serialize } from 'cookie'

export default function logoutHandler (req, res) {
  const { tokenAuth } = req.cookies
  if (!tokenAuth) {
    return res.json({ status: 401, error: 'no token' })
  }
  try {
    verify(tokenAuth, process.env.SECRET_KEY_JWT)
    const serializedToken = serialize('tokenAuth', null, {
      httpOnly: true,
      path: '/',
      maxAge: 0
    })
    res.setHeader('Set-Cookie', serializedToken)
    res.json({ ok: true, status: 200 })
  } catch (error) {
    return res.json({ status: 401, error: 'invalid token' })
  }
}
