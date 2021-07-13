  class WfCollectionSlider {
	  static initiateSlider(slider, slideChangeTime) {
      const list = slider.querySelector('[role="list"]');
      const leftButton = slider.querySelector('[slider-role="left"]');
      const rightButton = slider.querySelector('[slider-role="right"]');

      rightButton.addEventListener('click', event => {
        let s;
        let w;
        let mover;
        s = parseInt(window.getComputedStyle(list.firstElementChild).marginLeft);
        w = parseInt(window.getComputedStyle(list.firstElementChild).width);
        list.firstElementChild.style.transition = '';
        list.firstElementChild.style.marginLeft = '';

        list.appendChild(list.firstElementChild);
        while (list.firstElementChild.style.display == 'none') {
          list.appendChild(list.firstElementChild);
        }
        mover = list.firstElementChild;
        mover.style.marginLeft = `${w + s}px`;
        mover.offsetHeight;
        mover.style.transition = `margin-left ${slideChangeTime}ms`;
        mover.style.marginLeft = `-${window.getComputedStyle(mover).width}`;
      });
      leftButton.addEventListener('click', event => {
        let mover;
        let w;
        let s;
        while (list.lastElementChild.style.display == 'none') {
          mover = list.lastElementChild;
          s = parseInt(window.getComputedStyle(list.firstElementChild).marginLeft);
          list.firstElementChild.style.transition = '';
          list.firstElementChild.style.marginLeft = '';
          mover.style.transition = '';
          mover.style.marginLeft = `${s}px`;
          list.insertBefore(mover, list.firstElementChild);
        };
        mover = list.lastElementChild;
        w = parseInt(window.getComputedStyle(mover).width);
        s = parseInt(window.getComputedStyle(list.firstElementChild).marginLeft);
        list.firstElementChild.style.transition = '';
        list.firstElementChild.style.marginLeft = '';
        mover.style.transition = '';
        mover.style.marginLeft = `${s - w}px`;
        list.insertBefore(mover, list.firstElementChild);
        mover.offsetHeight;
        mover.style.transition = `margin-left ${slideChangeTime}ms`;
        mover.style.marginLeft = `${- w}px`;
      });
      window.addEventListener('resize', () => {list.style.width = ''; list.offsetTop; list.style.width = window.getComputedStyle(list).width;});
      list.style.width = window.getComputedStyle(list).width;
      list.insertBefore(list.lastElementChild, list.firstElementChild);
      list.style.transform = `translateX(-${window.getComputedStyle(list.firstElementChild).width})`;

      setInterval(() => {
        let lastDisplayedSlide;
        [...list.children].forEach(e => {if (e.style.display != 'none') lastDisplayedSlide = e});
        if (!lastDisplayedSlide) {
        } else if (lastDisplayedSlide?.getBoundingClientRect().right < list.getBoundingClientRect().right) {
          list.firstElementChild.style.marginLeft = '';
          leftButton.setAttribute('off', '');
          rightButton.setAttribute('off', '');
        } else {
          if (list.firstElementChild.style.display == 'none') leftButton.click();
          else if (!list.firstElementChild.style.marginLeft) list.firstElementChild.style.marginLeft = `-${window.getComputedStyle(list.firstElementChild).width}`;
          leftButton.removeAttribute('off');
          rightButton.removeAttribute('off');
        }
      }, 300);
    }
    
    constructor(setupValues) {
      setupValues.forEach(arr => {
        const [cont, time] = arr;
        [...document.querySelectorAll(`[wfcollection-slider-container="${cont}"]`)].forEach(slider => {
          WfCollectionSlider.initiateSlider(slider, time);
        });
      });
    }
  }
</script>
<script>
new WfCollectionSlider([
	['product-images', 400],
])
