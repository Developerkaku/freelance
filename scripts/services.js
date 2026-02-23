(function(){
  // Services interactions: filtering and CTA analytics
  const grid = document.getElementById('serviceGrid');
  const filters = document.querySelectorAll('.filter-btn');

  function setFilter(cat){
    const cards = grid.querySelectorAll('.service-card');
    cards.forEach(c => {
      const matches = (cat === 'all') || (c.dataset.category === cat);
      c.style.display = matches ? 'flex' : 'none';
    });
  }

  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(b => b.setAttribute('aria-pressed','false'));
      btn.setAttribute('aria-pressed','true');
      setFilter(btn.dataset.filter);
      try{ window.dataLayer && dataLayer.push({event:'services_filter',filter:btn.dataset.filter}); }catch(e){}
    });
  });

  // CTA analytics & WhatsApp deep-link helper (reuse pattern)
  function isMobile(){ return /Mobi|Android/i.test(navigator.userAgent); }
  function openWhatsApp(phone, msg){
    if(!phone || phone.indexOf('REPLACE_WITH_PHONE')===0){ alert('WhatsApp number not configured.'); return; }
    const encoded = msg || '';
    if(isMobile()) window.location.href = `https://wa.me/${phone}?text=${encoded}`;
    else window.open(`https://web.whatsapp.com/send?phone=${phone}&text=${encoded}`,'_blank');
  }

  document.querySelectorAll('.service-card .btn--primary').forEach(btn => {
    btn.addEventListener('click', function(){
      const phone = this.dataset.phone && this.dataset.phone.replace(/[^+0-9]/g,'');
      const msg = this.dataset.msg || '';
      try{ window.dataLayer && dataLayer.push({event:'service_whatsapp_click',service:this.closest('.service-card').querySelector('.service-card__title').textContent.trim()}); }catch(e){}
      openWhatsApp(phone,msg);
    });
  });

})();