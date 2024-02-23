import { getTabsPageDb } from '@/db';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  try {
    const lastId = req.nextUrl.searchParams.get('id');

    const tabs = await getTabsPageDb(lastId);
    return NextResponse.json(tabs);
  } catch (e: unknown) {
    return e;
  }
};
