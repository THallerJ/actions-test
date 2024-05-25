import { getTabsArrayDb } from '@/db';
import { NextRequest, NextResponse } from 'next/server';
import { isDynamicServerError } from 'next/dist/client/components/hooks-server-context';

export const GET = async (req: NextRequest) => {
  try {
    const page = req.nextUrl.searchParams.get('page');
    const searchQuery = req.nextUrl.searchParams.get('searchQuery');

    const res = await getTabsArrayDb(Number(page), null, searchQuery);

    return NextResponse.json(res);
  } catch (e: unknown) {
    if (isDynamicServerError(e)) throw e;
    return NextResponse.json(
      { message: 'error retrieving tabs' },
      { status: 500 }
    );
  }
};
