import { getTabsArrayDb } from '@/db';
import { NextRequest, NextResponse } from 'next/server';
import { isDynamicServerError } from 'next/dist/client/components/hooks-server-context';
import { getSession } from '@auth0/nextjs-auth0';

export const GET = async (req: NextRequest) => {
  try {
    const page = req.nextUrl.searchParams.get('page');
    const searchQuery = req.nextUrl.searchParams.get('searchQuery');
    const userOnly = req.nextUrl.searchParams.get('user-only') === '1';

    const session = await getSession();
    const user = session?.user.nickname;

    const res = await getTabsArrayDb(Number(page), user, userOnly, searchQuery);

    return NextResponse.json(res);
  } catch (e: unknown) {
    if (isDynamicServerError(e)) throw e;
    return NextResponse.json(
      { message: 'error retrieving tabs' },
      { status: 500 }
    );
  }
};
