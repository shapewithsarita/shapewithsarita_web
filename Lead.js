/* ShapeWithSarita lead system. Upload to the SITE ROOT so it loads at /lead.js
   1) Paste your Google Apps Script URL in endpoint (see SETUP.md)
   2) Optional: paste a Razorpay/UPI payment link in payLink for the Rs 499 book */
(function(){
var CFG={endpoint:'',whatsapp:'917903805368',payLink:''};
var GOALS=['Lose weight','Get stronger and toned','Recover after baby','Plan for my parent (60+)','Something else'];
var K={
plan:{t:'Get your free 7-day Indian meal and workout plan',s:'Tell me where to send it. Sarita replies personally on WhatsApp.',b:'Send me the free plan',g:GOALS,
 m:function(d){return 'Hi Sarita, please send my free 7-day plan.\nName: '+d.name+'\nGoal: '+d.goal}},
parent:{t:"Free checklist: fall-proof your parent's home",s:'Get the printable room-by-room checklist on WhatsApp.',b:'Send me the free checklist',who:1,
 m:function(d){return 'Hi Sarita, please send the free fall-proofing checklist.\nName: '+d.name+'\nFor: '+d.who}},
book:{t:'Get Stronger After 60',s:'Rs 499 · Book + free 14-day nutrition plan',b:'Continue on WhatsApp',who:1,email:1,
 m:function(d){return 'Hi Sarita, I want the Stronger After 60 book (Rs 499) with the free 14-day nutrition plan.\nName: '+d.name+'\nWhatsApp: '+d.phone+'\nEmail: '+d.email+'\nFor: '+d.who+'\nPlease send the payment link.'}},
founding:{t:'Apply for a Founding Client spot',s:'Only 5 spots. Sarita will message you to check it is a good fit.',b:'Apply on WhatsApp',g:GOALS,
 m:function(d){return 'Hi Sarita, I would like to apply for a Founding Client spot.\nName: '+d.name+'\nGoal: '+d.goal}}
};
var LAND='/free-7-day-weight-loss-plan-for-indian-women/';
var css='.swbar{display:none}@media(max-width:820px){.swbar{display:flex;position:fixed;left:0;right:0;bottom:0;gap:10px;padding:10px 14px calc(10px + env(safe-area-inset-bottom,0px));background:rgba(253,246,238,.97);border-top:1px solid #EEE1D0;z-index:70}.swbar a{flex:1;text-align:center;padding:14px 8px;border-radius:999px;font:700 16px Inter,sans-serif;color:#fff;text-decoration:none;min-height:44px;box-sizing:border-box}.swbar .p{background:#DD5B3E}.swbar .w{background:#25D366}body.hasbar{padding-bottom:76px}.float-wa{display:none!important}}'+
'.swsl{max-width:640px;margin:0 auto;background:#fff;border:1px solid #EEE1D0;border-radius:20px;padding:28px;box-shadow:0 14px 36px rgba(36,28,21,.08);color:#241C15;text-align:left;position:relative}'+
'.swsl .swt{font:700 24px/1.2 Poppins,Inter,sans-serif;margin:0 0 6px;color:#241C15}.swsl .sws{color:#6B5D4E;font-size:16px;margin:0 0 14px}'+
'.swsl label{display:block;font-weight:600;font-size:15px;margin:14px 0 6px;color:#241C15}'+
'.swsl input[type=text],.swsl input[type=tel],.swsl input[type=email],.swsl select{width:100%;font:inherit;font-size:17px;padding:13px 14px;border:2px solid #EEE1D0;border-radius:12px;background:#FDF6EE;color:#241C15;box-sizing:border-box}'+
'.swsl input:focus,.swsl select:focus{border-color:#1E7A6C;outline:none}'+
'.swsl .swr{display:flex;gap:10px;flex-wrap:wrap}.swsl .swr label{display:flex;gap:8px;align-items:center;font-weight:500;margin:0;background:#FDF6EE;border:2px solid #EEE1D0;border-radius:12px;padding:11px 14px;cursor:pointer}'+
'.swsl .swc{display:flex;gap:10px;align-items:flex-start;font-weight:400;font-size:14px;color:#6B5D4E;margin:16px 0}.swsl .swc input{width:20px;height:20px;margin-top:3px;flex-shrink:0}'+
'.swsl .swb{display:block;width:100%;text-align:center;font:700 17px Inter,sans-serif;padding:16px;border-radius:999px;border:0;background:#DD5B3E;color:#fff;cursor:pointer;text-decoration:none;box-sizing:border-box}'+
'.swsl .swb:hover{background:#B84226}.swsl .swb.wa{background:#25D366}.swsl .swb.pay{background:#1E7A6C;margin-top:10px}'+
'.swsl .swe{color:#B83A2E;font-size:15px;min-height:18px;margin-top:8px}.swsl .swf{font-size:13px;color:#6B5D4E;text-align:center;margin-top:10px}.swsl .swh{position:absolute;left:-9999px}';
function q(k){return new URLSearchParams(location.search).get(k)||''}
function el(h){var d=document.createElement('div');d.innerHTML=h;return d.firstChild}
function opt(a){return a.map(function(x){return '<option>'+x+'</option>'}).join('')}
function build(box){
 var kind=box.getAttribute('data-kind')||'plan',c=K[kind]||K.plan,src=box.getAttribute('data-source')||location.pathname;
 var h='<form class="swsl" novalidate><h3 class="swt">'+c.t+'</h3><p class="sws">'+c.s+'</p>'+
 '<label>Your name</label><input type="text" name="name" autocomplete="name">'+
 '<label>WhatsApp number</label><input type="tel" name="phone" autocomplete="tel" placeholder="e.g. 98765 43210">'+
 (c.email?'<label>Email (optional)</label><input type="email" name="email" autocomplete="email">':'')+
 (c.g?'<label>Your main goal</label><select name="goal">'+opt(c.g)+'</select>':'')+
 (c.loc?'<label>I live in</label><select name="loc">'+opt(['India','Outside India'])+'</select>':'')+
 (c.who?'<label>This is</label><div class="swr"><label><input type="radio" name="who" value="For myself" checked> For myself</label><label><input type="radio" name="who" value="For my parent"> For my parent</label></div>':'')+
 '<input class="swh" type="text" name="website" tabindex="-1" autocomplete="off">'+
 '<label class="swc"><input type="checkbox" name="consent"> I agree to be contacted on WhatsApp about my request. My details are used only to reply to me.</label>'+
 '<button class="swb" type="submit">'+c.b+'</button><p class="swe" role="alert"></p><p class="swf">Free. No spam. Not charged on this page.</p></form>';
 box.innerHTML=h;var f=box.firstChild,err=f.querySelector('.swe');
 f.addEventListener('submit',function(e){
  e.preventDefault();var g=function(n){return f.elements[n]?f.elements[n].value.trim():''};
  var num=g('phone').replace(/\D/g,'');
  if(g('name').length<2)return err.textContent='Please enter your name.';
  if(num.length<10)return err.textContent='Please enter a valid WhatsApp number.';
  if(g('email')&&!/^\S+@\S+\.\S+$/.test(g('email')))return err.textContent='Please check your email.';
  if(!f.elements.consent.checked)return err.textContent='Please tick the consent box.';
  var who=f.elements.who?f.elements.who.value:'';
  var d={kind:kind,name:g('name'),phone:g('phone'),email:g('email'),goal:g('goal'),loc:g('loc'),who:who,source:src,page:location.pathname,
   utm_source:q('utm_source'),utm_medium:q('utm_medium'),utm_campaign:q('utm_campaign'),ref:document.referrer,time:new Date().toISOString(),website:g('website')};
  if(!d.website&&CFG.endpoint){try{fetch(CFG.endpoint,{method:'POST',mode:'no-cors',keepalive:true,headers:{'Content-Type':'text/plain'},body:JSON.stringify(d)})}catch(x){}}
  if(window.gtag)try{gtag('event','generate_lead',{lead_kind:kind,lead_source:src})}catch(x){}
  var link='https://wa.me/'+CFG.whatsapp+'?text='+encodeURIComponent(c.m(d)+'\n(From shapewithsarita.in)');
  f.innerHTML='<h3 class="swt">Thank you, '+d.name.split(' ')[0]+'! One last step</h3><p class="sws">Tap the button and send the pre-filled WhatsApp message so Sarita can reply to you personally.</p>'+
   '<a class="swb wa" href="'+link+'" target="_blank" rel="noopener">💬 Open WhatsApp</a>'+
   (kind==='book'&&CFG.payLink?'<a class="swb pay" href="'+CFG.payLink+'" target="_blank" rel="noopener">Pay Rs 499 securely now</a>':'');
  window.open(link,'_blank');
 });
}
function init(){
 var s=document.createElement('style');s.textContent=css;document.head.appendChild(s);
 var p=location.pathname;
 if(p.indexOf('/blog/')===0&&p.length>6&&!/index\.html$/.test(p)&&!document.querySelector('[data-lead-form]')){
  var senior=/senior|elderly|parent|fall|after-60|chair|balance|bone/.test(p),w=el('<div style="max-width:700px;margin:40px auto;padding:0 20px"><div data-lead-form data-kind="'+(senior?'parent':'plan')+'" data-source="blog:'+p.replace(/^\/blog\/|\.html$/g,'')+'"></div></div>');
  var au=el('<div style="max-width:700px;margin:32px auto 0;padding:0 20px"><div style="display:flex;gap:14px;align-items:center;background:#fff;border:1px solid #EEE1D0;border-radius:16px;padding:16px"><img src="/cochsarita.jpeg" alt="Sarita Nawar" width="64" height="64" loading="lazy" style="border-radius:50%;object-fit:cover;flex-shrink:0"><p style="margin:0;font-size:14px;color:#6B5D4E;line-height:1.5"><b style="color:#241C15">Written by Sarita Nawar</b>, certified nutrition coach and strength and conditioning coach. This article is general education, not medical advice. Please speak to your doctor before changing your diet or exercise routine, especially with a medical condition.</p></div></div>');
  var ft=document.querySelector('footer');if(ft){ft.parentNode.insertBefore(au,ft);ft.parentNode.insertBefore(w,ft)}else{document.body.appendChild(au);document.body.appendChild(w)}
 }
 [].forEach.call(document.querySelectorAll('[data-lead-form]'),build);
 if(!window.SWS_NOBAR&&!document.querySelector('.sticky')){document.body.appendChild(el('<div class="swbar"><a class="p" href="'+LAND+'">Free 7-Day Plan</a><a class="w" href="https://wa.me/'+CFG.whatsapp+'?text=Hi%20Sarita" target="_blank" rel="noopener">💬 WhatsApp</a></div>'));document.body.classList.add('hasbar')}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
window.SWS={config:CFG};
})();