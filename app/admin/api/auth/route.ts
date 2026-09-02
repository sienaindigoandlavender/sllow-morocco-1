import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { password } = await request.json()

    // SECURITY FIX: password now comes from an environment variable,
    // never hardcoded in the source. Set ADMIN_PASSWORD in Vercel
    // (Settings → Environment Variables → Production) to a strong value.
    const masterPassword = process.env.ADMIN_PASSWORD

    if (!masterPassword) {
      // Fail closed: if the password isn't configured, deny all logins
      // rather than silently allowing access.
      return NextResponse.json(
        { error: 'Admin login is not configured' },
        { status: 500 }
      )
    }

    if (password !== masterPassword) {
      return NextResponse.json({ error: 'Unauthorized credentials' }, { status: 401 })
    }

    const response = NextResponse.json({ success: true })

    response.cookies.set({
      name: 'sm_admin_session',
      value: 'authenticated_true',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'strict',
    })

    return response
  } catch (error) {
    return NextResponse.json({ error: 'Internal server failure' }, { status: 500 })
  }
}
