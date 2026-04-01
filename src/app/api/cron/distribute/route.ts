import { NextResponse } from 'next/server';
import { distributeAllServices } from '@/services/service-manager';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');

  if (!process.env.CRON_SECRET) {
    console.error('[Cron] CRON_SECRET is not configured in environment variables');
    return new Response('CRON_SECRET not configured', { status: 500 });
  }

  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    console.warn(`[Cron] Unauthorized request. Authorization header length: ${authHeader?.length || 0}`);
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    console.log('[Cron] Starting monthly service distribution...');
    const result = await distributeAllServices();
    console.log('[Cron] Distribution result:', result);
    
    return NextResponse.json({
      success: true,
      message: 'Monthly distribution completed',
      result
    });
  } catch (error: any) {
    console.error('[Cron] Distribution failed:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
