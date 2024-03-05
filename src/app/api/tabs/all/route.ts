import { getTabsArrayDb } from '@/db';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  try {
    const page = req.nextUrl.searchParams.get('page');
    const searchQuery = req.nextUrl.searchParams.get('searchQuery');

    const res = await getTabsArrayDb(Number(page), null, searchQuery);

    return NextResponse.json(res);
  } catch (e: unknown) {
    console.log(e);
    return NextResponse.json({ nextPage: 0, tabs: [], hasNextPage: false });
  }
};
