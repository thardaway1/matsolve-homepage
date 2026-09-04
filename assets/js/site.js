(function(){
  /* ---------- images ---------- */
  var IMG = JSON.parse(document.getElementById('imgdata').textContent);
  Array.prototype.forEach.call(document.querySelectorAll('[data-img]'), function(el){
    var u = IMG[el.getAttribute('data-img')];
    if(u) el.src = u;
  });

  /* ---------- news: one stream, newest first ----------
     논문 게재는 기본적으로 news에 올리지 않는다 — 전체 목록은 publications 탭에 있다.
     예외는 표지(front cover) 선정처럼 그 자체로 뉴스가 되는 건뿐. (2026-09-01 결정) */
  var NEWS = [
    {d:'2026-09-30', u:'https://www.amds2026.org/', img:'n_amds', t:'Bringing Asia\'s materials-data community together — organising the <b>9th Asian Materials Data Symposium</b> (AMDS 2026)', s:'COEX, Seoul · 30 Sep – 2 Oct'},
    {d:'2026-07-01', label:'2026.07', ko:true, img:'n_grad',
     t:'졸업생 송혜정, 국비유학생으로 뽑혀 싱가포르국립대(NUS) 박사과정으로'},
    {d:'2026-06-16', u:'https://doi.org/10.1039/d5na00962f', img:'n_cover', t:'Cover story — MXene vacancy chemistry makes the front of <i>Nanoscale Advances</i>'},
    {d:'2026-03-30', u:'https://www.etnews.com/20260330000172', ko:true, img:'n_plat', t:'세라믹 소재 데이터 10만 건 + AI로, 시제품 개발기간 6개월 → 2개월 단축'},
    {d:'2026-02-09', u:'https://www.hankyung.com/article/202602093067h', img:'n_marine', ko:true, t:'바다가 남긴 부산물, 작가의 손끝에서 예술로 다시 태어나다', s:'한국세라믹기술원 보도자료'},
    {d:'2025-10-17', ko:true, img:'n_award', t:'서민택 박사과정, 한국세라믹학회 우수포스터상'},
    {d:'2025-03-26', u:'https://www.electimes.com/news/articleView.html?idxno=352452', ko:true, img:'n_geo', t:"'AI가 설계한 시멘트 대체재' — 친환경 지오폴리머 개발"},
    {d:'2025-02-27', u:'http://cerazine.net/m/view.php?idx=31579', ko:true, img:'n_qd', t:'어둠 속에서도 보인다 — 초고감도 양자점 적외선 센서 신기술 개발'},
    {d:'2024-04-29', u:'https://www.kharn.kr/news/article.html?no=24882', img:'n_mico', ko:true, t:'미코파워와 손잡고 AI 기반 SOFC 품질검수 기술을 개발하다', s:'산업 협력 성과'},
    {d:'2023-08-30', u:'https://www.hankyung.com/article/202308300783Y', img:'n_halide', ko:true, t:'양자역학 시뮬레이션과 AI로 새로운 신소재를 찾아내다', s:'아주대 공동 연구'},
    {d:'2023-01-30', u:'https://www.newsis.com/view/NISX20230130_0002173760', ko:true, img:'n_hydro', t:'폐의류 탄소섬유에 물 한 방울, 전기가 흐르는 원리를 규명하다', s:'아주대 공동 연구 · Journal of Materials Chemistry A 표지논문'},
    {d:'2021-08-31', u:'https://doi.org/10.1021/acsenergylett.1c01019', img:'n_tribo', ko:true, t:'수천 년 묵은 질문에 답하다 — 세라믹 마찰전기의 원리와 크기 결정 요소 규명', s:'ACS Energy Letters 게재'}
  ];
  NEWS.sort(function(a,b){ return a.d < b.d ? 1 : a.d > b.d ? -1 : 0; });

  document.getElementById('newsList').innerHTML = NEWS.map(function(item){
    var thumb = item.img && IMG[item.img]
      ? '<img class="nthumb" src="'+IMG[item.img]+'" alt="">' : '';
    var title = item.u
      ? '<a href="'+item.u+'" target="_blank" rel="noopener">'+item.t+'</a>' : item.t;
    return '<div class="row">'
      + '<div class="d">'+(item.label || item.d.replace(/-/g,'.'))+'</div>'
      + '<div class="t'+(item.ko ? ' ko' : '')+'"'+(item.ko ? ' lang="ko"' : '')+'>'
      +   '<div class="ntxt">'+title+(item.s ? '<small>'+item.s+'</small>' : '')+'</div>'
      +   thumb
      + '</div></div>';
  }).join('');

  /* ---------- publications ---------- */
  var PUBS = JSON.parse(document.getElementById('pubdata').textContent);
  PUBS.sort(function(a,b){ return a.date < b.date ? 1 : a.date > b.date ? -1 : 0; });

  var ROLE = {
    'first':'first author',
    'corresponding':'corresponding author',
    'co-corresponding':'co-corresponding author',
    'co-author':'co-author'
  };

  function thumb(id){
    var s = id * 2654435761 % 2147483647;
    function rnd(){ s = (s * 16807) % 2147483647; return s / 2147483647; }
    var cells = '';
    for(var r=0;r<4;r++){
      for(var c=0;c<5;c++){
        var v = rnd();
        cells += '<circle cx="'+(9+c*16.5)+'" cy="'+(9+r*16.5)+'" r="'+(1.6+v*5.2).toFixed(2)+'" '
              +  'fill="currentColor" opacity="'+(0.16+v*0.5).toFixed(2)+'"/>';
      }
    }
    var y1 = 10+rnd()*40, y2 = 10+rnd()*40;
    return '<svg viewBox="0 0 84 63" role="img" aria-hidden="true" style="color:var(--accent)">'
      + '<rect width="84" height="63" fill="var(--surface-2)"/>'
      + '<path d="M0 '+y1.toFixed(1)+' Q 21 '+(y1-14).toFixed(1)+' 42 '+((y1+y2)/2).toFixed(1)
      + ' T 84 '+y2.toFixed(1)+'" fill="none" stroke="currentColor" stroke-width="1.1" opacity=".3"/>'
      + cells + '</svg>';
  }

  var n = PUBS.length;
  var q1 = PUBS.filter(function(p){return p.q==='Q1';}).length;
  var lead = PUBS.filter(function(p){return p.role!=='co-author';}).length;
  var ifs = PUBS.map(function(p){return p.jif;}).filter(Boolean);
  var avgIF = (ifs.reduce(function(s,v){return s+v;},0)/ifs.length).toFixed(1);
  var maxIF = Math.max.apply(null, ifs);
  var years = PUBS.map(function(p){return p.year;});
  var span = Math.min.apply(null,years)+'–'+Math.max.apply(null,years);

  document.getElementById('pubSub').textContent =
    n+' peer-reviewed papers, '+span+'. '+lead+' with the PI as first or corresponding author · mean JIF '+avgIF+' · highest '+maxIF+'.';

  /* ---------- at a glance: recent 5 years only ---------- */
  var thisYear = new Date().getFullYear();
  var recentPubs = PUBS.filter(function(p){return p.year >= thisYear-4;});
  var rn = recentPubs.length;
  var rq1 = recentPubs.filter(function(p){return p.q==='Q1';}).length;
  var rlead = recentPubs.filter(function(p){return p.role!=='co-author';}).length;
  var rcites = recentPubs.reduce(function(s,p){return s+(p.cites||0);},0);
  var rifs = recentPubs.map(function(p){return p.jif;}).filter(Boolean);
  var ravgIF = (rifs.reduce(function(s,v){return s+v;},0)/rifs.length).toFixed(1);
  var ryears = recentPubs.map(function(p){return p.year;});
  var rspan = Math.min.apply(null,ryears)+'–'+Math.max.apply(null,ryears);

  document.getElementById('glance').innerHTML = [
    [rn,'journal papers, recent 5 years ('+rspan+')'],
    [rq1,'in Q1 journals, recent 5 years'],
    [rlead,'as first or corresponding author, recent 5 years'],
    [rcites,'citations, recent 5 years'],
    [ravgIF,'mean impact factor, recent 5 years'],
    ['13 · 10','collaborating institutions, domestic · international']
  ].map(function(c){
    return '<div class="card"><div class="v">'+c[0]+'</div><div class="l">'+c[1]+'</div></div>';
  }).join('');
  var MONTH = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  /* Full author line: lab members stand out, † co-first, * corresponding. */
  function authorLine(p){
    if(!p.authors) return '<span class="me">H. Ko</span> and co-authors';
    return p.authors.map(function(a){
      var marks = a.m ? '<sup>'+a.m+'</sup>' : '';
      return a.lab ? '<span class="me">'+a.n+marks+'</span>' : a.n+marks;
    }).join(', ');
  }

  function entryHTML(p){
    var authors = authorLine(p);
    var pills = '<button class="pill" type="button" data-toggle="d'+p.id+'">details</button>';
    if(p.doi) pills += '<a class="pill" href="'+p.doi+'" target="_blank" rel="noopener">DOI</a>';
    pills += '<span class="pill flat">'+ROLE[p.role]+'</span>';
    if(p.q) pills += '<span class="pill flat">'+p.q+'</span>';

    var det = '<b>Journal impact factor</b> ' + (p.jif ? p.jif : 'not recorded')
      + ' · <b>Quartile</b> ' + (p.q || 'not recorded')
      + ' · <b>Citations</b> ' + (p.cites == null ? 'not recorded' : p.cites)
      + ' · <b>Authorship</b> ' + (p.pos ? p.pos[0]+' of '+p.pos[1]+' authors, ' : '') + ROLE[p.role]
      + ' · <b>Published</b> ' + p.date;

    return '<div class="entry">'
      + '<div class="thumb">'+(p.fig ? '<img src="assets/img/pub/'+p.id+'.jpg" alt="" loading="lazy">' : thumb(p.id))+'</div>'
      + '<div>'
      +   '<div class="entry-title">'+p.title+'</div>'
      +   '<div class="entry-authors">'+authors+'</div>'
      +   '<div class="entry-venue"><em>'+p.venue+'</em>, '+MONTH[parseInt(p.date.slice(5,7),10)-1]+' '+p.year+'</div>'
      +   '<div class="pills">'+pills+'</div>'
      +   '<div class="details" id="d'+p.id+'">'+det+'</div>'
      + '</div></div>';
  }

  function render(filter){
    var list = PUBS.slice(), html = '';
    if(filter==='sel')  list = list.filter(function(p){return p.sel;});
    if(filter==='lead') list = list.filter(function(p){return p.role!=='co-author';});
    if(filter==='q1')   list = list.filter(function(p){return p.q==='Q1';});

    var lastYear = null;
    list.forEach(function(p){
      if(p.year !== lastYear){
        if(lastYear !== null) html += '</div></div>';
        html += '<div class="year-row"><div class="year-tag">'+p.year+'</div><div>';
        lastYear = p.year;
      }
      html += entryHTML(p);
    });
    if(lastYear !== null) html += '</div></div>';
    document.getElementById('pubList').innerHTML = html;
  }
  render('all');

  document.getElementById('filters').addEventListener('click', function(e){
    var b = e.target.closest('button[data-f]');
    if(!b) return;
    Array.prototype.forEach.call(this.querySelectorAll('button'), function(x){
      x.setAttribute('aria-pressed', String(x===b));
    });
    render(b.getAttribute('data-f'));
  });

  document.getElementById('pubList').addEventListener('click', function(e){
    var fig = e.target.closest('.thumb img');
    if(fig){
      var entry = fig.closest('.entry');
      openEv({ title: entry.querySelector('.entry-title').textContent,
               note: '', date: entry.querySelector('.entry-venue').textContent,
               shots: [fig.getAttribute('src')] });
      return;
    }
    var b = e.target.closest('[data-toggle]');
    if(!b) return;
    var box = document.getElementById(b.getAttribute('data-toggle'));
    box.classList.toggle('open');
    b.textContent = box.classList.contains('open') ? 'hide' : 'details';
  });

  /* ---------- nav ---------- */
  var pages = ['about','news','research','people','publications','facility','gallery'];
  function go(name){
    pages.forEach(function(p){ document.getElementById('page-'+p).hidden = (p !== name); });
    Array.prototype.forEach.call(document.querySelectorAll('.nav-links button[data-go]'), function(b){
      if(b.getAttribute('data-go') === name) b.setAttribute('aria-current','page');
      else b.removeAttribute('aria-current');
    });
    window.scrollTo({top:0,behavior:'instant'});
  }
  Array.prototype.forEach.call(document.querySelectorAll('[data-go]'), function(el){
    el.addEventListener('click', function(e){ e.preventDefault(); go(el.getAttribute('data-go')); });
  });
  Array.prototype.forEach.call(document.querySelectorAll('[data-ext]'), function(el){
    el.addEventListener('click', function(e){ e.preventDefault(); });
  });

  /* ---------- gallery: one card per outing, lightbox pages through its photos ---------- */
  var EV = JSON.parse(document.getElementById('galdata').textContent);
  var gal = document.getElementById('gal');
  gal.innerHTML = EV.map(function(e, i){
    var sub = e.note ? e.date + ' · ' + e.note : e.date;
    var n = e.shots.length > 1 ? '<span class="count">' + e.shots.length + '</span>' : '';
    return '<figure data-ev="' + i + '" tabindex="0" role="button" aria-label="' + e.title + '">'
      + '<img src="' + e.cover + '" alt="' + e.title + '" loading="lazy">' + n
      + '<figcaption><b>' + e.title + '</b>' + sub + '</figcaption></figure>';
  }).join('');

  var lb = document.getElementById('lb'), lbImg = document.getElementById('lbImg'),
      lbCap = document.getElementById('lbCap'), lbN = document.getElementById('lbN'),
      lbPrev = document.getElementById('lbPrev'), lbNext = document.getElementById('lbNext'),
      ev = null, at = 0, lastFocus = null;

  function draw(){
    lbImg.src = ev.shots[at];
    lbImg.alt = ev.title + ' — ' + (at + 1);
    lbCap.textContent = ev.title + (ev.note ? ' · ' + ev.note : '') + ' · ' + ev.date;
    lbN.textContent = ev.shots.length > 1 ? (at + 1) + ' / ' + ev.shots.length : '';
    var one = ev.shots.length < 2;
    lbPrev.hidden = one; lbNext.hidden = one;
  }
  function openEv(o){
    ev = o; at = 0; lastFocus = document.activeElement;
    draw(); lb.hidden = false; document.body.style.overflow = 'hidden';
    document.getElementById('lbClose').focus();
  }
  function close(){
    lb.hidden = true; lbImg.src = ''; document.body.style.overflow = '';
    if(lastFocus) lastFocus.focus();
  }
  function step(d){ at = (at + d + ev.shots.length) % ev.shots.length; draw(); }

  gal.addEventListener('click', function(e){
    var f = e.target.closest('figure[data-ev]'); if(f) openEv(EV[+f.getAttribute('data-ev')]);
  });
  gal.addEventListener('keydown', function(e){
    if(e.key !== 'Enter' && e.key !== ' ') return;
    var f = e.target.closest('figure[data-ev]'); if(f){ e.preventDefault(); openEv(EV[+f.getAttribute('data-ev')]); }
  });
  lbPrev.addEventListener('click', function(e){ e.stopPropagation(); step(-1); });
  lbNext.addEventListener('click', function(e){ e.stopPropagation(); step(1); });
  document.getElementById('lbClose').addEventListener('click', close);
  lb.addEventListener('click', function(e){ if(e.target === lb) close(); });
  document.addEventListener('keydown', function(e){
    if(lb.hidden) return;
    if(e.key === 'Escape') close();
    else if(e.key === 'ArrowLeft') step(-1);
    else if(e.key === 'ArrowRight') step(1);
  });

  /* ---------- theme ---------- */
  var mb = document.getElementById('modeBtn');
  function isDark(){
    var s = document.documentElement.getAttribute('data-theme');
    if(s) return s==='dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  function sync(){ mb.textContent = isDark() ? '☀' : '☾'; }
  mb.addEventListener('click', function(){
    document.documentElement.setAttribute('data-theme', isDark() ? 'light' : 'dark');
    sync();
  });
  sync();
})();
