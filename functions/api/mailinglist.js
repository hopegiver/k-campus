/**
 * Cloudflare Pages Function - Mailing List Handler
 * Stores newsletter subscription emails in Cloudflare KV
 * KV Namespace: kcampus-kv (ff25af66c3d841cd8d0739e3e372d8d1)
 */

export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const body = await request.json();

    // Validate email
    const email = body.email?.trim().toLowerCase();
    if (!email || !isValidEmail(email)) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Email tidak valid'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Access KV namespace
    const KV = env.KCAMPUS_KV;
    if (!KV) {
      console.error('KCAMPUS_KV namespace not bound');
      return new Response(JSON.stringify({
        success: false,
        error: 'KV storage tidak tersedia'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Check if email already exists
    const existingData = await KV.get(`mailinglist:${email}`);
    if (existingData) {
      return new Response(JSON.stringify({
        success: true,
        message: 'Email Anda sudah terdaftar di mailing list kami',
        alreadySubscribed: true
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    // Store subscription data
    const subscriptionData = {
      email: email,
      subscribedAt: new Date().toISOString(),
      subscribedFrom: 'berita-page',
      ipAddress: request.headers.get('cf-connecting-ip') || '-',
      userAgent: request.headers.get('user-agent') || '-',
      source: body.source || 'newsletter-form'
    };

    // Save to KV with key: mailinglist:{email}
    await KV.put(
      `mailinglist:${email}`,
      JSON.stringify(subscriptionData),
      {
        metadata: {
          subscribedAt: subscriptionData.subscribedAt,
          source: subscriptionData.source
        }
      }
    );

    // Also maintain a list of all subscribers
    const subscribersList = await KV.get('mailinglist:all', { type: 'json' }) || [];
    if (!subscribersList.includes(email)) {
      subscribersList.push(email);
      await KV.put('mailinglist:all', JSON.stringify(subscribersList));
    }

    // Send notification email to admin
    const resendApiKey = env.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: 'K-Campus Indonesia <noreply@kcampus-indonesia.com>',
            to: ['hopegiver@malgnsoft.com'],
            subject: '[K-Campus] Newsletter Subscription Baru',
            text: `
Newsletter Subscription Baru

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📧 SUBSCRIBER BARU
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Email: ${email}
Source: ${subscriptionData.source}
Waktu: ${new Date(subscriptionData.subscribedAt).toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })} WIB
IP Address: ${subscriptionData.ipAddress}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Total Subscribers: ${subscribersList.length}
            `.trim()
          })
        });
      } catch (emailError) {
        console.error('Failed to send notification email:', emailError);
        // Don't fail the request if email notification fails
      }
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'Terima kasih! Anda berhasil berlangganan newsletter kami.',
      alreadySubscribed: false
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });

  } catch (error) {
    console.error('Error processing mailing list subscription:', error);

    return new Response(JSON.stringify({
      success: false,
      error: 'Terjadi kesalahan server. Silakan coba lagi nanti.'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}

// Handle OPTIONS for CORS
export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400'
    }
  });
}

// Email validation helper
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
