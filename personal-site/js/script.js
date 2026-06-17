/* ============================================
   Personal Site — Script
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ----- 导航栏滚动效果 -----
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 60) {
      navbar.classList.add('nav--scrolled');
    } else {
      navbar.classList.remove('nav--scrolled');
    }
    lastScroll = currentScroll;
  });

  // ----- 移动端菜单 -----
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('nav__links--open');
    navToggle.classList.toggle('nav__toggle--active');
  });

  // 点击链接后关闭菜单
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('nav__links--open');
      navToggle.classList.remove('nav__toggle--active');
    });
  });

  // 点击菜单外部关闭
  document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !navToggle.contains(e.target)) {
      navLinks.classList.remove('nav__links--open');
      navToggle.classList.remove('nav__toggle--active');
    }
  });

  // ----- 滚动出现动画（淡入） -----
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // 监听所有 section 标题和卡片
  document.querySelectorAll('.section__title, .section__subtitle, .about__card, .work-card, .contact__item')
    .forEach(el => {
      el.classList.add('fade-in');
      observer.observe(el);
    });

  // ----- 作品卡片点击提示（占位功能） -----
  document.querySelectorAll('.work-card').forEach(card => {
    card.addEventListener('click', () => {
      const title = card.querySelector('h3')?.textContent || '作品';
      // 后续可以改成跳转到作品详情页或弹窗
      console.log(`点击了: ${title}`);
    });
  });

});
