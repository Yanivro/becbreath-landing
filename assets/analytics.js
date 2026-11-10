/* Becoming Breath — analytics with cookie consent: Google Analytics 4 + Microsoft Clarity
   ----------------------------------------------------------------------------------------
   Nothing loads until the visitor accepts. The choice is remembered in localStorage.
   Both IDs are public (they ship in page source), not secrets.
   - GA4:     property 563500719 "Becoming Breath (becbreath.com)", under GA account 275879481
   - Clarity: project zbabyqiok7

   Events sent (to GA4 as events, to Clarity as custom events/tags):
     cta_click        any button or CTA link       cta_text, cta_href
     booking_open     a Cal.com booking button     session_type
     booking_completed  Cal.com popup confirmed    session_type   (GA4 key event)
     whatsapp_click   any WhatsApp link            cta_text       (GA4 key event)
     outbound_click   links to other sites         link_url
     scroll_depth     25 / 50 / 75 / 100 %         percent                                  */
(function () {
  var GA4_ID     = 'G-NG10J2F31E';
  var CLARITY_ID = 'zbabyqiok7';
  var STORE_KEY  = 'bb_consent_v1';

  /* Cal.com event type id -> readable session name */
  var SESSION_BY_ID = { 7829731: 'discovery-call', 7829729: 'rebirthing', 7829730: 'resourcing-session' };

  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }

  function track(name, params){
    if (!window.__bbAnalytics) return;
    params = params || {};
    gtag('event', name, params);
    try {
      if (window.clarity) {
        window.clarity('event', name);
        Object.keys(params).forEach(function(k){ window.clarity('set', k, String(params[k])); });
      }
    } catch(e){}
  }
  function label(el){ return (el.getAttribute('data-cta') || el.getAttribute('aria-label') || el.textContent || '').trim().replace(/\s+/g,' ').slice(0,80); }

  /* ---------- load providers + wire events (only after consent) ---------- */
  function initAnalytics(){
    if (window.__bbAnalytics) return; window.__bbAnalytics = true;

    var g = document.createElement('script');
    g.async = true;
    g.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA4_ID;
    document.head.appendChild(g);
    gtag('js', new Date());
    gtag('config', GA4_ID);

    (function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", CLARITY_ID);
    try { window.clarity('consentv2', { ad_Storage: 'denied', analytics_Storage: 'granted' }); } catch(e){}

    document.addEventListener('click', function(ev){
      var cal = ev.target.closest('[data-cal]');
      if (cal) track('booking_open', { session_type: cal.getAttribute('data-cal'), cta_text: label(cal) });

      var wa = ev.target.closest('[data-wa]');
      if (wa) track('whatsapp_click', { cta_text: label(wa) });

      var cta = ev.target.closest('a.btn, button.btn, .cta-alt, .float-cta, [data-cta]');
      if (cta) track('cta_click', { cta_text: label(cta), cta_href: cta.getAttribute('href') || '' });

      var a = ev.target.closest('a[href]');
      if (a && /^https?:\/\//i.test(a.href) && a.host !== location.host) track('outbound_click', { link_url: a.href });
    }, true);

    /* completed bookings, reported by the Cal.com popup */
    if (window.Cal) {
      var done = {};
      var onBooked = function(e){
        var d = (e && e.detail && e.detail.data) || {};
        var key = d.uid || d.bookingId || (d.eventTypeId + '|' + d.startTime);
        if (done[key]) return; done[key] = 1;     /* V1 and V2 can both fire */
        track('booking_completed', { session_type: SESSION_BY_ID[d.eventTypeId] || d.eventSlug || 'unknown' });
      };
      try {
        window.Cal('on', { action: 'bookingSuccessfulV2', callback: onBooked });
        window.Cal('on', { action: 'bookingSuccessful',   callback: onBooked });
      } catch(e){}
    }

    var marks = [25,50,75,100], hit = {};
    window.addEventListener('scroll', function(){
      var d = document.documentElement, max = d.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      var pct = (window.scrollY / max) * 100;
      for (var i=0;i<marks.length;i++){ var m = marks[i]; if (pct >= m && !hit[m]){ hit[m]=1; track('scroll_depth', { percent: m }); } }
    }, { passive: true });
  }

  /* ---------- consent gate ---------- */
  var choice = null;
  try { choice = localStorage.getItem(STORE_KEY); } catch(e){}
  if (choice === 'granted') initAnalytics();
  else if (choice !== 'denied') showBanner();

  function decide(v){
    try { localStorage.setItem(STORE_KEY, v); } catch(e){}
    var el = document.getElementById('bb-consent');
    if (el && el.parentNode) el.parentNode.removeChild(el);
    if (v === 'granted') initAnalytics();
    else if (window.__bbAnalytics) location.reload();   /* withdrawing consent: reload without trackers */
  }

  /* footer "Cookie settings" link reopens the banner */
  document.addEventListener('click', function(ev){
    if (ev.target.closest('[data-cookie-settings]')) { ev.preventDefault(); showBanner(); }
  });

  function showBanner(){
    function build(){
      if (document.getElementById('bb-consent')) return;
      if (!document.getElementById('bb-consent-css')) {
        var style = document.createElement('style'); style.id = 'bb-consent-css';
        style.textContent =
          '#bb-consent{position:fixed;left:0;right:0;bottom:0;z-index:9999;display:flex;justify-content:center;padding:16px;pointer-events:none;font-family:"Jost",system-ui,sans-serif}'+
          '#bb-consent .bb-in{pointer-events:auto;max-width:760px;width:100%;background:#473A2A;color:#F1E6CB;border-radius:3px;box-shadow:0 12px 40px rgba(38,27,16,.35);padding:18px 20px;display:flex;gap:18px;align-items:center;flex-wrap:wrap;justify-content:space-between}'+
          '#bb-consent p{margin:0;font-size:14px;line-height:1.55;color:#EDE3CF;font-weight:300;flex:1 1 320px}'+
          '#bb-consent .bb-btns{display:flex;gap:10px;flex:0 0 auto}'+
          '#bb-consent button{font-family:inherit;font-size:12px;letter-spacing:.14em;text-transform:uppercase;font-weight:500;cursor:pointer;padding:12px 20px;border-radius:2px;border:1px solid;transition:background .25s,border-color .25s,color .25s}'+
          '#bb-consent .bb-no{background:transparent;color:#EDE3CF;border-color:rgba(241,230,203,.4)}'+
          '#bb-consent .bb-no:hover{border-color:#F1E6CB;color:#fff}'+
          '#bb-consent .bb-yes{background:#A24A3B;color:#F1E6CB;border-color:#A24A3B}'+
          '#bb-consent .bb-yes:hover{background:#883C2F;border-color:#883C2F}'+
          '#bb-consent button:focus-visible{outline:2px solid #F1E6CB;outline-offset:2px}'+
          '@media(max-width:560px){#bb-consent{padding:12px}#bb-consent .bb-in{flex-direction:column;align-items:stretch;gap:14px;padding:16px}#bb-consent p{flex:none;font-size:13.5px}#bb-consent .bb-btns{justify-content:stretch}#bb-consent .bb-btns button{flex:1}}';
        document.head.appendChild(style);
      }
      var wrap = document.createElement('div');
      wrap.id = 'bb-consent';
      wrap.setAttribute('role','dialog');
      wrap.setAttribute('aria-label','Cookie consent');
      wrap.innerHTML =
        '<div class="bb-in">'+
          '<p>I use cookies for analytics (Google Analytics and Microsoft Clarity) to understand how people use this page, so I can make it better. Nothing is loaded unless you accept.</p>'+
          '<div class="bb-btns"><button type="button" class="bb-no">Decline</button><button type="button" class="bb-yes">Accept</button></div>'+
        '</div>';
      document.body.appendChild(wrap);
      wrap.querySelector('.bb-yes').addEventListener('click', function(){ decide('granted'); });
      wrap.querySelector('.bb-no').addEventListener('click', function(){ decide('denied'); });
    }
    if (document.body) build(); else document.addEventListener('DOMContentLoaded', build);
  }
})();
