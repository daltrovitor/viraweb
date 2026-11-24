// Hello World
import { ImageResponse } from 'next/og';
import { MARK_POLYGONS, MARK_VIEWBOX } from '@/components/brand/brand-mark';

export const alt = 'ViraWeb — empresa de software de Goiânia (GO)';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** Share card used by every page: mark, name and what the company does. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: '#ffffff',
          color: '#0f1f33',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <svg width="120" height="97" viewBox={`0 0 ${MARK_VIEWBOX.width} ${MARK_VIEWBOX.height}`}>
            {MARK_POLYGONS.map((polygon) => (
              <polygon key={polygon.points} points={polygon.points} fill={polygon.fill} />
            ))}
          </svg>
          <div style={{ display: 'flex', fontSize: 64, letterSpacing: -2 }}>
            <span style={{ fontWeight: 700 }}>Vira</span>
            <span style={{ fontWeight: 300 }}>Web</span>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1, letterSpacing: -3 }}>Design e engenharia</div>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05, letterSpacing: -3, color: '#1958a5' }}>que viram clientes.</div>
          <div style={{ marginTop: 32, fontSize: 30, color: '#33415a' }}>
            Desenvolvimento de software · Sites · Chatbot com IA · Marketing digital
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 24, color: '#5a6577' }}>
          <span>viraweb.dev.br</span>
          <span>Goiânia (GO) · Brasil</span>
        </div>
      </div>
    ),
    size,
  );
}
