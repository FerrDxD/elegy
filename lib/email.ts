export async function sendUnlockNotificationEmail(to: string, userName: string, elegyId: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const baseUrl = process.env.NEXTAUTH_URL || "https://elegy.app";
  const unlockUrl = `${baseUrl}/result/${elegyId}`;

  const subject = "Kapsul Waktu Elegy Anda Telah Terbuka 🕯️";
  const html = `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #0F0F12; color: #F3F4F6;">
      <h1 style="color: #8A7A60; font-size: 28px; text-align: center; margin-bottom: 24px;">ELEGY</h1>
      <p style="font-size: 16px; line-height: 1.6; color: #D1D5DB;">Halo ${userName || 'Penjelajah Waktu'},</p>
      <p style="font-size: 16px; line-height: 1.6; color: #D1D5DB;">
        Kapsul waktu yang Anda kunci beberapa waktu lalu telah mencapai tanggal pembukaannya. Versi lama dan baru dari diri Anda telah siap untuk dibaca kembali.
      </p>
      <div style="text-align: center; margin: 36px 0;">
        <a href="${unlockUrl}" style="background-color: #8A7A60; color: #0F0F12; padding: 14px 28px; text-decoration: none; border-radius: 50px; font-weight: bold; display: inline-block;">
          Buka Kapsul Waktu
        </a>
      </div>
      <p style="font-size: 14px; color: #6B7280; text-align: center; margin-top: 40px;">
        Elegy — Ruang untuk melepaskan siapa kamu dulu.
      </p>
    </div>
  `;

  if (apiKey) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Elegy <notifications@elegy.app>",
          to: [to],
          subject,
          html,
        }),
      });
    } catch (e) {
      console.error("Failed to send email via Resend:", e);
    }
  } else {
    console.log(`[EMAIL DEV SIMULATION] To: ${to} | Link: ${unlockUrl}`);
  }
}
