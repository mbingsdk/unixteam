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
import { syncTeamProfilePage } from '@/lib/cloudflare-profiles';
import type { TeamMember } from '@/types';

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

type ItemId = string | number;

function nextId<T extends { id?: ItemId }>(items: T[]): ItemId {
  if (items.length === 0) return 1;

  const ids = items
    .map((item) => item.id)
    .filter((id): id is ItemId => typeof id === 'string' || typeof id === 'number');

  const numericIds = ids
    .map((id) => typeof id === 'number' || /^\d+$/.test(id) ? Number(id) : Number.NaN)
    .filter(Number.isFinite);

  if (numericIds.length === ids.length && numericIds.length > 0) {
    return Math.max(...numericIds) + 1;
  }

  const prefixedIds = ids
    .filter((id): id is string => typeof id === 'string')
    .map((id) => id.match(/^(.*?)(\d+)$/))
    .filter((match): match is RegExpMatchArray => Boolean(match));

  if (prefixedIds.length === ids.length && prefixedIds.length > 0) {
    const prefix = prefixedIds[0][1];
    if (prefixedIds.every((match) => match[1] === prefix)) {
      const maxSuffix = Math.max(...prefixedIds.map((match) => Number(match[2])));
      return `${prefix}${maxSuffix + 1}`;
    }
  }

  return ids.length + 1;
}

function requestId(req: NextRequest) {
  return req.nextUrl.searchParams.get('id')?.trim() ?? '';
}

function matchesId(item: Record<string, unknown>, id: string) {
  return String(item.id) === id;
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
  let newItem = { ...body, id: nextId(items as { id?: ItemId }[]) };
  if (entity === 'team') {
    newItem = await syncTeamProfilePage(undefined, newItem as TeamMember) as unknown as Record<string, unknown>;
  }
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

  const id = requestId(req);
  if (!id) return NextResponse.json({ ok: false, error: 'ID required' }, { status: 400 });

  const body = await req.json();
  const items = readData<Record<string, unknown>>(entity);
  const idx = items.findIndex((item) => matchesId(item, id));
  if (idx === -1) return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });

  let updated = { ...items[idx], ...body, id: items[idx].id };
  if (entity === 'team') {
    updated = await syncTeamProfilePage(items[idx] as unknown as TeamMember, updated as TeamMember) as unknown as Record<string, unknown>;
  }
  items[idx] = updated;
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

  const id = requestId(req);
  if (!id) return NextResponse.json({ ok: false, error: 'ID required' }, { status: 400 });

  const items = readData<Record<string, unknown>>(entity);
  const existing = items.find((item) => matchesId(item, id));
  const filtered = items.filter((item) => !matchesId(item, id));
  if (filtered.length === items.length)
    return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });

  if (entity === 'team' && existing) {
    await syncTeamProfilePage(
      existing as unknown as TeamMember,
      {
        ...(existing as unknown as TeamMember),
        profilePage: {
          ...(existing as unknown as TeamMember).profilePage,
          enabled: false,
          subdomain: (existing as unknown as TeamMember).profilePage?.subdomain ?? '',
          displayName: (existing as unknown as TeamMember).profilePage?.displayName ?? '',
          bio: (existing as unknown as TeamMember).profilePage?.bio ?? '',
          links: (existing as unknown as TeamMember).profilePage?.links ?? [],
        },
      },
    );
  }

  writeData(entity, filtered);
  return NextResponse.json({ ok: true });
}
