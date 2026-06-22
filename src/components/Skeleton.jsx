function Sk({ className = "" }) {
  return <div className={`skeleton ${className}`} />;
}

export function RideListSkeleton() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2" aria-busy="true" aria-label="Carregando caronas">
      {Array.from({ length: 4 }).map((_, i) => (
        <li key={i} className="rounded-2xl border border-blue-100 bg-white p-5 shadow-[0_2px_8px_rgba(37,99,235,0.06)]">
          <Sk className="h-4 w-3/4 rounded-md mb-2" />
          <Sk className="h-3.5 w-1/2 rounded-md mb-4" />
          <div className="flex gap-2 mb-4">
            <Sk className="h-5 w-20 rounded-full" />
            <Sk className="h-5 w-16 rounded-full" />
          </div>
          <Sk className="h-7 w-28 rounded-xl" />
        </li>
      ))}
    </ul>
  );
}

export function MyRidesSkeleton() {
  return (
    <ul className="space-y-4" aria-busy="true" aria-label="Carregando suas caronas">
      {Array.from({ length: 3 }).map((_, i) => (
        <li key={i} className="rounded-2xl border border-blue-100 bg-white p-5">
          <div className="flex justify-between mb-2">
            <div className="flex-1">
              <Sk className="h-4 w-2/3 rounded-md mb-1.5" />
              <Sk className="h-3.5 w-1/2 rounded-md" />
            </div>
            <Sk className="h-5 w-16 rounded-full ml-3" />
          </div>
          <div className="flex gap-2 mt-3 mb-4">
            <Sk className="h-5 w-24 rounded-full" />
            <Sk className="h-5 w-14 rounded-full" />
          </div>
          <div className="flex gap-2 pt-3 border-t border-slate-100">
            <Sk className="h-7 w-20 rounded-xl" />
            <Sk className="h-7 w-20 rounded-xl" />
          </div>
        </li>
      ))}
    </ul>
  );
}

export function MyBookingsSkeleton() {
  return (
    <ul className="space-y-4" aria-busy="true" aria-label="Carregando suas reservas">
      {Array.from({ length: 3 }).map((_, i) => (
        <li key={i} className="rounded-2xl border border-blue-100 bg-white p-5">
          <Sk className="h-4 w-3/4 rounded-md mb-1.5" />
          <Sk className="h-3.5 w-1/2 rounded-md mb-4" />
          <div className="flex gap-2 mb-4">
            <Sk className="h-5 w-24 rounded-full" />
            <Sk className="h-5 w-14 rounded-full" />
            <Sk className="h-5 w-20 rounded-full" />
          </div>
          <div className="flex gap-2 pt-3 border-t border-slate-100">
            <Sk className="h-7 w-24 rounded-xl" />
            <Sk className="h-7 w-28 rounded-xl" />
          </div>
        </li>
      ))}
    </ul>
  );
}

export function EventsSkeleton() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2" aria-busy="true" aria-label="Carregando eventos">
      {Array.from({ length: 4 }).map((_, i) => (
        <li key={i} className="rounded-2xl border border-blue-100 bg-white p-5">
          <Sk className="h-4 w-2/3 rounded-md mb-2" />
          <Sk className="h-3.5 w-3/4 rounded-md mb-3" />
          <Sk className="h-5 w-28 rounded-full" />
        </li>
      ))}
    </ul>
  );
}

export function VehiclesSkeleton() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2" aria-busy="true" aria-label="Carregando veículos">
      {Array.from({ length: 2 }).map((_, i) => (
        <li key={i} className="rounded-2xl border border-blue-100 bg-white p-5">
          <div className="flex justify-between mb-3">
            <Sk className="h-4 w-1/2 rounded-md" />
            <Sk className="h-5 w-14 rounded-full" />
          </div>
          <Sk className="h-3.5 w-1/3 rounded-md mb-1.5" />
          <Sk className="h-3.5 w-2/5 rounded-md mb-4" />
          <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
            <Sk className="h-7 w-16 rounded-xl" />
            <Sk className="h-7 w-16 rounded-xl" />
          </div>
        </li>
      ))}
    </ul>
  );
}

export function PublicProfileSkeleton() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-8 space-y-4" aria-busy="true" aria-label="Carregando perfil">
      <div className="rounded-2xl border border-blue-100 bg-white p-6">
        <div className="flex items-center gap-5 mb-5">
          <Sk className="w-16 h-16 rounded-2xl shrink-0" />
          <div className="flex-1">
            <Sk className="h-3 w-16 rounded mb-2" />
            <Sk className="h-5 w-40 rounded mb-2" />
            <Sk className="h-4 w-24 rounded" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[0, 1].map((i) => (
            <div key={i} className="rounded-xl border border-blue-100 bg-blue-50/50 px-4 py-3">
              <Sk className="h-3 w-20 rounded mb-2" />
              <Sk className="h-7 w-12 rounded" />
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-2xl border border-blue-100 bg-white p-6">
        <Sk className="h-3 w-12 rounded mb-3" />
        <Sk className="h-4 w-full rounded mb-2" />
        <Sk className="h-4 w-3/4 rounded" />
      </div>
      <div className="rounded-2xl border border-blue-100 bg-white p-6">
        <Sk className="h-3 w-32 rounded mb-4" />
        <div className="space-y-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-xl border border-blue-100 p-4">
              <Sk className="h-4 w-24 rounded mb-2" />
              <Sk className="h-3.5 w-full rounded" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export function EventRidesSkeleton() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-8 space-y-6" aria-busy="true" aria-label="Carregando evento">
      <div className="rounded-2xl border border-blue-100 bg-white p-8">
        <Sk className="h-3 w-16 rounded mb-2" />
        <Sk className="h-7 w-2/3 rounded mb-2" />
        <Sk className="h-4 w-1/2 rounded mb-4" />
        <div className="flex gap-3">
          <Sk className="h-5 w-32 rounded-full" />
          <Sk className="h-5 w-28 rounded-full" />
        </div>
      </div>
      <ul className="grid gap-4 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <li key={i} className="rounded-2xl border border-blue-100 bg-white p-5">
            <Sk className="h-4 w-3/4 rounded-md mb-2" />
            <Sk className="h-3.5 w-1/2 rounded-md mb-3" />
            <div className="flex gap-2">
              <Sk className="h-5 w-20 rounded-full" />
              <Sk className="h-5 w-14 rounded-full" />
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}

export function ProfileSkeleton() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-8 space-y-6" aria-busy="true" aria-label="Carregando perfil">
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
        <div className="h-28 bg-gradient-to-r from-blue-600 to-indigo-700" />
        <div className="px-6 pb-6">
          <div className="-mt-14 mb-5">
            <Sk className="w-24 h-24 rounded-2xl" />
          </div>
          <Sk className="h-5 w-48 rounded-md mb-2" />
          <Sk className="h-4 w-36 rounded-md mb-5" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[0, 1, 2].map((i) => (
              <div key={i} className="bg-blue-50/60 rounded-xl p-4 border border-blue-100">
                <Sk className="h-3 w-16 rounded mb-2" />
                <Sk className="h-4 w-24 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6">
        <Sk className="h-5 w-40 rounded mb-5" />
        {[0, 1, 2].map((i) => (
          <Sk key={i} className="h-10 w-full rounded-xl mb-4" />
        ))}
        <Sk className="h-10 w-full rounded-xl" />
      </div>
    </main>
  );
}
