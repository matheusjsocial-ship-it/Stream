import { useState } from "react";

const MP_PUBLIC_KEY = "TEST-fde083b2-b994-4015-a849-7ef8d7e604c1";

const PLANOS = [
  {
    id: "basic",
    nome: "Básico",
    emoji: "📺",
    valor: 1.99,
    descricao: "Sem anúncios, legendas PT+EN+JP, áudio PT+EN+JP, 720p",
    cor: "#22c55e",
    features: ["Sem anúncios","Legenda única + dupla PT/EN/JP","Áudio PT • EN • JP","Qualidade até 720p","Trailer integrado"]
  },
  {
    id: "premium",
    nome: "Aprendiz",
    emoji: "📚",
    valor: 6.90,
    descricao: "Tudo do Básico + ORION professor IA + 12 idiomas + HD",
    cor: "#f97316",
    features: ["Tudo do Básico","ORION — Professor IA","Legenda dupla 12 idiomas","HD 1080p","Watch Party","Quiz ao vivo +XP"]
  },
  {
    id: "agent",
    nome: "Fluente",
    emoji: "🤖",
    valor: 12.90,
    descricao: "ORION ilimitado + 12 idiomas de áudio + 4K",
    cor: "#a855f7",
    popular: true,
    features: ["Tudo do Aprendiz","ORION ilimitado","Áudio 12 idiomas","4K + Download offline","Watch Party ilimitada","Recomendações IA"]
  }
];

// Desconto progressivo exato
function calcDesc(meses){
  if(meses < 2)  return 0;
  if(meses < 4)  return 5;
  if(meses < 8)  return 10;
  return Math.min(15 + Math.floor((meses-8)/3)*5, 40);
}

const TABELA_DESC = [
  {range:"Mês 2-3",   desc:5},
  {range:"Mês 4-7",   desc:10},
  {range:"Mês 8-10",  desc:15},
  {range:"Mês 11-13", desc:20},
  {range:"Mês 17-19", desc:30},
  {range:"Mês 23+",   desc:40},
];

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Nunito:wght@400;600;700;800;900&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{background:#06060e;color:#e2e8f0;font-family:'Nunito',sans-serif;min-height:100vh}
.fade{animation:fi .3s ease}@keyframes fi{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
.spin{animation:sp .9s linear infinite}@keyframes sp{to{transform:rotate(360deg)}}
input{font-family:'Nunito',sans-serif}
`;

export default function MercadoPago({ planoSelecionado = "premium", onSuccess, onBack }) {
  const [step, setStep]         = useState("plano");   // plano → form → pix → sucesso
  const [plano, setPlano]       = useState(planoSelecionado);
  const [metodo, setMetodo]     = useState("pix");
  const [loading, setLoading]   = useState(false);
  const [pixCode, setPixCode]   = useState("");
  const [pixExpira, setPixExpira] = useState("");
  const [copied, setCopied]     = useState(false);
  const [form, setForm]         = useState({
    nome: "", email: "", cpf: "",
    cartao: "", validade: "", cvv: "", nomecartao: ""
  });
  const [errors, setErrors]     = useState({});

  const planoAtual = PLANOS.find(p => p.id === plano);

  function validar() {
    const e = {};
    if (!form.nome.trim())  e.nome  = "Nome obrigatório";
    if (!form.email.includes("@")) e.email = "Email inválido";
    if (form.cpf.replace(/\D/g,"").length !== 11) e.cpf = "CPF inválido";
    if (metodo === "cartao") {
      if (form.cartao.replace(/\s/g,"").length < 16) e.cartao  = "Cartão inválido";
      if (!form.validade.includes("/"))              e.validade = "Validade inválida";
      if (form.cvv.length < 3)                       e.cvv     = "CVV inválido";
      if (!form.nomecartao.trim())                   e.nomecartao = "Nome no cartão obrigatório";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function processar() {
    if (!validar()) return;
    setLoading(true);
    // Simular chamada à API do Mercado Pago
    await new Promise(r => setTimeout(r, 2000));

    if (metodo === "pix") {
      // Gera PIX fake para demonstração (em produção vem da API MP)
      const expira = new Date(Date.now() + 30 * 60000);
      setPixCode("00020126580014BR.GOV.BCB.PIX0136" + Math.random().toString(36).slice(2,38).toUpperCase() + "520400005303986540" + planoAtual.valor.toFixed(2).replace(".","") + "5802BR5913LinguaStream6008Sao Paulo62070503***6304" + Math.floor(Math.random()*9999).toString().padStart(4,"0"));
      setPixExpira(expira.toLocaleTimeString("pt-BR", {hour:"2-digit", minute:"2-digit"}));
      setStep("pix");
    } else {
      setStep("sucesso");
      if (onSuccess) onSuccess(plano);
    }
    setLoading(false);
  }

  function copiarPix() {
    navigator.clipboard?.writeText(pixCode).catch(()=>{});
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  }

  function simularPagoPix() {
    setStep("sucesso");
    if (onSuccess) onSuccess(plano);
  }

  function formatCPF(v)     { return v.replace(/\D/g,"").replace(/(\d{3})(\d)/,"$1.$2").replace(/(\d{3})(\d)/,"$1.$2").replace(/(\d{3})(\d{1,2})$/,"$1-$2").slice(0,14); }
  function formatCartao(v)  { return v.replace(/\D/g,"").replace(/(\d{4})/g,"$1 ").trim().slice(0,19); }
  function formatValidade(v){ return v.replace(/\D/g,"").replace(/(\d{2})(\d)/,"$1/$2").slice(0,5); }

  const inp = (style={}) => ({
    width:"100%", background:"#111128", border:"1px solid #1a1a36",
    borderRadius:9, padding:"11px 13px", color:"#e2e8f0",
    fontSize:13, outline:"none", ...style
  });
  const errStyle = { fontSize:10, color:"#ef4444", marginTop:3 };

  /* ── STEP: PLANO ── */
  if (step === "plano") return (
    <div style={{minHeight:"100vh",background:"#06060e",padding:"24px 14px"}} className="fade">
      <style>{CSS}</style>
      <div style={{maxWidth:480,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:24}}>
          <div style={{fontFamily:"Bebas Neue",fontSize:32,letterSpacing:1}}>LINGUA<span style={{color:"#f97316"}}>STREAM</span></div>
          <div style={{fontSize:13,color:"#64748b",marginTop:4}}>Escolha seu plano</div>
        </div>
        {PLANOS.map(p => (
          <div key={p.id} onClick={()=>setPlano(p.id)} style={{background:"#0d0d1a",border:`2px solid ${plano===p.id?p.cor:"#1a1a36"}`,borderRadius:14,padding:16,marginBottom:12,cursor:"pointer",position:"relative",transition:"border .2s"}}>
            {p.popular && <div style={{position:"absolute",top:-10,right:14,background:"linear-gradient(135deg,#a855f7,#6366f1)",color:"white",padding:"2px 12px",borderRadius:14,fontSize:9,fontWeight:800}}>⭐ MAIS POPULAR</div>}
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
              <div style={{fontSize:28}}>{p.emoji}</div>
              <div style={{flex:1}}>
                <div style={{fontFamily:"Bebas Neue",fontSize:18,letterSpacing:1,color:p.cor}}>{p.nome}</div>
                <div style={{fontSize:11,color:"#64748b"}}>{p.descricao}</div>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{fontFamily:"Bebas Neue",fontSize:28,color:"white"}}>R${p.valor.toFixed(2).replace(".",",")}</div>
                <div style={{fontSize:10,color:"#64748b"}}>/mês</div>
              </div>
            </div>
            {p.features.map(f => <div key={f} style={{display:"flex",alignItems:"center",gap:6,marginBottom:4,fontSize:11}}><span style={{color:"#22c55e"}}>✓</span>{f}</div>)}
          </div>
        ))}
        <button onClick={()=>setStep("form")} style={{width:"100%",padding:"13px",background:`linear-gradient(135deg,${planoAtual.cor},${plano==="agent"?"#6366f1":"#ef4444"})`,border:"none",borderRadius:11,color:"white",fontWeight:800,cursor:"pointer",fontSize:14,marginTop:8}}>
          Assinar {planoAtual.nome} por R${planoAtual.valor.toFixed(2).replace(".",",")} →
        </button>
        {onBack && <button onClick={onBack} style={{width:"100%",padding:"10px",background:"transparent",border:"none",color:"#64748b",cursor:"pointer",fontSize:12,marginTop:8}}>← Voltar</button>}
      </div>
    </div>
  );

  /* ── STEP: FORMULÁRIO ── */
  if (step === "form") return (
    <div style={{minHeight:"100vh",background:"#06060e",padding:"20px 14px"}} className="fade">
      <style>{CSS}</style>
      <div style={{maxWidth:480,margin:"0 auto"}}>
        {/* Header */}
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:20}}>
          <button onClick={()=>setStep("plano")} style={{background:"transparent",border:"none",color:"#64748b",cursor:"pointer",fontSize:18}}>←</button>
          <div>
            <div style={{fontFamily:"Bebas Neue",fontSize:20,letterSpacing:1}}>FINALIZAR ASSINATURA</div>
            <div style={{fontSize:11,color:"#64748b"}}>{planoAtual.emoji} {planoAtual.nome} — R${planoAtual.valor.toFixed(2).replace(".",",")}/mês</div>
          </div>
        </div>

        {/* Método de pagamento */}
        <div style={{background:"#0d0d1a",borderRadius:12,padding:14,border:"1px solid #1a1a36",marginBottom:14}}>
          <div style={{fontSize:11,color:"#64748b",fontWeight:800,marginBottom:10,letterSpacing:.8}}>💳 FORMA DE PAGAMENTO</div>
          <div style={{display:"flex",gap:8}}>
            {[["pix","⚡ PIX","#22c55e"],["cartao","💳 Cartão","#3b82f6"],["boleto","📄 Boleto","#f97316"]].map(([id,label,cor])=>(
              <button key={id} onClick={()=>setMetodo(id)} style={{flex:1,padding:"9px 6px",borderRadius:9,border:`2px solid ${metodo===id?cor:"#1a1a36"}`,background:metodo===id?cor+"15":"transparent",color:metodo===id?cor:"#64748b",fontWeight:700,cursor:"pointer",fontSize:11,transition:"all .15s"}}>
                {label}
                {id==="pix"&&<div style={{fontSize:8,marginTop:1,opacity:.7}}>Aprovação imediata</div>}
                {id==="cartao"&&<div style={{fontSize:8,marginTop:1,opacity:.7}}>1x sem juros</div>}
                {id==="boleto"&&<div style={{fontSize:8,marginTop:1,opacity:.7}}>Vence em 1 dia</div>}
              </button>
            ))}
          </div>
        </div>

        {/* Dados pessoais */}
        <div style={{background:"#0d0d1a",borderRadius:12,padding:14,border:"1px solid #1a1a36",marginBottom:14}}>
          <div style={{fontSize:11,color:"#64748b",fontWeight:800,marginBottom:12,letterSpacing:.8}}>👤 SEUS DADOS</div>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            <div>
              <input value={form.nome} onChange={e=>setForm(p=>({...p,nome:e.target.value}))} placeholder="Nome completo" style={{...inp(), borderColor: errors.nome?"#ef4444":"#1a1a36"}}/>
              {errors.nome && <div style={errStyle}>{errors.nome}</div>}
            </div>
            <div>
              <input type="email" value={form.email} onChange={e=>setForm(p=>({...p,email:e.target.value}))} placeholder="Email" style={{...inp(), borderColor: errors.email?"#ef4444":"#1a1a36"}}/>
              {errors.email && <div style={errStyle}>{errors.email}</div>}
            </div>
            <div>
              <input value={form.cpf} onChange={e=>setForm(p=>({...p,cpf:formatCPF(e.target.value)}))} placeholder="CPF (000.000.000-00)" style={{...inp(), borderColor: errors.cpf?"#ef4444":"#1a1a36"}}/>
              {errors.cpf && <div style={errStyle}>{errors.cpf}</div>}
            </div>
          </div>
        </div>

        {/* Dados do cartão */}
        {metodo === "cartao" && (
          <div style={{background:"#0d0d1a",borderRadius:12,padding:14,border:"1px solid #1a1a36",marginBottom:14}} className="fade">
            <div style={{fontSize:11,color:"#64748b",fontWeight:800,marginBottom:12,letterSpacing:.8}}>💳 DADOS DO CARTÃO</div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              <div>
                <input value={form.cartao} onChange={e=>setForm(p=>({...p,cartao:formatCartao(e.target.value)}))} placeholder="0000 0000 0000 0000" style={{...inp(), borderColor: errors.cartao?"#ef4444":"#1a1a36"}}/>
                {errors.cartao && <div style={errStyle}>{errors.cartao}</div>}
              </div>
              <div style={{display:"flex",gap:8}}>
                <div style={{flex:1}}>
                  <input value={form.validade} onChange={e=>setForm(p=>({...p,validade:formatValidade(e.target.value)}))} placeholder="MM/AA" style={{...inp(), borderColor: errors.validade?"#ef4444":"#1a1a36"}}/>
                  {errors.validade && <div style={errStyle}>{errors.validade}</div>}
                </div>
                <div style={{flex:1}}>
                  <input value={form.cvv} onChange={e=>setForm(p=>({...p,cvv:e.target.value.replace(/\D/g,"").slice(0,4)}))} placeholder="CVV" style={{...inp(), borderColor: errors.cvv?"#ef4444":"#1a1a36"}}/>
                  {errors.cvv && <div style={errStyle}>{errors.cvv}</div>}
                </div>
              </div>
              <div>
                <input value={form.nomecartao} onChange={e=>setForm(p=>({...p,nomecartao:e.target.value.toUpperCase()}))} placeholder="NOME NO CARTÃO" style={{...inp(), borderColor: errors.nomecartao?"#ef4444":"#1a1a36"}}/>
                {errors.nomecartao && <div style={errStyle}>{errors.nomecartao}</div>}
              </div>
            </div>
          </div>
        )}

        {/* Resumo */}
        {/* Desconto progressivo */}
        <div style={{background:"rgba(34,197,94,.06)",border:"1px solid rgba(34,197,94,.2)",borderRadius:11,padding:11,marginBottom:11}}>
          <div style={{fontSize:9,color:"#22c55e",fontWeight:800,marginBottom:6}}>📈 SEU DESCONTO CRESCE TODO MÊS</div>
          <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
            {TABELA_DESC.map(d=>(
              <div key={d.range} style={{background:"rgba(34,197,94,.1)",borderRadius:6,padding:"3px 7px",fontSize:8,color:"#22c55e",fontWeight:700,textAlign:"center"}}>
                <div>{d.range}</div>
                <div style={{fontSize:10}}>{d.desc}% OFF</div>
              </div>
            ))}
            <div style={{width:"100%",background:"rgba(168,85,247,.1)",borderRadius:6,padding:"4px 7px",fontSize:8,color:"#a855f7",fontWeight:700,marginTop:3}}>
              🎯 + 10% extra completando TODAS as missões = 50% máximo!
            </div>
          </div>
          <div style={{fontSize:8,color:"#475569",marginTop:5}}>
            Exemplo: no 12º mês você paga R${(planoAtual.valor * 0.80).toFixed(2).replace(".",",")} em vez de R${planoAtual.valor.toFixed(2).replace(".",",")} 🎉
          </div>
        </div>

        <div style={{background:"rgba(249,115,22,.06)",border:"1px solid rgba(249,115,22,.2)",borderRadius:11,padding:12,marginBottom:14}}>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:4}}>
            <span style={{color:"#94a3b8"}}>Plano {planoAtual.nome}</span>
            <span style={{fontWeight:700}}>R${planoAtual.valor.toFixed(2).replace(".",",")}/mês</span>
          </div>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:4}}>
            <span style={{color:"#94a3b8"}}>Taxa {metodo==="pix"?"PIX (0,99%)":metodo==="cartao"?"Cartão (4,98%)":"Boleto"}</span>
            <span style={{color:"#64748b",fontSize:10}}>
              {metodo==="boleto"?"R$ 3,49":"R$ " + (planoAtual.valor * (metodo==="pix"?0.0099:0.0498)).toFixed(2).replace(".",",")}
            </span>
          </div>
          <div style={{borderTop:"1px solid rgba(249,115,22,.2)",marginTop:6,paddingTop:6,display:"flex",justifyContent:"space-between",fontWeight:800,fontSize:13}}>
            <span>Total</span>
            <span style={{color:"#f97316"}}>R${planoAtual.valor.toFixed(2).replace(".",",")} <span style={{fontSize:10,fontWeight:400,color:"#64748b"}}>/mês</span></span>
          </div>
        </div>

        <button onClick={processar} disabled={loading} style={{width:"100%",padding:"13px",background:loading?"#1a1a36":`linear-gradient(135deg,${planoAtual.cor},${plano==="agent"?"#6366f1":"#ef4444"})`,border:"none",borderRadius:11,color:"white",fontWeight:800,cursor:loading?"not-allowed":"pointer",fontSize:14,display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
          {loading?<><div className="spin" style={{width:16,height:16,border:"2px solid rgba(255,255,255,.3)",borderTopColor:"white",borderRadius:"50%"}}/>Processando...</>
          :metodo==="pix"?"⚡ Gerar PIX":metodo==="cartao"?"💳 Pagar com Cartão":"📄 Gerar Boleto"}
        </button>

        <div style={{textAlign:"center",fontSize:10,color:"#475569",marginTop:10,display:"flex",alignItems:"center",justifyContent:"center",gap:4}}>
          🔒 Pagamento seguro via Mercado Pago · Cancele quando quiser
        </div>
      </div>
    </div>
  );

  /* ── STEP: PIX ── */
  if (step === "pix") return (
    <div style={{minHeight:"100vh",background:"#06060e",padding:"20px 14px"}} className="fade">
      <style>{CSS}</style>
      <div style={{maxWidth:480,margin:"0 auto",textAlign:"center"}}>
        <div style={{fontFamily:"Bebas Neue",fontSize:24,letterSpacing:1,marginBottom:4}}>⚡ PAGUE COM PIX</div>
        <div style={{fontSize:12,color:"#64748b",marginBottom:20}}>Copie o código e pague no seu banco</div>

        {/* QR Code simulado */}
        <div style={{background:"white",borderRadius:14,padding:20,display:"inline-block",marginBottom:16}}>
          <div style={{width:160,height:160,background:"#06060e",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:4}}>
            <div style={{fontSize:40}}>⚡</div>
            <div style={{fontFamily:"Bebas Neue",fontSize:14,letterSpacing:1,color:"#22c55e"}}>PIX</div>
            <div style={{fontSize:10,color:"#64748b"}}>QR Code</div>
          </div>
        </div>

        <div style={{background:"#0d0d1a",border:"1px solid #1a1a36",borderRadius:11,padding:14,marginBottom:14,textAlign:"left"}}>
          <div style={{fontSize:10,color:"#64748b",fontWeight:800,marginBottom:6}}>📋 CÓDIGO PIX COPIA E COLA</div>
          <div style={{fontSize:10,color:"#94a3b8",wordBreak:"break-all",lineHeight:1.6,marginBottom:8}}>{pixCode.slice(0,60)}...</div>
          <button onClick={copiarPix} style={{width:"100%",padding:"9px",background:copied?"rgba(34,197,94,.15)":"rgba(34,197,94,.08)",border:`1px solid ${copied?"rgba(34,197,94,.5)":"rgba(34,197,94,.25)"}`,borderRadius:8,color:copied?"#22c55e":"#22c55e",fontWeight:800,cursor:"pointer",fontSize:12}}>
            {copied?"✅ Copiado!":"📋 Copiar código PIX"}
          </button>
        </div>

        <div style={{background:"rgba(249,115,22,.06)",border:"1px solid rgba(249,115,22,.2)",borderRadius:11,padding:12,marginBottom:16}}>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:4}}>
            <span style={{color:"#94a3b8"}}>Valor</span>
            <span style={{fontWeight:800,color:"#f97316"}}>R${planoAtual.valor.toFixed(2).replace(".",",")}</span>
          </div>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:12}}>
            <span style={{color:"#94a3b8"}}>⏱️ Expira às</span>
            <span style={{fontWeight:700,color:"#ef4444"}}>{pixExpira}</span>
          </div>
        </div>

        <div style={{fontSize:11,color:"#64748b",marginBottom:16}}>Após o pagamento o seu plano é ativado automaticamente em até 1 minuto!</div>

        {/* Botão para simular pagamento aprovado (demo) */}
        <button onClick={simularPagoPix} style={{width:"100%",padding:"11px",background:"linear-gradient(135deg,#22c55e,#16a34a)",border:"none",borderRadius:10,color:"white",fontWeight:800,cursor:"pointer",fontSize:13,marginBottom:8}}>
          ✅ Simular pagamento aprovado (demo)
        </button>

        <button onClick={()=>setStep("form")} style={{width:"100%",padding:"9px",background:"transparent",border:"none",color:"#64748b",cursor:"pointer",fontSize:11}}>← Voltar</button>
      </div>
    </div>
  );

  /* ── STEP: SUCESSO ── */
  return (
    <div style={{minHeight:"100vh",background:"#06060e",padding:"20px 14px",display:"flex",alignItems:"center",justifyContent:"center"}} className="fade">
      <style>{CSS}</style>
      <div style={{maxWidth:400,textAlign:"center"}}>
        <div style={{fontSize:64,marginBottom:12}}>🎉</div>
        <div style={{fontFamily:"Bebas Neue",fontSize:28,letterSpacing:1,marginBottom:4}}>PAGAMENTO APROVADO!</div>
        <div style={{fontSize:13,color:"#64748b",marginBottom:24}}>Bem-vindo ao plano <span style={{color:planoAtual.cor,fontWeight:800}}>{planoAtual.emoji} {planoAtual.nome}</span>!</div>

        <div style={{background:"#0d0d1a",borderRadius:14,padding:16,border:"1px solid #1a1a36",marginBottom:20,textAlign:"left"}}>
          {planoAtual.features.map(f=>(
            <div key={f} style={{display:"flex",alignItems:"center",gap:8,marginBottom:8,fontSize:12}}>
              <span style={{color:"#22c55e",fontSize:14}}>✓</span>{f}
            </div>
          ))}
        </div>

        <button onClick={()=>onSuccess?onSuccess(plano):null} style={{width:"100%",padding:"13px",background:`linear-gradient(135deg,${planoAtual.cor},${plano==="agent"?"#6366f1":"#ef4444"})`,border:"none",borderRadius:11,color:"white",fontWeight:800,cursor:"pointer",fontSize:14}}>
          🚀 Começar a usar agora!
        </button>
      </div>
    </div>
  );
}
