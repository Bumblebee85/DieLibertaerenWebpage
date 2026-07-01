import { NextResponse } from "next/server";
import QRCode from "qrcode";
import { getEventBySlug } from "@/lib/cms/events";
import { getSiteUrl } from "@/lib/seo/site-url";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { slug } = await context.params;
  const event = await getEventBySlug(slug);

  if (!event) {
    return NextResponse.json({ error: "Event not found" }, { status: 404 });
  }

  const eventUrl = `${getSiteUrl()}/events/${slug}`;

  try {
    const pngBuffer = await QRCode.toBuffer(eventUrl, {
      type: "png",
      width: 400,
      margin: 2,
      color: {
        dark: "#03050F",
        light: "#FFFFFF",
      },
    });

    return new NextResponse(new Uint8Array(pngBuffer), {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch {
    return NextResponse.json({ error: "QR generation failed" }, { status: 500 });
  }
}