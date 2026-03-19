import { NextResponse } from 'next/server';
import { distributeAllServices } from '@/services/service-manager';
import { processBatchInstallments } from '@/services/installment.service';
import { recalculateBalance } from '@/services/account.service';
import { SYSTEM_ACCOUNTS } from '@/lib/constants';

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  console.log('[Cron] Starting monthly service distribution...');

  try {
    // 1. Distribute Services (force=false to respect due day)
    const serviceResult = await distributeAllServices(undefined, false);
    console.log('[Cron] Service distribution result:', serviceResult);

    // 2. Process Installments
    try {
      const installmentResult = await processBatchInstallments();
      console.log('[Cron] Installment processing result:', installmentResult);
    } catch (e) {
      console.error('[Cron] Installment processing failed:', e);
    }

    // 3. Recalculate DRAFT_FUND balance (where service charges go)
    await recalculateBalance(SYSTEM_ACCOUNTS.DRAFT_FUND);

    return NextResponse.json({
      success: true,
      services: serviceResult,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    console.error('[Cron] Distribution failed:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}
