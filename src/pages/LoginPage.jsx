import { useState } from "react";
import { api } from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { swal } from "../lib/swal";

function TravelIllustration() {
  return (
    <svg
      viewBox="0 0 480 520"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-xs xl:max-w-sm"
    >
      <circle cx="240" cy="260" r="195" stroke="white" strokeWidth="1" strokeOpacity="0.08" />
      <circle cx="240" cy="260" r="150" fill="white" fillOpacity="0.06" />

      <g fill="white" fillOpacity="0.55">
        <ellipse cx="80" cy="88" rx="36" ry="18" />
        <ellipse cx="108" cy="80" rx="26" ry="17" />
        <ellipse cx="57" cy="84" rx="20" ry="14" />
        <ellipse cx="82" cy="96" rx="42" ry="13" />
      </g>
      <g fill="white" fillOpacity="0.38">
        <ellipse cx="370" cy="120" rx="28" ry="14" />
        <ellipse cx="393" cy="113" rx="20" ry="13" />
        <ellipse cx="351" cy="116" rx="16" ry="11" />
        <ellipse cx="373" cy="128" rx="33" ry="10" />
      </g>

      <g transform="translate(175, 65) rotate(-10)">
        <path
          d="M0,9 C0,4 4,0 9,0 L68,0 C73,0 78,4 78,9 C78,14 73,18 68,18 L9,18 C4,18 0,14 0,9Z"
          fill="white" fillOpacity="0.9"
        />
        <path d="M68,0 L68,18 C76,18 86,14 86,9 C86,4 76,0 68,0Z" fill="white" fillOpacity="0.85" />
        <path d="M28,18 L8,52 L56,43 L60,18Z" fill="white" fillOpacity="0.72" />
        <path d="M4,18 L-8,32 L14,29 L16,18Z" fill="white" fillOpacity="0.72" />
        <path d="M0,0 L-12,-18 L8,0Z" fill="white" fillOpacity="0.72" />
        <circle cx="42" cy="7" r="4" fill="rgba(99,102,241,0.4)" />
        <circle cx="53" cy="7" r="4" fill="rgba(99,102,241,0.4)" />
        <circle cx="64" cy="7" r="4" fill="rgba(99,102,241,0.4)" />
      </g>
      <path
        d="M155,70 Q120,78 80,90"
        stroke="white" strokeWidth="2" strokeOpacity="0.3"
        strokeDasharray="4 6" strokeLinecap="round"
      />

      <circle cx="230" cy="290" r="158" fill="white" fillOpacity="0.07" />
      <circle cx="230" cy="290" r="158" stroke="white" strokeWidth="2" strokeOpacity="0.18" />

      <circle cx="215" cy="195" r="28" fill="white" fillOpacity="0.92" />
      <path
        d="M190,190 C190,172 202,162 215,162 C228,162 240,172 240,190 C235,178 228,173 215,175 C202,173 195,178 190,190Z"
        fill="rgba(79,70,229,0.45)"
      />
      <rect x="207" y="221" width="16" height="10" rx="4" fill="white" fillOpacity="0.88" />
      <path
        d="M192,232 L192,328 Q192,336 200,336 L230,336 Q238,336 238,328 L238,232 Q228,226 215,226 Q202,226 192,232Z"
        fill="white" fillOpacity="0.88"
      />
      <path
        d="M192,250 C178,258 163,267 150,277"
        stroke="white" strokeOpacity="0.88" strokeWidth="13" strokeLinecap="round"
      />
      <path
        d="M238,250 C252,258 262,272 260,292"
        stroke="white" strokeOpacity="0.88" strokeWidth="13" strokeLinecap="round"
      />
      <path
        d="M200,334 C196,360 191,380 184,402"
        stroke="white" strokeOpacity="0.88" strokeWidth="15" strokeLinecap="round"
      />
      <path
        d="M228,334 C232,360 238,380 248,402"
        stroke="white" strokeOpacity="0.88" strokeWidth="15" strokeLinecap="round"
      />
      <ellipse cx="182" cy="404" rx="19" ry="8" fill="white" fillOpacity="0.78" />
      <ellipse cx="250" cy="404" rx="19" ry="8" fill="white" fillOpacity="0.78" />

      <g transform="translate(108, 260)">
        <path
          d="M13,8 L13,0 Q22,0 37,0 L37,8"
          stroke="white" strokeOpacity="0.85" strokeWidth="4.5" strokeLinecap="round"
        />
        <rect x="0" y="10" width="50" height="62" rx="7" fill="white" fillOpacity="0.85" />
        <line x1="0" y1="38" x2="50" y2="38" stroke="rgba(99,102,241,0.38)" strokeWidth="2.5" />
        <rect x="21" y="33" width="8" height="10" rx="2" fill="rgba(99,102,241,0.3)" />
        <circle cx="11" cy="74" r="6" fill="white" fillOpacity="0.6" />
        <circle cx="39" cy="74" r="6" fill="white" fillOpacity="0.6" />
      </g>

      <g transform="translate(308, 172)">
        <circle cx="24" cy="30" r="30" fill="white" fillOpacity="0.06" />
        <path
          d="M24,0 C10.7,0 0,10.7 0,24 C0,42 24,58 24,58 C24,58 48,42 48,24 C48,10.7 37.3,0 24,0Z"
          fill="white" fillOpacity="0.9"
        />
        <circle cx="24" cy="24" r="11" fill="rgba(59,130,246,0.45)" />
        <circle cx="24" cy="24" r="4.5" fill="white" />
        <ellipse cx="24" cy="58" rx="14" ry="5" fill="white" fillOpacity="0.2" />
        <ellipse cx="24" cy="58" rx="22" ry="7" fill="white" fillOpacity="0.1" />
      </g>

      <path
        d="M153,290 Q188,303 215,320 Q258,344 308,232"
        stroke="white" strokeOpacity="0.2" strokeWidth="2"
        strokeDasharray="6 8"
      />

      <g transform="translate(290, 312)">
        <rect width="108" height="62" rx="14" fill="white" fillOpacity="0.14" />
        <rect width="108" height="62" rx="14" stroke="white" strokeOpacity="0.28" strokeWidth="1.2" />
        <rect x="10" y="10" width="22" height="22" rx="6" fill="white" fillOpacity="0.22" />
        <circle cx="16" cy="17" r="3" fill="white" fillOpacity="0.55" />
        <path d="M21,24 C21,19 28,19 28,24 C28,27 25,29 21,29Z" fill="white" fillOpacity="0.5" />
        <rect x="42" y="13" width="55" height="5.5" rx="2.75" fill="white" fillOpacity="0.55" />
        <rect x="42" y="23" width="40" height="4.5" rx="2.25" fill="white" fillOpacity="0.32" />
        <rect x="42" y="32" width="46" height="4.5" rx="2.25" fill="white" fillOpacity="0.32" />
        <rect x="10" y="44" width="88" height="4" rx="2" fill="white" fillOpacity="0.18" />
      </g>

      <g fill="white">
        <path d="M28,520 C24,490 16,455 22,430 C30,455 38,490 32,520Z" fillOpacity="0.22" />
        <path d="M20,500 C0,475 -2,448 8,435 C12,452 18,478 28,498Z" fillOpacity="0.2" />
        <path d="M32,485 C18,462 20,438 30,425 C30,445 28,465 36,482Z" fillOpacity="0.18" />
        <path d="M46,510 C28,495 20,470 28,455 C34,470 42,490 50,508Z" fillOpacity="0.2" />
        <path d="M62,520 C60,490 65,460 55,435 C56,458 52,488 58,520Z" fillOpacity="0.16" />
        <path d="M70,500 C80,478 78,452 68,440 C68,458 68,480 65,498Z" fillOpacity="0.15" />
        <circle cx="8" cy="432" r="9" fillOpacity="0.1" />
        <circle cx="66" cy="438" r="7" fillOpacity="0.09" />
      </g>

      <g fill="white" transform="translate(390, 0)">
        <path d="M52,520 C56,490 64,455 58,430 C50,455 42,490 48,520Z" fillOpacity="0.22" />
        <path d="M60,500 C80,475 82,448 72,435 C68,452 62,478 52,498Z" fillOpacity="0.2" />
        <path d="M48,485 C62,462 60,438 50,425 C50,445 52,465 44,482Z" fillOpacity="0.18" />
        <path d="M34,510 C52,495 60,470 52,455 C46,470 38,490 30,508Z" fillOpacity="0.2" />
        <path d="M18,520 C20,490 15,460 25,435 C24,458 28,488 22,520Z" fillOpacity="0.16" />
        <path d="M10,500 C0,478 2,452 12,440 C12,458 12,480 15,498Z" fillOpacity="0.15" />
        <circle cx="72" cy="432" r="9" fillOpacity="0.1" />
        <circle cx="14" cy="438" r="7" fillOpacity="0.09" />
      </g>

      <circle cx="92" cy="188" r="5" fill="white" fillOpacity="0.4" />
      <circle cx="116" cy="170" r="3" fill="white" fillOpacity="0.3" />
      <circle cx="402" cy="258" r="5.5" fill="white" fillOpacity="0.28" />
      <circle cx="380" cy="282" r="3.5" fill="white" fillOpacity="0.22" />
      <circle cx="362" cy="145" r="4" fill="white" fillOpacity="0.35" />
      <path
        d="M78,155 L81,147 L84,155 L92,158 L84,161 L81,169 L78,161 L70,158Z"
        fill="white" fillOpacity="0.45"
      />
      <path
        d="M408,196 L410,191 L412,196 L417,198 L412,200 L410,205 L408,200 L403,198Z"
        fill="white" fillOpacity="0.35"
      />
    </svg>
  );
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api("/authenticator/sessions", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      localStorage.setItem("@Borala:token", response.token);
      navigate("/");
    } catch (err) {
      swal.error(err.message || "E-mail ou senha inválidos.", "Acesso negado");
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 relative overflow-hidden flex-col items-center justify-center px-12 py-10">
        <div className="absolute top-8 left-8 flex items-center gap-2.5">
          <div className="w-9 h-9 bg-white/15 rounded-xl flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </div>
          <span className="text-white font-bold text-xl tracking-tight">Borala</span>
        </div>

        <TravelIllustration />

        <div className="absolute bottom-10 left-0 right-0 px-12 text-center">
          <p className="text-white font-semibold text-lg">Sua próxima aventura começa aqui</p>
          <p className="text-blue-200 text-sm mt-1">Explore destinos incríveis ao redor do mundo</p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-blue-50 via-white to-slate-100">
        <div className="w-full max-w-md">
          <div className="text-center mb-8 lg:hidden">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-600 rounded-2xl shadow-lg mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-800">Borala</h2>
            <p className="text-slate-500 text-sm mt-1">Sua plataforma de viagens</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-10">
            <h1 className="text-2xl font-bold text-slate-800 mb-1">Bem-vindo de volta!</h1>
            <p className="text-slate-500 text-sm mb-8">Entre com suas credenciais para continuar</p>

            <form onSubmit={handleSubmit}>
              <Input
                id="email"
                label="E-mail"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                id="password"
                label="Senha"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div className="flex justify-end mb-6">
                <Link
                  to="/forgot"
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  Esqueci minha senha
                </Link>
              </div>

              <Button type="submit" text="Entrar" />
            </form>
          </div>

          <p className="text-center text-sm text-slate-500 mt-6">
            Não tem conta?{" "}
            <Link to="/register" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
              Criar agora
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
