import { NextResponse } from 'next/server';
import { distributeAllServices } from '@/services/service-manager';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');

  if (!process.env.CRON_SECRET) {
    console.error('[Cron] CRON_SECRET is not configured in environment variables');
    return new Response('CRON_SECRET not configured', { status: 500 });
  }

  // Verbose logging for debugging 401s in Vercel
  const isAuthorized = authHeader === `Bearer ${process.env.CRON_SECRET}`;
  if (!isAuthorized) {
    console.warn(`[Cron] Unauthorized request. Header present: ${!!authHeader}, Length: ${authHeader?.length || 0}`);
    if (authHeader && authHeader.startsWith('Bearer ')) {
       const partial = authHeader.substring(7, 10) + '...';
       console.warn(`[Cron] Header starts with: ${partial}`);
    }
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    console.log('[Cron] Starting monthly service distribution (Authorized)...');
    const result = await distributeAllServices();
    
    const status = result.failed > 0 ? 'completed_with_errors' : 'success';
    console.log(`[Cron] Distribution ${status}:`, JSON.stringify(result, null, 2));
    
    return NextResponse.json({
      success: result.failed === 0,
      status,
      message: 'Monthly distribution job finished',
      summary: {
        total: result.total,
        success: result.success,
        failed: result.failed,
        skipped: result.skipped
      },
      reports: result.reports
    });
  } catch (error: any) {
    console.error('[Cron] Distribution CRITICAL FAILURE:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
