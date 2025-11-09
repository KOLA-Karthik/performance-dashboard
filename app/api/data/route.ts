import { NextResponse } from 'next/server'; import { nextDataBatch } from '../../../lib/dataGenerator'; export async function GET(){ return NextResponse.json({batch: nextDataBatch(100)}); }
