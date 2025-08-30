// Locale Module for Nail Cabin Website
class LocaleManager {
  constructor() {
    this.currentLang = 'zh';
    this.translations = {
      en: {
        // Navigation
        localeBtn: '中文',
        bookNow: 'Book Now',
        
        // Hero Section
        heroTitle: 'Professional Nail Care Services',
        heroSubtitle: 'Beautiful nails, professional service',
        
        // Gallery
        galleryTitle: 'Nail Gallery',
        gallerySubtitle: 'Our latest nail art designs',
        loadMore: 'Load More',
        
        // Contact
        contactTitle: 'Contact Us',
        wechat: 'WeChat:',
        location: 'Location:',
        
        // Footer
        copyright: 'Made with ♥',
        madeBy: 'Nail Cabin',
        
        // Common
        loading: 'Loading...',
        error: 'Error loading content',
        pageTitle: 'Nail Cabin'
      },
      zh: {
        // Navigation
        localeBtn: 'English',
        bookNow: '立即预约',
        
        // Hero Section
        heroTitle: '专业美甲护理服务',
        heroSubtitle: '美丽指甲，专业服务',
        
        // Gallery
        galleryTitle: '美甲作品',
        gallerySubtitle: '我们最新的美甲设计',
        loadMore: '加载更多',
        
        // Contact
        contactTitle: '联系我们',
        wechat: '微信:',
        location: '地址:',
        
        // Footer
        copyright: '用心制作',
        madeBy: '小木屋美甲',
        
        // Common
        loading: '加载中...',
        error: '加载内容时出错',
        pageTitle: '小木屋美甲'
      }
    };
    
    this.init();
  }
  
  init() {
    // Load saved language preference
    const savedLang = localStorage.getItem('nailCabinLang');
    if (savedLang && this.translations[savedLang]) {
      this.currentLang = savedLang;
    }
    
    // Apply current language
    this.applyLanguage();
    
    // Add event listener to locale button
    const localeBtn = document.getElementById('localeBtn');
    if (localeBtn) {
      localeBtn.addEventListener('click', () => this.switchLanguage());
    }
  }
  
  switchLanguage() {
    this.currentLang = this.currentLang === 'en' ? 'zh' : 'en';
    localStorage.setItem('nailCabinLang', this.currentLang);
    this.applyLanguage();
  }
  
  applyLanguage() {
    const lang = this.translations[this.currentLang];
    
    // Update locale button
    const localeBtn = document.getElementById('localeBtn');
    if (localeBtn) {
      localeBtn.textContent = lang.localeBtn;
    }
    
    // Update brand name
    const brandName = document.querySelector('.brand-name');
    if (brandName) {
      brandName.textContent = lang.brandName;
    }
    
    // Update CTA button
    const ctaBtn = document.querySelector('.cta');
    if (ctaBtn) {
      ctaBtn.textContent = lang.bookNow;
    }
    
    // Update gallery title
    const galleryTitle = document.getElementById('gallery-title');
    if (galleryTitle) {
      galleryTitle.textContent = lang.galleryTitle;
    }
    
    // Update Load More button
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
      loadMoreBtn.textContent = lang.loadMore;
    }
    
    // Update contact info
    const contactTitle = document.querySelector('.contact-info h3');
    if (contactTitle) {
      contactTitle.textContent = lang.contactTitle;
    }
    
    const wechatText = document.querySelector('.contact-info p:first-of-type');
    if (wechatText) {
      wechatText.innerHTML = `<strong>${lang.wechat}</strong> xiamuwu888`;
    }
    
    const locationText = document.querySelector('.contact-info p:last-of-type');
    if (locationText) {
      locationText.innerHTML = `<strong>${lang.location}</strong> 15 Grenville Street, Toronto, ON`;
    }
    

    
    // Update copyright
    const copyright = document.querySelector('.copyright');
    if (copyright) {
      copyright.innerHTML = `© <span id="year"></span> ${lang.madeBy} • ${lang.copyright}`;
    }
    
    // Update page title
    document.title = lang.pageTitle;
    
    // Dispatch custom event for other modules
    document.dispatchEvent(new CustomEvent('languageChanged', {
      detail: { language: this.currentLang, translations: lang }
    }));
  }
  
  getText(key) {
    return this.translations[this.currentLang][key] || key;
  }
  
  getCurrentLanguage() {
    return this.currentLang;
  }
  
  setLanguage(lang) {
    if (this.translations[lang]) {
      this.currentLang = lang;
      localStorage.setItem('nailCabinLang', lang);
      this.applyLanguage();
    }
  }
}

// Initialize locale manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.localeManager = new LocaleManager();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = LocaleManager;
}
