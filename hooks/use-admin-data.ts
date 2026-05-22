/**
 * hooks/use-admin-data.ts
 *
 * Generic hook untuk CRUD data admin via API route.
 * Dipakai oleh semua halaman admin.
 */

import { useState, useEffect, useCallback } from 'react';
import type { Entity } from '@/types';

export function useAdminData<T extends { id: number }>(entity: Entity) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const url = `/api/admin/${entity}/`;

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(url, { cache: 'no-store' });
      const json = await res.json();
      if (json.ok) setItems(json.data);
      else setError(json.error);
    } catch {
      setError('Gagal load data.');
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => { load(); }, [load]);

  const create = useCallback(
    async (data: Omit<T, 'id'>): Promise<T | null> => {
      setSaving(true);
      setError(null);
      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        const json = await res.json();
        if (json.ok) {
          setItems((prev) => [...prev, json.data]);
          return json.data;
        }
        setError(json.error);
        return null;
      } finally {
        setSaving(false);
      }
    },
    [url],
  );

  const update = useCallback(
    async (id: number, data: Partial<T>): Promise<boolean> => {
      setSaving(true);
      setError(null);
      try {
        const res = await fetch(`${url}?id=${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        const json = await res.json();
        if (json.ok) {
          setItems((prev) => prev.map((item) => (item.id === id ? json.data as T : item)));
          return true;
        }
        setError(json.error);
        return false;
      } finally {
        setSaving(false);
      }
    },
    [url],
  );

  const remove = useCallback(
    async (id: number): Promise<boolean> => {
      setSaving(true);
      setError(null);
      try {
        const res = await fetch(`${url}?id=${id}`, { method: 'DELETE' });
        const json = await res.json();
        if (json.ok) {
          setItems((prev) => prev.filter((i) => i.id !== id));
          return true;
        }
        setError(json.error);
        return false;
      } finally {
        setSaving(false);
      }
    },
    [url],
  );

  return { items, loading, saving, error, load, create, update, remove };
}
