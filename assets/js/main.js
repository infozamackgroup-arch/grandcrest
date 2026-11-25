(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); }, $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };

  /* mobile menu */
  var btn = $('.menu'), nav = $('#nav');
  btn.addEventListener('click', function () { var o = nav.classList.toggle('open'); btn.setAttribute('aria-expanded', o); });
  nav.addEventListener('click', function (e) { if (e.target.tagName === 'A') { nav.classList.remove('open'); btn.setAttribute('aria-expanded', false); } });
  $('#yr').textContent = new Date().getFullYear();

  /* split text into words */
  function words(el, cls, inner) {
    var t = el.textContent.trim().split(/\s+/); el.textContent = '';
    t.forEach(function (w, i) {
      var o = document.createElement('span'); o.className = cls; o.style.setProperty('--i', i);
      if (inner) { var s = document.createElement('span'); s.textContent = w; o.appendChild(s); } else o.textContent = w;
      el.appendChild(o); el.appendChild(document.createTextNode(' '));
    });
  }
  $$('.split').forEach(function (el) { words(el, 'w', true); });
  var fills = $$('.fill').map(function (el) { words(el, 'fw', false); return { el: el, w: $$('.fw', el) }; });

  /* marquee: duplicate the track so the loop is seamless */
  var tr = $('.track'); if (tr) tr.innerHTML += tr.innerHTML;

  /* reveal on scroll */
  $$('.lead,.actions,.route,.chips li,.services>div,.facts,address,.contact>div>p,form').forEach(function (el, i) {
    el.classList.add('rv'); el.style.setProperty('--d', (i % 4));
  });
  var io = 'IntersectionObserver' in window && new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: .15, rootMargin: '0px 0px -6% 0px' });
  $$('.rv,.split').forEach(function (el) { io ? io.observe(el) : el.classList.add('in'); });

  /* header shadow, hero parallax, fill-as-you-read */
  var top = $('.top'), svg = $('.route svg'), ticking = false;
  function frame() {
    ticking = false;
    var y = window.scrollY, vh = window.innerHeight;
    top.classList.toggle('stuck', y > 20);
    if (svg && !reduce && y < vh * 1.2) svg.style.transform = 'translateY(' + (y * -0.07) + 'px)';
    fills.forEach(function (f) {
      var r = f.el.getBoundingClientRect(), p = Math.min(1, Math.max(0, (vh * .85 - r.top) / (r.height + vh * .3)));
      var n = Math.round(p * f.w.length);
      f.w.forEach(function (w, i) { w.classList.toggle('lit', reduce || i < n); });
    });
  }
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }, { passive: true });
  window.addEventListener('resize', frame);
  frame();

  /* enquiry form: opens the visitor's email app (see README for Formspree) */
  var form = $('#quote'), note = $('#fm');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var d = new FormData(form), name = (d.get('name') || '').trim(), email = (d.get('email') || '').trim(), msg = (d.get('message') || '').trim();
    if (!name || !email || !msg) { note.textContent = 'Enter your name, email and what you need, then send again.'; return; }
    var body = 'Name: ' + name + '\nEmail: ' + email + '\nCompany: ' + (d.get('company') || '-') + '\n\n' + msg;
    window.location.href = 'mailto:info@grandcrestintegrated.com.ng?subject=' + encodeURIComponent('Website enquiry from ' + name) + '&body=' + encodeURIComponent(body);
    note.textContent = 'Your email app should open with the enquiry ready to send.';
  });
})();
