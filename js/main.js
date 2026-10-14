/* ============ helpers ============ */
var $ = function(s, r){ return (r||document).querySelector(s); };
var $$ = function(s, r){ return Array.prototype.slice.call((r||document).querySelectorAll(s)); };
function esc(s){ return String(s).replace(/[&<>"]/g, function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]; }); }
function hashStr(s){ var h=2166136261; for(var i=0;i<s.length;i++){ h^=s.charCodeAt(i); h=Math.imul(h,16777619); } return h>>>0; }
function rng(seed){ var a=seed>>>0; return function(){ a|=0; a=a+0x6D2B79F5|0; var t=Math.imul(a^a>>>15,1|a); t=t+Math.imul(t^t>>>7,61|t)^t; return ((t^t>>>14)>>>0)/4294967296; }; }

/* ============ procedural key art (placeholder until real images are added) ============ */
var coverN = 0;
function cover(g, w, h, variant){
  if(g.cover && !variant){ var ic = (w&&w<=100&&g.icon); return '<img src="'+(ic?g.icon:g.cover)+'" alt="'+esc(g.title)+'" loading="lazy"'+(!ic&&g.coverPos?' style="object-position:'+g.coverPos+'"':'')+'>'; }
  variant = variant || 0; w = w||460; h = h||215;
  var r = rng(hashStr(g.id) + variant*977), hue = (g.hue + variant*22) % 360, h2 = (hue+55)%360, id = "cg"+(coverN++);
  var s = '<svg viewBox="0 0 '+w+' '+h+'" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="'+esc(g.title)+'">'
    + '<defs><linearGradient id="'+id+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="hsl('+hue+' 55% 14%)"/><stop offset="1" stop-color="hsl('+h2+' 60% 36%)"/></linearGradient></defs>'
    + '<rect width="'+w+'" height="'+h+'" fill="url(#'+id+')"/>', i, x, y, k;
  if(g.motif==="moon"){
    s += '<circle cx="'+(w*(.55+r()*.25))+'" cy="'+(h*.34)+'" r="'+(h*.17)+'" fill="hsl('+hue+' 70% 88%)"/>';
    for(k=0;k<3;k++){ y=h*(.55+k*.14); var d='M0 '+h+' L0 '+y; for(i=0;i<=6;i++){ d+=' L'+(i*w/6)+' '+(y-r()*h*.16); } d+=' L'+w+' '+h+' Z';
      s += '<path d="'+d+'" fill="hsl('+hue+' 45% '+(10+k*7)+'%)"/>'; }
    x=w*(.3+r()*.4); s += '<circle cx="'+x+'" cy="'+(h*.78)+'" r="26" fill="hsl(38 100% 60%)" opacity=".22"/><circle cx="'+x+'" cy="'+(h*.78)+'" r="6" fill="hsl(40 100% 72%)"/>';
  } else if(g.motif==="bricks"){
    for(x=0;x<w;x+=26){ var bh=h*(.25+r()*.45); s += '<rect x="'+x+'" y="'+(h*.78-bh)+'" width="23" height="'+bh+'" fill="hsl('+(hue+r()*20)+' 50% '+(22+r()*22)+'%)"/>';
      s += '<rect x="'+(x+5)+'" y="'+(h*.78-bh+6)+'" width="5" height="5" fill="hsl(46 100% 70%)" opacity="'+(r()>.5?.9:.2)+'"/>'; }
    s += '<rect y="'+(h*.78)+'" width="'+w+'" height="'+(h*.22)+'" fill="hsl('+h2+' 70% 45%)" opacity=".65"/>';
    for(i=0;i<5;i++){ s += '<rect x="'+(r()*w)+'" y="'+(h*.8+r()*h*.16)+'" width="'+(20+r()*40)+'" height="2" fill="#fff" opacity=".25"/>'; }
  } else if(g.motif==="stars"){
    for(i=0;i<46;i++){ s += '<circle cx="'+(r()*w)+'" cy="'+(r()*h)+'" r="'+(.6+r()*1.6)+'" fill="#fff" opacity="'+(.3+r()*.7)+'"/>'; }
    for(i=0;i<5;i++){ s += '<circle cx="'+(r()*w)+'" cy="'+(r()*h)+'" r="'+(10+r()*22)+'" fill="hsl('+(hue+r()*30)+' 25% '+(20+r()*14)+'%)"/>'; }
    x=w*.5; y=h*.52; s += '<polygon points="'+(x-26)+','+y+' '+(x+16)+','+(y-12)+' '+(x+34)+','+y+' '+(x+16)+','+(y+12)+'" fill="hsl(40 95% 62%)"/>';
    for(i=0;i<4;i++){ s += '<rect x="'+(x-90-i*14)+'" y="'+(y-6+i*4)+'" width="'+(60+r()*30)+'" height="2" fill="hsl(40 95% 70%)" opacity="'+(.5-i*.1)+'"/>'; }
  } else {
    for(y=0;y<h;y+=5){ s += '<rect y="'+y+'" width="'+w+'" height="2" fill="#fff" opacity="'+(r()*.18)+'"/>'; }
    for(k=1;k<=4;k++){ s += '<circle cx="'+(w*.5)+'" cy="'+(h*.5)+'" r="'+(k*18)+'" fill="none" stroke="hsl('+(hue+10)+' 90% 70%)" stroke-width="1.5" opacity="'+(.8-k*.15)+'"/>'; }
    for(i=0;i<8;i++){ var a=i*Math.PI/4; s += '<ellipse cx="'+(w*.5+Math.cos(a)*34)+'" cy="'+(h*.5+Math.sin(a)*34)+'" rx="13" ry="6" transform="rotate('+(a*57.3)+' '+(w*.5+Math.cos(a)*34)+' '+(h*.5+Math.sin(a)*34)+')" fill="hsl('+(hue+10)+' 85% 62%)" opacity=".85"/>'; }
  }
  return s + '</svg>';
}

/* pixel avatar placeholder */
(function(){
  var r = rng(20260), s = '', hue = 22, x, y;
  for(y=0;y<8;y++){ for(x=0;x<4;x++){ if(r()>.5){ var c='hsl('+(hue+y*8)+' 85% '+(48+y*2)+'%)'; s+='<rect x="'+x+'" y="'+y+'" width="1" height="1" fill="'+c+'"/><rect x="'+(7-x)+'" y="'+y+'" width="1" height="1" fill="'+c+'"/>'; } } }
  $("#avatar").innerHTML = s;
})();

/* ============ routing ============ */
var VIEWS = ["about","games","3d","contact"];
var state = { view:"about", game:null, filter:"all", q:"" };

function fromHash(){
  var h = ""; try{ h = location.hash.slice(1); }catch(e){}
  if(!h){ state.view="about"; state.game=null; return; }
  if(VIEWS.indexOf(h)>-1){ state.view=h; if(h!=="games") state.game=null; return; }
  if(GAMES.some(function(g){ return g.id===h; })){ state.view="games"; state.game=h; return; }
}
function go(h){
  try{ if(location.hash.slice(1)!==h) location.hash = h; }catch(e){}
  if(VIEWS.indexOf(h)>-1){ state.view=h; state.game=null; }
  else { state.view="games"; state.game=h; }
  render(true);
}
window.addEventListener("hashchange", function(){ fromHash(); render(true); });
document.addEventListener("click", function(e){
  var a = e.target.closest("[data-go]"); if(a){ e.preventDefault(); go(a.getAttribute("data-go")); return; }
  var l = e.target.closest("[data-lang]"); if(l){ setLang(l.getAttribute("data-lang")); }
});
function setLang(l){
  lang = l; try{ localStorage.setItem("lang", l); }catch(e){}
  render(false);
}

/* ============ library ============ */
var FILTERS = ["all","released","dev","proto"];
function yearOf(g){ return lang==="th" && g.yearTh ? g.yearTh : g.year; }
function visibleGames(useFilter){
  var q = state.q.trim().toLowerCase();
  return GAMES.filter(function(g){
    var hit = !q || (g.title+" "+L(g).genre.join(" ")+" "+g.engine).toLowerCase().indexOf(q)>-1;
    var okf = !useFilter || state.filter==="all" || g.status===state.filter;
    return hit && okf;
  });
}
function renderSide(){
  $("#side-top").innerHTML = '<li><button data-go="games" aria-current="'+(state.game===null)+'"><span class="ico">ALL</span><span class="nm">'+esc(T("allGames"))+' ('+GAMES.length+')</span></button></li>';
  var list = visibleGames(false);
  $("#side-list").innerHTML = list.map(function(g){
    return '<li><button data-go="'+g.id+'" aria-current="'+(state.game===g.id)+'"><span class="ico">'+cover(g,60,60)+'</span><span class="nm">'+esc(g.title)+'</span><span class="dot '+g.status+'" title="'+esc(T("s_"+g.status))+'"></span></button></li>';
  }).join("") || '<li style="padding:8px 10px;color:var(--muted);font-size:13px">'+esc(T("noMatch"))+'</li>';
}
function renderPane(){
  var pane = $("#pane"), g, c, html;
  $(".lib").classList.toggle("in-game", !!state.game);
  function ul(arr, imgs){ return '<ul class="feat">'+arr.map(function(f,i){ var m = imgs && imgs[i]; return '<li>'+esc(f)+(m ? '<div class="did-shots">'+m.map(function(u){ return /\.mp4$/.test(u) ? '<video src="'+u+'" autoplay muted loop playsinline preload="metadata"></video>' : '<button type="button" data-view="'+u+'"><img src="'+u+'" alt="" loading="lazy"></button>'; }).join("")+'</div>' : '')+'</li>'; }).join("")+'</ul>'; }
  if(state.game){
    g = GAMES.filter(function(x){ return x.id===state.game; })[0]; c = L(g);
    html = '<div class="crumb"><button data-go="games">'+esc(T("allGames"))+'</button><span>/</span><span>'+esc(g.title)+'</span></div>'
      + '<div class="gamepage"><aside class="card info">'
      + ((g.link||g.video) ? '<div class="btns">'+(g.link?'<a class="btn primary" href="'+esc(g.link)+'" target="_blank" rel="noopener">'+esc(c.linkLabel)+'</a>':'')+(g.video?'<a class="btn" href="'+esc(g.video)+'" target="_blank" rel="noopener">'+esc(T("watchVideo"))+'</a>':'')+'</div>' : '')
      + '<dl class="facts"><dt>'+esc(T("dStatus"))+'</dt><dd><span class="status"><span class="dot '+g.status+'"></span>'+esc(T("s_"+g.status))+'</span></dd>'
      + '<dt>'+esc(T("dYear"))+'</dt><dd>'+esc(yearOf(g))+'</dd><dt>'+esc(T("dRole"))+'</dt><dd>'+esc(c.role)+'</dd>'
      + (g.engine?'<dt>'+esc(T("dEngine"))+'</dt><dd>'+esc(g.engine)+'</dd>':'')+(g.platform?'<dt>'+esc(T("dPlatform"))+'</dt><dd>'+esc(g.platform)+'</dd>':'')+'<dt>'+esc(T("dTeam"))+'</dt><dd>'+esc(T("people")(g.team))+'</dd></dl>'
      + '<div style="display:flex;flex-wrap:wrap;gap:6px">'+c.genre.map(function(t){ return '<span class="chip">'+esc(t)+'</span>'; }).join("")+'</div></aside>'
      + '<div>'
      + (g.cover ? '<div class="hero has-img"'+(g.coverRatio?' style="aspect-ratio:'+g.coverRatio+'"':'')+'>'+cover(g)+'</div><div class="titleblock"><h2>'+esc(g.title)+'</h2><p>'+esc(c.tagline)+'</p></div>'
        : '<div class="hero">'+cover(g)+'<div class="ov"><h2>'+esc(g.title)+'</h2><p>'+esc(c.tagline)+'</p></div></div>')
      + (g.shots && g.shots.length ? '<div class="shots-wrap"><h3>'+esc(T("shotsH"))+'</h3><div class="shots"'+(g.shots.length%2===0?' style="grid-template-columns:repeat(2,minmax(0,1fr))"':'')+'>'+g.shots.map(function(u,i){ return '<button type="button" data-view="'+u+'"><img src="'+u+'" alt="'+esc(g.title+" "+T("shotAlt")+" "+(i+1))+'" loading="lazy"></button>'; }).join("")+'</div></div>' : '')
      + '<div class="detail">'
      + '<h3>'+esc(T("aboutGame"))+'</h3><p class="desc" style="margin:0">'+esc(c.desc)+'</p>'
      + (c.did.length ? '<h3>'+esc(T("didH"))+'</h3>'+ul(c.did, g.didShots) : '')
      + (c.credits.length ? '<h3>'+esc(T("creditsH"))+'</h3>'+ul(c.credits) : '')
      + '</div></div></div>';
  } else {
    var list = visibleGames(true);
    html = '<div class="pane-head"><div><div class="eyebrow">'+esc(T("sideLibrary"))+'</div><h2>'+esc(T("allGames"))+'</h2></div><div class="filters" role="group">'
      + FILTERS.map(function(f){ return '<button data-filter="'+f+'" aria-pressed="'+(state.filter===f)+'">'+esc(T("f_"+f))+'</button>'; }).join("")+'</div></div>'
      + (list.length ? '<div class="grid">'+list.map(function(g){
          return '<button class="gcard" data-go="'+g.id+'"><span class="art">'+cover(g)+'</span><span class="meta"><h3>'+esc(g.title)+'</h3><p>'+esc(L(g).tagline)+'</p>'
            + '<span class="status"><span class="dot '+g.status+'"></span>'+esc(T("s_"+g.status))+' · '+esc(yearOf(g))+(g.engine?' · '+esc(g.engine):'')+'</span></span></button>'; }).join("")+'</div>'
        : '<div class="empty">'+esc(T("emptyGrid"))+'</div>');
  }
  pane.innerHTML = html;
  $$("[data-filter]", pane).forEach(function(b){ b.addEventListener("click", function(){ state.filter=b.getAttribute("data-filter"); renderPane(); }); });
}
$("#q").addEventListener("input", function(e){ state.q = e.target.value; renderSide(); if(!state.game) renderPane(); });

/* ============ image viewer ============ */
document.addEventListener("click", function(e){
  var b = e.target.closest("[data-view]"), v = $("#viewer");
  if(b){ $("img", v).src = b.getAttribute("data-view"); $("img", v).alt = $("img", b).alt; v.showModal(); }
  else if(e.target === v || e.target.closest("#viewer")) v.close();
});

/* ============ copy ============ */
document.addEventListener("click", function(e){
  var b = e.target.closest("[data-copy]"); if(!b) return;
  var el = document.getElementById(b.getAttribute("data-copy")), note = $("#copy-note");
  function sel(){ var r=document.createRange(); r.selectNodeContents(el); var x=getSelection(); x.removeAllRanges(); x.addRange(r); note.textContent=T("copyManual"); }
  try{ navigator.clipboard.writeText(el.textContent).then(function(){ note.textContent=T("copied"); }, sel); }catch(err){ sel(); }
});

/* ============ render ============ */
function render(scroll){
  document.documentElement.lang = lang;
  $$("[data-i]").forEach(function(el){ el.textContent = T(el.getAttribute("data-i")); });
  $$("[data-ih]").forEach(function(el){ el.innerHTML = T(el.getAttribute("data-ih")); });
  $$("[data-ph]").forEach(function(el){ el.placeholder = T(el.getAttribute("data-ph")); el.setAttribute("aria-label", T(el.getAttribute("data-ph"))); });
  $$("[data-lang]").forEach(function(b){ b.setAttribute("aria-pressed", String(b.getAttribute("data-lang")===lang)); });
  VIEWS.forEach(function(v){ $("#view-"+v).hidden = v!==state.view; });
  $$("nav a").forEach(function(a){ if(a.getAttribute("data-go")===state.view) a.setAttribute("aria-current","page"); else a.removeAttribute("aria-current"); });
  if(state.view==="games"){ renderSide(); renderPane(); }
  if(state.view==="3d") renderGallery();
  if(scroll){ try{ window.scrollTo(0,0); }catch(e){} }
}
fromHash(); render(false);
