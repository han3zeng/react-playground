import { NextRequest, NextResponse } from 'next/server';
import { PATH } from '../src/constants';
const {
  profile,
  signIn,
  signUp,
  stories,
  story,
} = PATH;


const authedPath = [profile, stories, story];

export function middleware(req) {
  const { cookies } = req;
  const { pathname } = req.nextUrl;
  const userProfile = cookies['user-profile'];
  if (userProfile && pathname === '/') {
    return NextResponse.redirect('/profile');
  }
  if (!userProfile && (authedPath.indexOf(pathname.split('/')[1]) !== -1)) {
    return NextResponse.redirect('/');
  }
  return NextResponse.next();
}
