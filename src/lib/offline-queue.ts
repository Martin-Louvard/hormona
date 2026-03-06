import { get as idbGet, set as idbSet } from 'idb-keyval';
import type { SupabaseClient } from '@supabase/supabase-js';

const STORAGE_KEY = 'hormona-offline-queue';
const MAX_RETRIES = 3;

export interface QueuedAction {
  id: string;
  table: string;
  action: 'insert' | 'upsert' | 'update' | 'delete';
  data: Record<string, unknown>;
  timestamp: number;
  retries: number;
}

class OfflineQueue {
  private queue: QueuedAction[] = [];
  private initialized = false;

  async init() {
    if (this.initialized) return;
    const stored = await idbGet<QueuedAction[]>(STORAGE_KEY);
    this.queue = stored ?? [];
    this.initialized = true;
  }

  private async persist() {
    await idbSet(STORAGE_KEY, this.queue);
  }

  async enqueue(table: string, action: QueuedAction['action'], data: Record<string, unknown>) {
    await this.init();
    const item: QueuedAction = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      table,
      action,
      data,
      timestamp: Date.now(),
      retries: 0,
    };
    this.queue.push(item);
    await this.persist();
  }

  get pendingCount(): number {
    return this.queue.length;
  }

  async flush(supabase: SupabaseClient): Promise<{ success: number; failed: number }> {
    await this.init();
    if (this.queue.length === 0) return { success: 0, failed: 0 };

    let success = 0;
    let failed = 0;
    const remaining: QueuedAction[] = [];

    for (const item of this.queue) {
      let ok = false;
      for (let attempt = 0; attempt <= MAX_RETRIES && !ok; attempt++) {
        try {
          if (attempt > 0) {
            await new Promise((r) => setTimeout(r, Math.pow(2, attempt) * 500));
          }
          await this.executeAction(supabase, item);
          ok = true;
          success++;
        } catch {
          // retry
        }
      }
      if (!ok) {
        item.retries += MAX_RETRIES;
        remaining.push(item);
        failed++;
      }
    }

    this.queue = remaining;
    await this.persist();
    return { success, failed };
  }

  private async executeAction(supabase: SupabaseClient, item: QueuedAction) {
    const { table, action, data } = item;

    switch (action) {
      case 'insert': {
        const { error } = await supabase.from(table).insert(data);
        if (error) throw error;
        break;
      }
      case 'upsert': {
        const { error } = await supabase.from(table).upsert(data);
        if (error) throw error;
        break;
      }
      case 'update': {
        const { id: rowId, ...updates } = data;
        const { error } = await supabase.from(table).update(updates).eq('id', rowId);
        if (error) throw error;
        break;
      }
      case 'delete': {
        const { error } = await supabase.from(table).delete().eq('id', data.id);
        if (error) throw error;
        break;
      }
    }
  }
}

export const offlineQueue = new OfflineQueue();
