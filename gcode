<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}

  if(localStorage.getItem('consentMode') === null){
    gtag('consent', 'default', {
      'ad_storage': 'denied',
      'analytics_storage': 'denied',
      'personalization_storage': 'denied',
      'functionality_storage': 'denied', 
      'security_storage': 'denied',
    });
  } else {
    gtag('consent', 'default', JSON.parse(localStorage.getItem('consentMode')));
  }
</script>

<script async src="https://www.googletagmanager.com/gtag/js?id=G-PXXYS35B6M"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('set', 'linker', {
  'domains': ['meer.cz', 'meer.care', 'meer.sk', 'meercare.pl', 'meercarede.cz', 'meercarefr.cz']
});
  gtag('js', new Date());

  gtag('config', 'G-PXXYS35B6M');
  gtag('config', 'AW-10931829930');
</script>
