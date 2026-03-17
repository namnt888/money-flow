'use server';

import { createClient } from '@/lib/supabase/server';
import { executeWithFallback, logSource } from '@/lib/pocketbase/fallback-helpers';
import {
  pocketbaseList,
  pocketbaseGetById,
  pocketbaseRequest,
  toPocketBaseId,
  pocketbaseUpdate,
  pocketbaseCreate
} from './pocketbase/server';
import { SYSTEM_ACCOUNTS, SYSTEM_CATEGORIES } from '@/lib/constants';
import { addMonths } from 'date-fns';
import { toLegacyMMMYYFromDate, toYYYYMMFromDate } from '@/lib/month-tag'

import { Installment, InstallmentStatus, InstallmentType } from '@/types/moneyflow.types';
export type { Installment, InstallmentStatus, InstallmentType };

export async function getInstallments() {
  const context = 'getInstallments';
  return executeWithFallback(
    async () => {
      const res = await pocketbaseList<any>('installments', {
        sort: '-created_at',
        expand: 'original_transaction_id,original_transaction_id.account_id,original_transaction_id.person_id'
      });
      return res.items.map(mapPBInstallment);
    },
    async () => {
      const supabase: any = createClient();
      const { data, error } = await supabase
        .from('installments')
        .select('*, original_transaction:transactions(account:accounts!transactions_account_id_fkey(id, name), person:people(name))')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Installment[];
    },
    context
  );
}

export async function getInstallmentById(id: string) {
  const context = `getInstallmentById:${id}`;
  return executeWithFallback(
    async () => {
      const pbId = toPocketBaseId(id, 'installments');
      const record = await pocketbaseGetById<any>('installments', pbId, 
        'original_transaction_id,original_transaction_id.account_id,original_transaction_id.person_id'
      );
      return record ? mapPBInstallment(record) : null;
    },
    async () => {
      const supabase: any = createClient();
      const { data, error } = await supabase
        .from('installments')
        .select('*, original_transaction:transactions(account:accounts!transactions_account_id_fkey(id, name), person:people(name))')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data as Installment;
    },
    context
  );
}

export async function getActiveInstallments() {
  const context = 'getActiveInstallments';
  return executeWithFallback(
    async () => {
      const res = await pocketbaseList<any>('installments', {
        filter: 'status="active"',
        sort: 'next_due_date',
        expand: 'original_transaction_id,original_transaction_id.account_id,original_transaction_id.person_id'
      });
      return res.items.map(mapPBInstallment);
    },
    async () => {
      const supabase: any = createClient();
      const { data, error } = await supabase
        .from('installments')
        .select('*, original_transaction:transactions(account:accounts!transactions_account_id_fkey(id, name), person:people(name))')
        .eq('status', 'active')
        .order('next_due_date', { ascending: true });

      if (error) throw error;
      return data as Installment[];
    },
    context
  );
}

export async function getAccountsWithActiveInstallments() {
  const context = 'getAccountsWithActiveInstallments';
  return executeWithFallback(
    async () => {
      const res = await pocketbaseList<any>('installments', {
        filter: 'status="active"',
        expand: 'original_transaction_id'
      });
      const accountIds = new Set<string>();
      res.items.forEach((item: any) => {
        const txn = item.expand?.original_transaction_id;
        if (txn?.account_id) {
          accountIds.add(txn.account_id);
        }
      });
      return Array.from(accountIds);
    },
    async () => {
      const supabase: any = createClient();
      const { data, error } = await supabase
        .from('installments')
        .select('original_transaction:transactions(account_id)')
        .eq('status', 'active');

      if (error) throw error;
      const accountIds = new Set<string>();
      data?.forEach((item: any) => {
        if (item.original_transaction?.account_id) {
          accountIds.add(item.original_transaction.account_id);
        }
      });
      return Array.from(accountIds);
    },
    context
  );
}

export async function getCompletedInstallments() {
  const context = 'getCompletedInstallments';
  return executeWithFallback(
    async () => {
      const res = await pocketbaseList<any>('installments', {
        filter: 'status="completed"',
        sort: '-created_at',
        expand: 'original_transaction_id,original_transaction_id.account_id'
      });
      return res.items.map(mapPBInstallment);
    },
    async () => {
      const supabase: any = createClient();
      const { data, error } = await supabase
        .from('installments')
        .select('*, original_transaction:transactions(account:accounts!transactions_account_id_fkey(id, name))')
        .eq('status', 'completed')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Installment[];
    },
    context
  );
}

export async function getPendingInstallmentTransactions() {
  const context = 'getPendingInstallmentTransactions';
  return executeWithFallback(
    async () => {
      const res = await pocketbaseList<any>('transactions', {
        filter: 'is_installment=true && installment_plan_id=null',
        sort: '-occurred_at'
      });
      return res.items;
    },
    async () => {
      const supabase: any = createClient();
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('is_installment', true)
        .is('installment_plan_id', null)
        .order('occurred_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    context
  );
}

/**
 * Mapper for PocketBase Installment records
 */
function mapPBInstallment(record: any): Installment {
  const expandedTxn = record.expand?.original_transaction_id;
  const expandedAccount = expandedTxn?.expand?.account_id;
  const expandedPerson = expandedTxn?.expand?.person_id;

  return {
    id: record.slug || record.id,
    created_at: record.created || record.created_at,
    original_transaction_id: record.original_transaction_id,
    owner_id: record.owner_id,
    debtor_id: record.debtor_id,
    name: record.name,
    total_amount: record.total_amount,
    conversion_fee: record.conversion_fee || 0,
    term_months: record.term_months,
    monthly_amount: record.monthly_amount,
    start_date: record.start_date,
    remaining_amount: record.remaining_amount,
    next_due_date: record.next_due_date,
    status: record.status,
    type: record.type,
    original_transaction: expandedTxn ? {
      account_id: expandedTxn.account_id,
      account: expandedAccount ? {
        name: expandedAccount.name
      } : null,
      person: expandedPerson ? {
        name: expandedPerson.name
      } : null
    } : null
  };
}

// Phase 7X: Auto-Settlement Logic
export async function checkAndAutoSettleInstallment(planId: string) {
  const context = `checkAndAutoSettleInstallment:${planId}`;
  return executeWithFallback(
    async () => {
      const pbPlanId = toPocketBaseId(planId, 'installments');
      const plan = await pocketbaseGetById<any>('installments', pbPlanId);
      if (!plan) return;

      const txnsRes = await pocketbaseList<any>('transactions', {
        filter: `installment_plan_id="${pbPlanId}"`,
        fields: 'amount,type'
      });

      let totalPaid = 0;
      txnsRes.items.forEach((t: any) => {
        totalPaid += t.amount || 0;
      });

      const remaining = plan.total_amount - totalPaid;
      const updates: any = { remaining_amount: remaining };

      if (remaining <= 1000 && plan.status === 'active') {
        updates.status = 'completed';
      } else if (remaining > 1000 && plan.status === 'completed') {
        updates.status = 'active';
      }

      await pocketbaseUpdate('installments', pbPlanId, updates);
      logSource('PB', `Auto-settled installment ${pbPlanId}`, { remaining, status: updates.status || plan.status });
      return { success: true, remaining, status: updates.status || plan.status };
    },
    async () => {
      const supabase: any = createClient();
      const { data: plan, error: planError } = await supabase
        .from('installments')
        .select('*')
        .eq('id', planId)
        .single();
      if (planError || !plan) return;

      const { data: txns, error: txnError } = await supabase
        .from('transactions')
        .select('amount, type')
        .eq('installment_plan_id', planId);
      if (txnError) return;

      let totalPaid = 0;
      txns?.forEach((t: any) => { totalPaid += t.amount || 0; });

      const remaining = plan.total_amount - totalPaid;
      const updates: any = { remaining_amount: remaining };
      if (remaining <= 1000 && plan.status === 'active') { updates.status = 'completed'; }
      else if (remaining > 1000 && plan.status === 'completed') { updates.status = 'active'; }

      await supabase.from('installments').update(updates).eq('id', planId);
      return { success: true, remaining, status: updates.status || plan.status };
    },
    context
  );
}

export async function convertTransactionToInstallment(payload: {
  transactionId: string;
  term: number;
  fee: number;
  type: InstallmentType;
  debtorId?: string;
  name?: string;
}) {
  const context = `convertTransactionToInstallment:${payload.transactionId}`;
  logSource('PB', context);

  // PB Primary
  try {
    const pbTxnId = toPocketBaseId(payload.transactionId, 'transactions');
    const txn = await pocketbaseGetById<any>('transactions', pbTxnId);
    if (!txn) throw new Error('Transaction not found in PB');

    const totalAmount = Math.abs(txn.amount || 0);
    const monthlyAmount = Math.ceil(totalAmount / payload.term);
    const name = payload.name || txn.note || 'Installment Plan';
    const pbId = toPocketBaseId(crypto.randomUUID(), 'installments');

    const installment = await pocketbaseCreate<any>('installments', {
      id: pbId,
      original_transaction_id: pbTxnId,
      name,
      total_amount: totalAmount,
      conversion_fee: payload.fee,
      term_months: payload.term,
      monthly_amount: monthlyAmount,
      start_date: new Date().toISOString(),
      remaining_amount: totalAmount,
      next_due_date: addMonths(new Date(), 1).toISOString(),
      status: 'active',
      type: payload.type,
      debtor_id: payload.debtorId ? toPocketBaseId(payload.debtorId, 'people') : null
    });

    await pocketbaseUpdate('transactions', pbTxnId, { installment_plan_id: pbId });

    if (payload.fee > 0) {
      const { createTransaction } = await import('./transaction.service');
      await createTransaction({
        occurred_at: new Date().toISOString(),
        note: `Conversion Fee: ${name}`,
        type: 'expense',
        source_account_id: txn.account_id,
        amount: payload.fee,
        category_id: SYSTEM_CATEGORIES.BANK_FEE,
        tag: 'FEE'
      });
    }

    return installment;
  } catch (error) {
    console.error(`[DB:PB] ${context} failed, falling back to Supabase`, error);
    // Supabase Fallback
    const supabase: any = createClient();
    const { data: txn, error: txnError } = await supabase.from('transactions').select('*').eq('id', payload.transactionId).single();
    if (txnError || !txn) throw new Error('Transaction not found in SB');

    const totalAmount = Math.abs(txn.amount || 0);
    const monthlyAmount = Math.ceil(totalAmount / payload.term);
    const { data: installment, error: createError } = await supabase.from('installments').insert({
      original_transaction_id: payload.transactionId,
      name: payload.name || txn.note || 'Installment Plan',
      total_amount: totalAmount,
      conversion_fee: payload.fee,
      term_months: payload.term,
      monthly_amount: monthlyAmount,
      start_date: new Date().toISOString(),
      remaining_amount: totalAmount,
      next_due_date: addMonths(new Date(), 1).toISOString(),
      status: 'active',
      type: payload.type,
      debtor_id: payload.debtorId || null
    }).select().single();

    if (createError) throw createError;
    await supabase.from('transactions').update({ installment_plan_id: installment.id }).eq('id', payload.transactionId);
    return installment;
  }
}

export async function createManualInstallment(payload: {
  name: string;
  totalAmount: number;
  term: number;
  fee: number;
  type: InstallmentType;
  debtorId?: string;
  startDate?: string;
}) {
  const context = `createManualInstallment:${payload.name}`;
  logSource('PB', context);

  try {
    const pbId = toPocketBaseId(crypto.randomUUID(), 'installments');
    const monthlyAmount = Math.ceil(payload.totalAmount / payload.term);

    return await pocketbaseCreate<any>('installments', {
      id: pbId,
      name: payload.name,
      total_amount: payload.totalAmount,
      conversion_fee: payload.fee,
      term_months: payload.term,
      monthly_amount: monthlyAmount,
      start_date: payload.startDate || new Date().toISOString(),
      remaining_amount: payload.totalAmount,
      next_due_date: addMonths(new Date(payload.startDate || new Date()), 1).toISOString(),
      status: 'active',
      type: payload.type,
      debtor_id: payload.debtorId ? toPocketBaseId(payload.debtorId, 'people') : null
    });
  } catch (error) {
    console.error(`[DB:PB] ${context} failed, falling back to Supabase`, error);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    const { data, error: err } = await supabase.from('installments').insert({
      owner_id: user?.id ?? SYSTEM_ACCOUNTS.DEFAULT_USER_ID,
      name: payload.name,
      total_amount: payload.totalAmount,
      term_months: payload.term,
      monthly_amount: Math.ceil(payload.totalAmount / payload.term),
      remaining_amount: payload.totalAmount,
      status: 'active',
      type: payload.type,
      start_date: payload.startDate || new Date().toISOString()
    }).select().single();
    if (err) throw err;
    return data;
  }
}

export async function processMonthlyPayment(installmentId: string, amountPaid: number) {
  const context = `processMonthlyPayment:${installmentId}`;
  logSource('PB', context);

  try {
    const pbId = toPocketBaseId(installmentId, 'installments');
    const installment = await pocketbaseGetById<any>('installments', pbId);
    if (!installment) throw new Error('Installment not found in PB');

    const newRemaining = Math.max(0, installment.remaining_amount - amountPaid);
    const newStatus = newRemaining <= 0 ? 'completed' : 'active';
    const nextDueDate = newStatus === 'active'
      ? addMonths(new Date(installment.next_due_date || new Date()), 1).toISOString()
      : null;

    await pocketbaseUpdate('installments', pbId, {
      remaining_amount: newRemaining,
      status: newStatus,
      next_due_date: nextDueDate
    });
    return true;
  } catch (error) {
    console.error(`[DB:PB] ${context} failed, falling back to Supabase`, error);
    const supabase: any = createClient();
    const { data: installment, error: fetchError } = await supabase.from('installments').select('*').eq('id', installmentId).single();
    if (fetchError || !installment) throw new Error('Installment not found in SB');

    const newRemaining = Math.max(0, installment.remaining_amount - amountPaid);
    const newStatus = newRemaining <= 0 ? 'completed' : 'active';
    const nextDueDate = newStatus === 'active' ? addMonths(new Date(installment.next_due_date || new Date()), 1).toISOString() : null;

    await supabase.from('installments').update({
      remaining_amount: newRemaining,
      status: newStatus,
      next_due_date: nextDueDate
    }).eq('id', installmentId);
    return true;
  }
}

export async function settleEarly(installmentId: string) {
  const context = `settleEarly:${installmentId}`;
  logSource('PB', context);

  try {
    const pbId = toPocketBaseId(installmentId, 'installments');
    await pocketbaseUpdate('installments', pbId, {
      remaining_amount: 0,
      status: 'settled_early',
      next_due_date: null
    });
    return true;
  } catch (error) {
    console.error(`[DB:PB] ${context} failed, falling back to Supabase`, error);
    const supabase: any = createClient();
    await supabase.from('installments').update({
      remaining_amount: 0,
      status: 'settled_early',
      next_due_date: null
    }).eq('id', installmentId);
    return true;
  }
}

export async function processBatchInstallments(date?: string) {
  const context = 'processBatchInstallments';
  logSource('PB', context);

  try {
    const targetDate = date ? new Date(date) : new Date();
    const monthTag = toYYYYMMFromDate(targetDate);
    const installments = await getActiveInstallments();
    if (installments.length === 0) return;

    const batchName = `Installments ${monthTag}`;
    let batchId: string;

    const existingBatches = await pocketbaseList<any>('batches', {
      filter: `name="${batchName}"`,
      perPage: 1
    });

    if (existingBatches.items.length > 0) {
      batchId = existingBatches.items[0].id;
    } else {
      const newBatch = await pocketbaseCreate<any>('batches', {
        name: batchName,
        source_account_id: toPocketBaseId(SYSTEM_ACCOUNTS.DRAFT_FUND, 'accounts'),
        status: 'draft'
      });
      batchId = newBatch.id;
    }

    for (const inst of installments) {
      const existingItem = await pocketbaseList<any>('batch_items', {
        filter: `batch_id="${batchId}" && metadata~"installment_id\\":\\"${inst.id}\\""`,
        perPage: 1
      });

      if (existingItem.items.length > 0) continue;

      const start = new Date(inst.start_date);
      const diffMonths = (targetDate.getFullYear() - start.getFullYear()) * 12 + (targetDate.getMonth() - start.getMonth()) + 1;
      const monthNum = Math.min(Math.max(1, diffMonths), inst.term_months);

      await pocketbaseCreate('batch_items', {
        batch_id: batchId,
        receiver_name: 'Installment Payment',
        amount: inst.monthly_amount,
        note: `Installment: ${inst.name} (Month ${monthNum}/${inst.term_months})`,
        status: 'pending',
        metadata: { installment_id: inst.id }
      });
    }
  } catch (error) {
    console.error(`[DB:PB] ${context} failed`, error);
    // Legacy Supabase path could be called here if needed, but per-agent instructions PB is primary.
  }
}

export async function getInstallmentRepayments(planId: string) {
  const context = `getInstallmentRepayments:${planId}`;
  return executeWithFallback(
    async () => {
      const pbPlanId = toPocketBaseId(planId, 'installments');
      const res = await pocketbaseList<any>('transactions', {
        filter: `installment_plan_id="${pbPlanId}"`,
        sort: '-occurred_at',
        expand: 'created_by'
      });
      return res.items;
    },
    async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('transactions')
        .select('id, occurred_at, amount, note, type, created_by, profiles:created_by ( name )')
        .eq('installment_plan_id', planId)
        .order('occurred_at', { ascending: false });
      if (error) throw error;
      return data;
    },
    context
  );
}
