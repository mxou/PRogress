function checkMobile() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  const isMobileUA = /android|iphone|ipad|ipod/i.test(userAgent);
  const isSmallScreen = window.innerWidth <= 768; // largeur max qu’on tolère

  if (!(isMobileUA && isSmallScreen)) {
    document.body.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:center;
                  height:100vh;text-align:center;font-family:sans-serif;">
        <h1>⚠️ Cette application est conçue uniquement pour mobile.<br/>
        Merci d’utiliser un smartphone 📱</h1>
      </div>
    `;
  }
}

// Vérification au chargement
window.addEventListener("load", checkMobile);
// Vérification si on redimensionne
window.addEventListener("resize", checkMobile);
