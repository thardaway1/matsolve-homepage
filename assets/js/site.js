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
    {d:'2026-09-30', t:'Organising the <b>9th Asian Materials Data Symposium</b> (AMDS 2026)', s:'COEX, Seoul · 30 Sep – 2 Oct'},
    {d:'2026-07-01', label:'2026.07', ko:true, img:'n_grad',
     t:'졸업생 송혜정, NUS MSE 박사과정 진학 및 대한민국 정부 국비유학생 선정'},
    {d:'2026-06-16', img:'n_cover', t:'<i>Nanoscale Advances</i> front-cover selection — MXene vacancy chemistry'},
    {d:'2026-03-30', ko:true, img:'n_plat', t:'가상공학 플랫폼 구축 사업 성과 보도'},
    {d:'2026-02-09', ko:true, t:'작가와 협업, 해양부산물이 예술로 재탄생', s:'한국세라믹기술원 보도자료'},
    {d:'2025-10-17', ko:true, img:'n_award', t:'한국세라믹학회 추계학술대회 우수포스터상 수상'},
    {d:'2025-03-26', ko:true, img:'n_geo', t:"'AI가 설계한 시멘트 대체재' 친환경 지오폴리머 개발"},
    {d:'2025-02-27', ko:true, img:'n_qd', t:'초고감도 양자점 적외선 센서 신기술 개발'},
    {d:'2024-04-29', ko:true, t:'미코파워와 AI 기반 SOFC 품질검수 기술 개발', s:'산업 협력 성과'},
    {d:'2023-08-30', ko:true, t:'양자역학 시뮬레이션·AI를 활용한 신소재 탐색·설계 기술 개발', s:'아주대 공동 연구'},
    {d:'2021-08-31', ko:true, t:'세라믹 마찰전기의 원리와 크기 결정 요소 규명', s:'Physical Review Letters 후속 보도'}
  ];
  NEWS.sort(function(a,b){ return a.d < b.d ? 1 : a.d > b.d ? -1 : 0; });

  document.getElementById('newsList').innerHTML = NEWS.map(function(item){
    var thumb = item.img && IMG[item.img]
      ? '<img class="nthumb" src="'+IMG[item.img]+'" alt="">' : '';
    return '<div class="row">'
      + '<div class="d">'+(item.label || item.d.replace(/-/g,'.'))+'</div>'
      + '<div class="t'+(item.ko ? ' ko' : '')+'"'+(item.ko ? ' lang="ko"' : '')+'>'
      +   '<div class="ntxt">'+item.t+(item.s ? '<small>'+item.s+'</small>' : '')+'</div>'
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
  var cites = PUBS.reduce(function(s,p){return s+p.cites;},0);
  var ifs = PUBS.map(function(p){return p.jif;}).filter(Boolean);
  var avgIF = (ifs.reduce(function(s,v){return s+v;},0)/ifs.length).toFixed(1);
  var maxIF = Math.max.apply(null, ifs);
  var years = PUBS.map(function(p){return p.year;});
  var span = Math.min.apply(null,years)+'–'+Math.max.apply(null,years);

  document.getElementById('glance').innerHTML = [
    [n,'journal papers, '+span],
    [q1,'in Q1 journals'],
    [lead,'as first or corresponding author'],
    [cites,'citations'],
    [avgIF,'mean impact factor'],
    ['4','simulation scales, atomistic to continuum']
  ].map(function(c){
    return '<div class="card"><div class="v">'+c[0]+'</div><div class="l">'+c[1]+'</div></div>';
  }).join('');

  document.getElementById('pubSub').textContent =
    n+' peer-reviewed papers, '+span+'. '+lead+' with the PI as first or corresponding author · mean JIF '+avgIF+' · highest '+maxIF+'.';
  var MONTH = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  function entryHTML(p){
    var authors;
    if(p.pos){
      var before = p.pos[0]-1, after = p.pos[1]-p.pos[0];
      authors = (before ? before+' author'+(before>1?'s':'')+', ' : '')
        + '<span class="me">H. Ko</span>'
        + (after ? ', '+after+' more' : '');
    } else {
      authors = '<span class="me">H. Ko</span> and co-authors';
    }
    var pills = '<button class="pill" type="button" data-toggle="d'+p.id+'">details</button>';
    if(p.doi) pills += '<a class="pill" href="'+p.doi+'" target="_blank" rel="noopener">DOI</a>';
    pills += '<span class="pill flat">'+ROLE[p.role]+'</span>';
    if(p.q) pills += '<span class="pill flat">'+p.q+'</span>';

    var det = '<b>Journal impact factor</b> ' + (p.jif ? p.jif : 'not yet indexed')
      + ' · <b>Quartile</b> ' + (p.q || 'n/a')
      + ' · <b>Citations</b> ' + p.cites
      + ' · <b>Authorship</b> ' + (p.pos ? p.pos[0]+' of '+p.pos[1]+' authors, ' : '') + ROLE[p.role]
      + ' · <b>Published</b> ' + p.date;

    return '<div class="entry">'
      + '<div class="thumb">'+thumb(p.id)+'</div>'
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
    if(filter==='lead') list = list.filter(function(p){return p.role!=='co-author';});
    if(filter==='q1')   list = list.filter(function(p){return p.q==='Q1';});

    if(filter==='cited'){
      list.sort(function(a,b){return b.cites-a.cites;});
      html = '<div class="year-row"><div class="year-tag">top</div><div>'
           + list.slice(0,12).map(entryHTML).join('') + '</div></div>';
    } else {
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
    }
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
    var b = e.target.closest('[data-toggle]');
    if(!b) return;
    var box = document.getElementById(b.getAttribute('data-toggle'));
    box.classList.toggle('open');
    b.textContent = box.classList.contains('open') ? 'hide' : 'details';
  });

  /* ---------- nav ---------- */
  var pages = ['about','research','people','publications','facility','gallery'];
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
