(function () {
  var webStoreUrl = 'https://apps.apple.com/app/id6759484614';
  var nativeStoreUrl = 'itms-apps://itunes.apple.com/app/id6759484614';
  var navigator = window.navigator;
  var isIOS = /iPad|iPhone|iPod/i.test(navigator.userAgent || '') ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  var isInstagramIOS = isIOS && /Instagram/i.test(navigator.userAgent || '');
  var instagramStoreUrl = 'instagram://extbrowser/?url=' + encodeURIComponent(webStoreUrl);

  window.prepareAppStoreLink = function (link) {
    link.setAttribute('href', isInstagramIOS ? instagramStoreUrl : isIOS ? nativeStoreUrl : webStoreUrl);
    if (!isIOS) return;

    link.addEventListener('click', function () {
      var fallbackTimer = window.setTimeout(function () {
        if (document.hidden) return;
        if (isInstagramIOS) {
          window.alert('Instagram blocked the Safari handoff. Tap the three dots above, then “Open in external browser”.');
          return;
        }
        window.location.assign(webStoreUrl);
      }, 1400);

      function cancelFallback() {
        window.clearTimeout(fallbackTimer);
      }

      document.addEventListener('visibilitychange', function () {
        if (document.hidden) cancelFallback();
      }, { once: true });
      window.addEventListener('pagehide', cancelFallback, { once: true });
    });
  };
})();
