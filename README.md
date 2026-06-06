# Elegy

> *A space to grieve who you used to be.*

Elegy adalah sebuah web app refleksi diri yang intim. Aplikasi ini memberikan ruang aman bagi Anda untuk menuliskan dua hal: siapa Anda di masa lalu, dan siapa Anda hari ini. Setelah itu, AI akan merangkai sebuah elegi perpisahan yang puitis untuk versi lama Anda, serta menyajikan sebuah cermin observasional untuk versi diri Anda yang baru.

## 🌟 Fitur Utama
- **Refleksi Masa Lalu & Masa Kini**: Tuliskan memori dan perubahan diri tanpa filter.
- **AI-Powered Eulogy**: Gemini AI akan merangkai puisi perpisahan (*elegi*) yang penuh makna dan hormat untuk versi lama Anda.
- **The Mirror**: Observasi tajam tanpa penghakiman atas perpindahan diri Anda.
- **Arsip Pribadi**: Semua perjalanan dan refleksi masa lalu Anda disimpan dengan aman dan bisa dibaca ulang kapan saja.
- **UI/UX Sinematik**: Antarmuka dengan tema *dark*, transisi *fade-in*, *glassmorphism*, dan tipografi elegan untuk membangun suasana kontemplatif.

## 🛠️ Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: Neon Serverless PostgreSQL
- **ORM**: Drizzle ORM
- **Auth**: NextAuth.js v5
- **AI**: Google Gemini API (`gemini-flash-latest`)
- **Styling**: Tailwind CSS

## 🚀 Cara Menjalankan Secara Lokal

1. **Clone repository ini**
   ```bash
   git clone https://github.com/FerrDxD/elegy.git
   cd elegy
   ```

2. **Install dependensi**
   ```bash
   npm install
   ```

3. **Siapkan Environment Variables**
   Buat file `.env` di direktori root dan isi dengan kredensial berikut:
   ```env
   DATABASE_URL="postgresql://user:password@endpoint.neon.tech/dbname"
   NEXTAUTH_SECRET="your-32-byte-random-secret"
   NEXTAUTH_URL="http://localhost:3000"
   GOOGLE_CLIENT_ID="your-google-oauth-client-id"
   GOOGLE_CLIENT_SECRET="your-google-oauth-client-secret"
   GEMINI_API_KEY="your-gemini-api-key"
   ```

4. **Migrasi Database**
   ```bash
   npm run db:push
   ```

5. **Jalankan Development Server**
   ```bash
   npm run dev
   ```
   Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

## 🤝 Kontribusi
Kami menyambut kontribusi apa pun! Silakan baca [CONTRIBUTING.md](CONTRIBUTING.md) untuk mempelajari cara berkontribusi, dan pastikan Anda mematuhi [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

## 🛡️ Keamanan
Jika Anda menemukan celah keamanan, mohon lihat [SECURITY.md](SECURITY.md) untuk panduan pelaporan.

## 📄 Lisensi
Proyek ini dilisensikan di bawah [MIT License](LICENSE).
