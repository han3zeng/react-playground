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
  const { signIn } = cookies;
  if (signIn === '1' && pathname === '/') {
    return NextResponse.redirect('/profile');
  }
  if ((signIn !== '1') && (authedPath.indexOf(pathname.split('/')[1]) !== -1)) {
    return NextResponse.redirect('/');
  }
  return NextResponse.next();
}
