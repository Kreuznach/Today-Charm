#!/usr/bin/env node
/**
 * scripts/generate-favicon.cjs
 * 오늘의 말랑부적 favicon.ico 생성 스크립트 (외부 패키지 불필요)
 * 실행: node scripts/generate-favicon.cjs
 */
const fs = require('fs');
const path = require('path');

function createPixels(w, h) {
  return new Uint8Array(w * h * 4);
}

function setPixel(px, w, h, x, y, r, g, b, a) {
  if (x < 0 || y < 0 || x >= w || y >= h) return;
  const i = (y * w + x) * 4;
  px[i] = r; px[i+1] = g; px[i+2] = b; px[i+3] = a;
}

function fillCircle(px, w, h, cx, cy, radius, r, g, b, a) {
  for (let y = Math.max(0, cy - radius); y <= Math.min(h - 1, cy + radius); y++) {
    for (let x = Math.max(0, cx - radius); x <= Math.min(w - 1, cx + radius); x++) {
      const dx = x - cx, dy = y - cy;
      if (dx * dx + dy * dy <= radius * radius) {
        setPixel(px, w, h, x, y, r, g, b, a);
      }
    }
  }
}

function fillRoundRect(px, w, h, x0, y0, x1, y1, corner, cr, cg, cb) {
  for (let y = y0; y <= y1; y++) {
    for (let x = x0; x <= x1; x++) {
      let inside = true;
      const corners = [
        [x0 + corner, y0 + corner],
        [x1 - corner, y0 + corner],
        [x0 + corner, y1 - corner],
        [x1 - corner, y1 - corner],
      ];
      for (const [ccx, ccy] of corners) {
        if (x < x0 + corner || x > x1 - corner || y < y0 + corner || y > y1 - corner) {
          const dx = x - ccx, dy = y - ccy;
          if (Math.abs(x - ccx) <= corner && Math.abs(y - ccy) <= corner &&
              dx * dx + dy * dy > corner * corner) {
            inside = false; break;
          }
        }
      }
      if (inside) setPixel(px, w, h, x, y, cr, cg, cb, 255);
    }
  }
}

function fillRect(px, w, h, x0, y0, x1, y1, r, g, b) {
  for (let y = Math.max(0, y0); y <= Math.min(h - 1, y1); y++) {
    for (let x = Math.max(0, x0); x <= Math.min(w - 1, x1); x++) {
      setPixel(px, w, h, x, y, r, g, b, 255);
    }
  }
}

function makeDIB(px, w, h) {
  const headerSize = 40;
  const pixelSize = w * h * 4;
  const andRowBytes = Math.ceil(w / 32) * 4;
  const buf = Buffer.alloc(headerSize + pixelSize + andRowBytes * h);

  buf.writeUInt32LE(40, 0);
  buf.writeInt32LE(w, 4);
  buf.writeInt32LE(h * 2, 8);
  buf.writeUInt16LE(1, 12);
  buf.writeUInt16LE(32, 14);
  buf.writeUInt32LE(0, 16);
  buf.writeUInt32LE(pixelSize, 20);
  buf.writeInt32LE(0, 24); buf.writeInt32LE(0, 28);
  buf.writeUInt32LE(0, 32); buf.writeUInt32LE(0, 36);

  for (let y = 0; y < h; y++) {
    const srcY = h - 1 - y;
    for (let x = 0; x < w; x++) {
      const srcI = (srcY * w + x) * 4;
      const dstI = headerSize + (y * w + x) * 4;
      buf[dstI]   = px[srcI + 2];
      buf[dstI+1] = px[srcI + 1];
      buf[dstI+2] = px[srcI    ];
      buf[dstI+3] = px[srcI + 3];
    }
  }
  return buf;
}

function createIco(entries) {
  const ICONDIR = 6, ENTRY = 16;
  const headerBytes = ICONDIR + ENTRY * entries.length;
  let offset = headerBytes;

  const dibs = entries.map(e => {
    const dib = makeDIB(e.px, e.w, e.h);
    const result = { dib, offset, w: e.w, h: e.h };
    offset += dib.length;
    return result;
  });

  const buf = Buffer.alloc(offset);
  buf.writeUInt16LE(0, 0);
  buf.writeUInt16LE(1, 2);
  buf.writeUInt16LE(entries.length, 4);

  dibs.forEach((e, i) => {
    const base = ICONDIR + i * ENTRY;
    buf.writeUInt8(e.w >= 256 ? 0 : e.w, base);
    buf.writeUInt8(e.h >= 256 ? 0 : e.h, base + 1);
    buf.writeUInt8(0, base + 2); buf.writeUInt8(0, base + 3);
    buf.writeUInt16LE(1, base + 4);
    buf.writeUInt16LE(32, base + 6);
    buf.writeUInt32LE(e.dib.length, base + 8);
    buf.writeUInt32LE(e.offset, base + 12);
  });

  let pos = headerBytes;
  dibs.forEach(e => { e.dib.copy(buf, pos); pos += e.dib.length; });
  return buf;
}

function drawIcon(w, h) {
  const px = createPixels(w, h);
  const pad    = Math.max(1, Math.round(w * 0.06));
  const corner = Math.round(w * 0.22);

  // 분홍 둥근 사각형 배경 (#FF8FAB)
  fillRoundRect(px, w, h, pad, pad, w - 1 - pad, h - 1 - pad, corner, 255, 143, 171);

  const cx    = Math.round(w / 2);
  const cy    = Math.round(h / 2);
  const arm   = Math.round(w * 0.28);
  const thick = Math.max(1, Math.round(w * 0.1));

  // 흰 십자 (부적 형상)
  fillRect(px, w, h, cx - thick, cy - arm, cx + thick, cy + arm, 255, 255, 255);
  fillRect(px, w, h, cx - arm, cy - thick, cx + arm, cy + thick, 255, 255, 255);

  // 네 꼭짓점 흰 원형 장식
  const dotR = Math.max(1, Math.round(w * 0.08));
  const dotD = Math.round(w * 0.3);
  for (const [dx, dy] of [[-dotD,-dotD],[dotD,-dotD],[-dotD,dotD],[dotD,dotD]]) {
    fillCircle(px, w, h, cx + dx, cy + dy, dotR, 255, 255, 255, 255);
  }

  return px;
}

const entries = [16, 32, 48].map(size => ({
  w: size, h: size, px: drawIcon(size, size),
}));

const ico = createIco(entries);
const outPath = path.resolve(__dirname, '..', 'public', 'favicon.ico');
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, ico);
console.log('favicon.ico 생성 완료:', outPath, '(' + ico.length + ' bytes)');
