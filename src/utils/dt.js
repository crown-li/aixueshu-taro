// 节流函数
export function throttle(fn, delay) {
    let lastCall = 0;
    return function (...args) {
      const now = Date.now();
      if (now - lastCall >= delay) {
        fn.apply(this, args);
        lastCall = now;
      }
    };
  }

// 防抖函数
export function debounce(fn, delay) {
    let timer = null;
    return function (...args) {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        fn.apply(this, args);
      }, delay);
    };
  }