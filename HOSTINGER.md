# Deploy ke Hostinger Node.js

Panduan untuk **Node.js Web Apps** di Hostinger (paket Business / Cloud).

## Persyaratan

- Paket **Business** atau **Cloud** (Node.js aktif)
- Repo GitHub berisi project ini
- Folder `public/images/` dan `public/panorama/` **sudah di-commit** (gambar ikut ter-upload)

## Langkah di hPanel

1. Login **hPanel** → **Websites** → **Add Website**
2. Pilih **Node.js Apps**
3. **Import Git Repository** → pilih repo ini
4. Framework: **Next.js** (auto-detect)
5. Isi **Build settings** persis seperti ini:

| Pengaturan | Nilai |
|------------|--------|
| Node.js version | **20** |
| Install command | `npm ci` |
| Build command | `npm run build` |
| Start command | `npm run start -- -p $PORT` |

6. **Environment variables** (tab Environment Variables):

```
NODE_ENV=production
HOSTNAME=0.0.0.0
NEXT_TELEMETRY_DISABLED=1
NODE_OPTIONS=--max-old-space-size=512
```

> Jika build gagal karena memori, tambahkan saat build (jika Hostinger menyediakan build env):  
> `NODE_OPTIONS=--max-old-space-size=1024`

7. Klik **Deploy** dan tunggu sampai status **Success**

## Domain

- Domain baru: ikuti wizard Hostinger setelah deploy
- Domain sudah ada di hosting lain: hapus website lama dulu (backup dulu), lalu buat **Node.js Apps** baru

## Setelah live

- Tur 3D: `https://domain-anda.com/3d/360web`
- Restart app tanpa rebuild: dashboard Node.js → **Restart**
- Redeploy otomatis: push ke branch yang terhubung GitHub

## Troubleshooting

| Masalah | Solusi |
|---------|--------|
| Build gagal / heap memory | Naikkan `NODE_OPTIONS` ke `1024`, atau upgrade paket Cloud |
| Gambar / panorama tidak muncul | Pastikan `public/` ada di GitHub, lalu redeploy |
| 502 / app tidak jalan | Start command harus `npm run start -- -p $PORT` |
| Port error | Jangan hardcode port 3000; gunakan `$PORT` dari Hostinger |

## Cek lokal sebelum deploy

```bash
npm ci
npm run build
npm run start -- -p 3000
```

Buka http://localhost:3000 — jika lancar, siap deploy ke Hostinger.
