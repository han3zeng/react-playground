import { NextResponse } from 'next/server';
import { PATH } from '../src/constants';

const {
  profile,
  stories,
  newStory,
} = PATH;

const authedPath = [profile, stories, newStory];

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
