import { NextRequest, NextResponse } from "next/server";

const userProtectedRoutes = ['/profile', '/my-jobs', '/settings'];
const userAuthRoutes = ['/login', '/signup', '/otp-verification', '/forgot-password'];

const companyProtectedRoutes = ['/company/dashboard', '/company/jobs', '/company/team', '/company/profile'];
const companyAuthRoutes = ['/company/login', '/company/signup', '/company/otp-verification', '/company/forgot-password'];

const adminProtectedRoutes = ['/admin/dashboard', '/admin/users', '/admin/companies', '/admin/requests', '/admin/categories'];
const adminAuthRoutes = ['/admin/login'];

function startsWithAny(pathname: string, routes: string[]) {
    return routes.some(route => pathname.startsWith(route));
}

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    const userToken = req.cookies.get('userAccessToken')?.value;
    const companyToken = req.cookies.get('companyAccessToken')?.value;
    const adminToken = req.cookies.get('adminAccessToken')?.value;

    //User route protection
    if (startsWithAny(pathname, userProtectedRoutes) && !userToken) {
        return NextResponse.redirect(new URL('/', req.url));
    }
    if (startsWithAny(pathname, userAuthRoutes) && userToken) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    //Company routes protection
    if (startsWithAny(pathname, companyProtectedRoutes) && !companyToken) {
        return NextResponse.redirect(new URL('/company/login', req.url));
    }
    if (startsWithAny(pathname, companyAuthRoutes) && companyToken) {
        return NextResponse.redirect(new URL('/company/dashboard', req.url));
    }

    //Admin routes protection
    if (startsWithAny(pathname, adminProtectedRoutes) && !adminToken) {
        return NextResponse.redirect(new URL('/admin/login', req.url));
    }
    if (startsWithAny(pathname, adminAuthRoutes) && adminToken) {
        return NextResponse.redirect(new URL('/admin/dashboard', req.url));
    }

    return NextResponse.next();
}

export const config = {
  matcher: [
    // user auth & protected
    '/(login|signup|forgot-password|otp-verification)',
    '/profile/:path*',
    '/my-jobs/:path*',
    '/settings/:path*',

    // company auth & protected
    '/company/(login|signup|otp-verification|forgot-password)',
    '/company/(dashboard|jobs|team|profile)/:path*',

    // admin auth & protected
    '/admin/login',
    '/admin/(dashboard|users|companies|requests|categories)/:path*',
  ],
};