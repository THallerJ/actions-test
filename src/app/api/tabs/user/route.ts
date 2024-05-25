import { getTabsArrayDb } from '@/db';
import { NextRequest, NextResponse } from 'next/server';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { getSession } from '@auth0/nextjs-auth0';
import { isDynamicServerError } from 'next/dist/client/components/hooks-server-context';

export const GET = withApiAuthRequired(
  async (req: NextRequest): Promise<NextResponse> => {
    try {
      const page = req.nextUrl.searchParams.get('page');
      const searchQuery = req.nextUrl.searchParams.get('searchQuery');
      const session = await getSession();
      const user = session?.user.nickname;

      const res = await getTabsArrayDb(Number(page), user, searchQuery);

      return NextResponse.json(res);
    } catch (e: unknown) {
      if (isDynamicServerError(e)) throw e;
      return NextResponse.json(
        { message: 'error retrieving tabs' },
        { status: 500 }
      );
    }
  }
);
