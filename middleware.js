import { NextResponse } from 'next/server'
import { getToken } from './helpers'

// This function can be marked `async` if using `await` inside
export function middleware(req) {
    const cookie = req.cookies.get("authToken")?.value;
    if(cookie===undefined){
        return NextResponse.redirect(new URL('/login', req.url))
    }
 
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/profile',
}