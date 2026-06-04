import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { password } = await request.json()
    
    // Hardcoding your numeric password directly rules out Vercel configuration delays entirely
    const masterPassword = "1020304050"

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
