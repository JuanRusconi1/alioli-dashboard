import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

export async function middleware (request) {
  const tokenAuth = request.cookies.get('tokenAuth')?.value
  if (tokenAuth === undefined) {
    if (request.nextUrl.pathname === '/') {
      return NextResponse.next()
      // return NextResponse.redirect(new URL('/principal', request.url))
    }
    return NextResponse.redirect(new URL('/', request.url))
  }
  try {
    const key = new TextEncoder().encode(process.env.SECRET_KEY_JWT)
    const { payload } = await jwtVerify(tokenAuth, key)

    if (request.nextUrl.pathname === '/') {
      return NextResponse.redirect(new URL('/principal', request.url))
    }
  } catch (error) {
    return NextResponse.redirect(new URL('/', request.url))
  }
  return NextResponse.next()
}
export const config = {
  matcher: ['/', '/principal/:path*', '/comandas/:path*', '/productos/:path*']
}
