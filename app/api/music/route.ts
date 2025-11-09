import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const musicDirectory = path.join(process.cwd(), 'public/music');
  try {
    const songFiles = fs.readdirSync(musicDirectory);
    return NextResponse.json({ songs: songFiles });
  } catch (error) {
    return NextResponse.json({ error: 'error jak probowal odczytac pliki music esssssss' }, { status: 500 });
  }
}