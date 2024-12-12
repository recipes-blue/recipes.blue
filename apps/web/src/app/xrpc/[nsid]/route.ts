import { type NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ nsid: string }> }
) {
  const { nsid } = await params;

  console.log(request, nsid);

  return NextResponse.json({
    message: 'hello world',
  });
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ nsid: string }> }
) {
  const { nsid } = await params;

  console.log(request, nsid);

  return NextResponse.json({
    message: 'hello world',
  });
}
