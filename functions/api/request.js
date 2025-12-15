/**
 * Cloudflare Pages Function - Consultation Request Handler
 * Handles two types of requests:
 * 1. inquiry - 1:1 Consultation Form (Formulir Konsultasi Pribadi)
 * 2. seminar - Seminar Registration Form (Daftar Seminar)
 */

export async function onRequestPost(context) {
  try {
    const { request } = context;
    const body = await request.json();

    // Validate request type
    if (!body.type || !['inquiry', 'seminar'].includes(body.type)) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Invalid request type. Must be "inquiry" or "seminar"'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Prepare email content based on type
    let emailSubject, emailContent;

    if (body.type === 'inquiry') {
      // 1:1 Inquiry Form
      emailSubject = `[K-Campus] Konsultasi Pribadi - ${body.title || 'Tanpa Judul'}`;
      emailContent = `
Konsultasi Pribadi Baru dari K-Campus Indonesia

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 INFORMASI PEMOHON
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Nama Lengkap: ${body.name || '-'}
Email: ${body.email || '-'}
Nomor Telepon/WhatsApp: ${body.phone || '-'}
Kategori Pertanyaan: ${body.category || '-'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
❓ PERTANYAAN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Judul: ${body.title || '-'}

Isi Pertanyaan:
${body.content || '-'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📅 INFORMASI PENGIRIMAN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Waktu: ${new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })} WIB
IP Address: ${request.headers.get('cf-connecting-ip') || '-'}
User Agent: ${request.headers.get('user-agent') || '-'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚡ Harap merespons dalam 1-2 hari kerja ke email: ${body.email}
      `.trim();
    } else {
      // Seminar Registration Form
      emailSubject = `[K-Campus] Pendaftaran Seminar - ${body.name || 'Peserta Baru'}`;
      emailContent = `
Pendaftaran Seminar Baru dari K-Campus Indonesia

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 INFORMASI PESERTA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Nama Lengkap: ${body.name || '-'}
Email: ${body.email || '-'}
Nomor Telepon/WhatsApp: ${body.phone || '-'}
Universitas/Sekolah: ${body.university || 'Tidak disebutkan'}
Topik yang Diminati: ${body.interest || '-'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📅 INFORMASI PENDAFTARAN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Waktu Pendaftaran: ${new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })} WIB
IP Address: ${request.headers.get('cf-connecting-ip') || '-'}
User Agent: ${request.headers.get('user-agent') || '-'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚡ Kirim konfirmasi ke email: ${body.email}
⚡ Hubungi via WhatsApp: ${body.phone}
      `.trim();
    }

    // Send email using Resend API
    const resendApiKey = context.env.RESEND_API_KEY;

    if (!resendApiKey) {
      console.error('RESEND_API_KEY not configured');
      // Return success even if email fails (for development)
      return new Response(JSON.stringify({
        success: true,
        message: 'Request received (email service not configured)'
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'K-Campus Indonesia <noreply@kcampus-indonesia.com>',
        to: ['hopegiver@malgnsoft.com'],
        subject: emailSubject,
        text: emailContent
      })
    });

    if (!resendResponse.ok) {
      const errorData = await resendResponse.text();
      console.error('Resend API error:', errorData);
      throw new Error('Failed to send email');
    }

    return new Response(JSON.stringify({
      success: true,
      message: body.type === 'inquiry'
        ? 'Pertanyaan Anda berhasil dikirim. Kami akan merespons dalam 1-2 hari kerja.'
        : 'Pendaftaran seminar berhasil. Kami akan mengirim konfirmasi ke email Anda.'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });

  } catch (error) {
    console.error('Error processing request:', error);

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
