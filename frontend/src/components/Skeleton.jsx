/** Bloco de skeleton genérico — substitui qualquer área durante o loading. */
export function Skeleton({ width = '100%', height = '20px', borderRadius = '6px', style = {} }) {
  return (
    <div
      className="skeleton"
      style={{ width, height, borderRadius, ...style }}
    />
  );
}

/** Skeleton de card de filme (poster + duas linhas). */
export function MovieCardSkeleton() {
  return (
    <div className="movie-card movie-card--skeleton">
      <Skeleton height="270px" borderRadius="0" />
      <div style={{ padding: '8px 10px 12px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        <Skeleton height="14px" width="80%" />
        <Skeleton height="12px" width="50%" />
      </div>
    </div>
  );
}

/** Skeleton do banner hero. */
export function BannerSkeleton() {
  return (
    <div className="banner banner--skeleton">
      <div className="banner__content">
        <Skeleton height="56px" width="60%" style={{ marginBottom: 16 }} />
        <Skeleton height="14px" width="90%" style={{ marginBottom: 8 }} />
        <Skeleton height="14px" width="75%" style={{ marginBottom: 8 }} />
        <Skeleton height="14px" width="50%" style={{ marginBottom: 24 }} />
        <div style={{ display: 'flex', gap: 12 }}>
          <Skeleton height="40px" width="120px" borderRadius="4px" />
          <Skeleton height="40px" width="140px" borderRadius="4px" />
        </div>
      </div>
    </div>
  );
}

/** Skeleton de carrossel. */
export function CarouselSkeleton({ title = '', count = 6 }) {
  return (
    <section className="carousel">
      {title && <Skeleton height="22px" width="200px" style={{ marginBottom: 14 }} />}
      <div className="carousel__track">
        {Array.from({ length: count }).map((_, i) => (
          <MovieCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}
