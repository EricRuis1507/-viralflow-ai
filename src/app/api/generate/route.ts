import { NextRequest, NextResponse } from 'next/server';
import { ViralEngine } from '@/lib/engine/viral-engine';

export async function POST(req: NextRequest) {
  try {
    const { idea } = await req.json();

    if (!idea) {
      return NextResponse.json({ error: 'Idea is required' }, { status: 400 });
    }

    const engine = new ViralEngine(process.env.CLAUDE_API_KEY || 'dummy-key');
    const result = await engine.runFullPipeline(idea);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Generation error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
