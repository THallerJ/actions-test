import { getUserTabsPageDb } from '@/db';
import { NextRequest, NextResponse } from 'next/server';
import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';

export const GET = withApiAuthRequired(
  async (req: NextRequest): Promise<NextResponse> => {
    try {
      const session = await getSession();
      const user = session?.user;

      const lastId = req.nextUrl.searchParams.get('id');

      const tabs = await getUserTabsPageDb(user?.nickname, lastId);
      return NextResponse.json(tabs);
    } catch (e: unknown) {
      console.log(e);
      return NextResponse.json([]);
    }
  }
);
