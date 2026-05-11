/**
 * app/api/admin/[entity]/route.ts
 *
 * Dev-only generic CRUD untuk semua entity.
 * API ini HANYA jalan saat `next dev` tidak ada di static build.
 *
 * Endpoints:
 *   GET    /api/admin/team             → semua items
 *   POST   /api/admin/team             → tambah item baru (ID auto)
 *   PUT    /api/admin/team?id=5        → update item by ID
 *   DELETE /api/admin/team?id=5        → hapus item by ID
 */

import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-static';

// Blokir di production
if (process.env.NODE_ENV === 'production') {
  // Tidak bisa throw di module level, jadi handle di handler
}

const VALID_ENTITIES = ['team', 'blog', 'docs', 'projects', 'faq'] as const;
type Entity = (typeof VALID_ENTITIES)[number];

export function generateStaticParams() {
  return VALID_ENTITIES.map((entity) => ({ entity }));
}

function getDataPath(entity: Entity) {
  return path.join(process.cwd(), 'data', `${entity}.json`);
}

function readData<T>(entity: Entity): T[] {
  const filePath = getDataPath(entity);
  if (!fs.existsSync(filePath)) return [];
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw) as T[];
}

function writeData<T>(entity: Entity, data: T[]) {
  const filePath = getDataPath(entity);
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

function nextId<T extends { id: number }>(items: T[]): number {
  if (items.length === 0) return 1;
  return Math.max(...items.map((i) => i.id)) + 1;
}

function guard(entity: string): entity is Entity {
  return VALID_ENTITIES.includes(entity as Entity);
}

// ── Handlers ──────────────────────────────────────────────────────────────

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ entity: string }> },
) {
  if (process.env.NODE_ENV === 'production')
    return NextResponse.json({ ok: false, error: 'Not available' }, { status: 403 });

  const { entity } = await params;
  if (!guard(entity))
    return NextResponse.json({ ok: false, error: 'Unknown entity' }, { status: 400 });

  return NextResponse.json({ ok: true, data: readData(entity) });
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ entity: string }> },
) {
  if (process.env.NODE_ENV === 'production')
    return NextResponse.json({ ok: false, error: 'Not available' }, { status: 403 });

  const { entity } = await params;
  if (!guard(entity))
    return NextResponse.json({ ok: false, error: 'Unknown entity' }, { status: 400 });

  const body = await req.json();
  const items = readData<Record<string, unknown>>(entity);
  const newItem = { ...body, id: nextId(items) };
  items.push(newItem);
  writeData(entity, items);

  return NextResponse.json({ ok: true, data: newItem }, { status: 201 });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ entity: string }> },
) {
  if (process.env.NODE_ENV === 'production')
    return NextResponse.json({ ok: false, error: 'Not available' }, { status: 403 });

  const { entity } = await params;
  if (!guard(entity))
    return NextResponse.json({ ok: false, error: 'Unknown entity' }, { status: 400 });

  const id = Number(req.nextUrl.searchParams.get('id'));
  if (!id) return NextResponse.json({ ok: false, error: 'ID required' }, { status: 400 });

  const body = await req.json();
  const items = readData<Record<string, unknown>>(entity);
  const idx = items.findIndex((i) => i.id === id);
  if (idx === -1) return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });

  items[idx] = { ...items[idx], ...body, id };
  writeData(entity, items);

  return NextResponse.json({ ok: true, data: items[idx] });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ entity: string }> },
) {
  if (process.env.NODE_ENV === 'production')
    return NextResponse.json({ ok: false, error: 'Not available' }, { status: 403 });

  const { entity } = await params;
  if (!guard(entity))
    return NextResponse.json({ ok: false, error: 'Unknown entity' }, { status: 400 });

  const id = Number(req.nextUrl.searchParams.get('id'));
  if (!id) return NextResponse.json({ ok: false, error: 'ID required' }, { status: 400 });

  const items = readData<Record<string, unknown>>(entity);
  const filtered = items.filter((i) => i.id !== id);
  if (filtered.length === items.length)
    return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });

  writeData(entity, filtered);
  return NextResponse.json({ ok: true });
}
