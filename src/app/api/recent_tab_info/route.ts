import { getRecentTabInfo } from '@/db';
import { NextResponse } from 'next/server';
import { getSession } from '@auth0/nextjs-auth0';
import { isDynamicServerError } from 'next/dist/client/components/hooks-server-context';

export const GET = async () => {
  try {
    const session = await getSession();
    const user = session?.user.nickname;

    let res = null;
    if (user) res = await getRecentTabInfo(user);

    return NextResponse.json(res);
  } catch (e: unknown) {
    if (isDynamicServerError(e)) throw e;
    return NextResponse.json(
      { message: 'error retrieving recent tab info' },
      { status: 500 }
    );
  }
};
