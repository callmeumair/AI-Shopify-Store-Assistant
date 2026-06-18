import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const hmacHeader = req.headers.get('x-shopify-hmac-sha256');
    const topic = req.headers.get('x-shopify-topic');
    const shop = req.headers.get('x-shopify-shop-domain');

    // In a real app, you would verify the HMAC with your Shopify Client Secret
    // const secret = process.env.SHOPIFY_CLIENT_SECRET || '';
    // const generatedHash = crypto.createHmac('sha256', secret).update(rawBody, 'utf8').digest('base64');
    // if (generatedHash !== hmacHeader) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    const payload = JSON.parse(rawBody);
    console.log(`Received Shopify webhook for topic: ${topic} from shop: ${shop}`);

    // Forward to n8n webhook URL if defined
    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;
    if (n8nWebhookUrl && topic === 'orders/create') {
      try {
        await fetch(n8nWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            topic,
            shop,
            payload
          })
        });
        console.log('Forwarded webhook to n8n');
      } catch (err) {
        console.error('Failed to forward to n8n:', err);
      }
    }

    return NextResponse.json({ status: 'ok' }, { status: 200 });
  } catch (error: any) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
