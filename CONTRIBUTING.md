# Contributing to Elegy

Pertama-tama, terima kasih telah tertarik untuk berkontribusi pada Elegy! Elegy adalah ruang personal yang sensitif, dan kami sangat menghargai niat baik Anda untuk membuatnya lebih baik.

Panduan ini bertujuan untuk mempermudah proses Anda berkontribusi.

## Cara Berkontribusi

### 1. Melaporkan Bug
Jika Anda menemukan bug, silakan buat issue baru dengan menyertakan:
- Penjelasan singkat tentang bug tersebut.
- Langkah-langkah (Steps to reproduce) agar kami bisa mengulangi error-nya.
- Expected behavior (apa yang seharusnya terjadi).
- Screenshot jika berkaitan dengan UI.

### 2. Mengusulkan Fitur Baru
Jika Anda punya ide menarik untuk fitur Elegy:
- Cek terlebih dahulu di menu *Issues* apakah fitur yang sama sudah pernah diusulkan.
- Jika belum, buat issue baru dengan label `enhancement` atau `feature`.
- Jelaskan *kenapa* fitur ini penting dan bagaimana fitur ini selaras dengan tujuan Elegy sebagai aplikasi reflektif.

### 3. Mengirimkan Pull Request (PR)
Jika Anda ingin memperbaiki bug atau menambahkan fitur langsung lewat kode:
1. Lakukan *Fork* pada repository ini.
2. *Clone* repository fork Anda ke mesin lokal.
3. Buat branch baru dari `main` (`git checkout -b fitur-keren-anda`).
4. Lakukan perubahan pada kode Anda. Pastikan tidak ada *build error* (`npm run build`) dan linter tetap aman (`npm run lint`).
5. Jangan lupa commit dengan pesan yang jelas dan deskriptif.
6. Dorong (push) ke branch di repository fork Anda.
7. Buka halaman repository asli dan buat **Pull Request (PR)** baru.
8. Deskripsikan apa yang Anda ubah di PR Anda.

## Struktur Kode & Gaya Penulisan
- Gunakan **TypeScript** untuk semua penulisan logika aplikasi.
- Aplikasi ini dibangun menggunakan paradigma **Next.js App Router** (React Server Components). Gunakan `'use client'` hanya pada komponen yang benar-benar membutuhkan state browser atau *event listener*.
- Hindari penggunaan CSS kustom apabila bisa diselesaikan menggunakan **Tailwind CSS**. 
- Pertahankan konsistensi palet warna (`accent`, `surface`, `border`, `text-primary`, `text-muted`) dan tipografi dari file config Tailwind.

## Menjalankan Proyek Secara Lokal
Silakan lihat panduan **Cara Menjalankan Secara Lokal** di [README.md](README.md) untuk menginisiasi aplikasi, database, dan *environment variables* Anda.

Terima kasih telah membantu menjaga Elegy tetap hangat dan bermakna!
