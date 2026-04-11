import { NextResponse, type NextRequest } from 'next/server'
 
export async function middleware(request: NextRequest) {
  const idToken = request.cookies.get('idToken')?.value

  const requestHeaders = new Headers(request.headers)

  if (idToken) {
    requestHeaders.set('x-firebase-id-token', idToken)
  }
 
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}
 
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
