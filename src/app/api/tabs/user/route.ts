import { getTabsArrayDb } from '@/db';
import { NextRequest, NextResponse } from 'next/server';
import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';

export const GET = withApiAuthRequired(
  async (req: NextRequest): Promise<NextResponse> => {
    try {
      const session = await getSession();
      const user = session?.user;

      const page = req.nextUrl.searchParams.get('page');
      const searchQuery = req.nextUrl.searchParams.get('searchQuery');

      const res = await getTabsArrayDb(
        Number(page),
        user?.nickname,
        searchQuery
      );

      return NextResponse.json(res);
    } catch (e: unknown) {
      console.log(e);
      return NextResponse.json({ nextPage: 0, tabs: [], hasNextPage: false });
    }
  }
);
