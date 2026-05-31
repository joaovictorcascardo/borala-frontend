import { useState } from "react";
import { swal } from "../lib/swal";

export function AddressInput({ label, onSelect, required }) {
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");
  const [loadingCep, setLoadingCep] = useState(false);
  const [geocoding, setGeocoding] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [cepError, setCepError] = useState(null);

  const cepPreenchido = cidade !== "";

  async function handleCepChange(e) {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 8);
    setCep(raw);
    setConfirmed(false);
    setLogradouro("");
    setBairro("");
    setCidade("");
    setUf("");
    setCepError(null);
    onSelect(null);

    if (raw.length === 8) {
      setLoadingCep(true);
      try {
        const res = await fetch(`https://viacep.com.br/ws/${raw}/json/`);
        const data = await res.json();
        if (data.erro) {
          setCepError("CEP não encontrado. Verifique e tente novamente.");
        } else {
          setLogradouro(data.logradouro || "");
          setBairro(data.bairro || "");
          setCidade(data.localidade || "");
          setUf(data.uf || "");
        }
      } catch {
        setCepError("Erro ao buscar CEP. Verifique sua conexão.");
      } finally {
        setLoadingCep(false);
      }
    }
  }

  async function handleNumeroBlur() {
    if (!logradouro || !cidade) return;
    setGeocoding(true);
    setConfirmed(false);

    const fullAddress = `${logradouro}, ${bairro}, ${cidade} - ${uf}`;

    const attempts = [
      `${logradouro}, ${bairro}, ${cidade} - ${uf}, Brasil`,
      `${logradouro}, ${cidade} - ${uf}, Brasil`,
      `${bairro}, ${cidade} - ${uf}, Brasil`,
      `${cidade} - ${uf}, Brasil`,
    ];

    try {
      const tryGeocode = async (query) => {
        const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1&countrycodes=br`;
        const res = await fetch(url, { headers: { "Accept-Language": "pt-BR" } });
        const data = await res.json();
        return data.length ? data[0] : null;
      };

      let result = null;
      for (const attempt of attempts) {
        result = await tryGeocode(attempt);
        if (result) break;
      }

      if (!result) {
        swal.errorToast("Não foi possível localizar nem a cidade. Verifique o CEP.");
        return;
      }

      onSelect({
        address: fullAddress,
        lat: parseFloat(result.lat),
        lng: parseFloat(result.lon),
      });
      setConfirmed(true);
    } catch {
      swal.errorToast("Erro ao buscar coordenadas.");
    } finally {
      setGeocoding(false);
    }
  }

  const cepFormatado = cep.length > 5 ? `${cep.slice(0, 5)}-${cep.slice(5)}` : cep;

  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold text-slate-700">{label}</p>

      <div className="relative">
        <input
          className="form-input pr-8"
          placeholder="CEP (somente números)"
          value={cepFormatado}
          onChange={handleCepChange}
          maxLength={9}
          required={required}
          autoComplete="off"
        />
        {loadingCep && (
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      {cepError && (
        <p className="text-xs text-red-500">{cepError}</p>
      )}

      {cepPreenchido && (
        <div className="space-y-2 pl-3 border-l-2 border-blue-100">
          <input
            className="form-input"
            placeholder="Logradouro"
            value={logradouro}
            onChange={(e) => { setLogradouro(e.target.value); setConfirmed(false); onSelect(null); }}
          />

          <input
            className="form-input"
            placeholder="Bairro"
            value={bairro}
            onChange={(e) => { setBairro(e.target.value); setConfirmed(false); onSelect(null); }}
          />

          <div className="grid grid-cols-3 gap-2">
            <div className="col-span-2">
              <input className="form-input bg-slate-50 text-slate-400 cursor-not-allowed" value={cidade} disabled />
            </div>
            <input className="form-input bg-slate-50 text-slate-400 cursor-not-allowed" value={uf} disabled />
          </div>

          {!confirmed && (
            <button
              type="button"
              onClick={handleNumeroBlur}
              disabled={geocoding || !logradouro}
              className="w-full inline-flex items-center justify-center rounded-xl border border-blue-300 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-100 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              {geocoding ? "Localizando..." : "Confirmar endereço"}
            </button>
          )}

          {confirmed && (
            <p className="text-xs text-emerald-600 font-medium">✓ Endereço confirmado</p>
          )}
        </div>
      )}
    </div>
  );
}
