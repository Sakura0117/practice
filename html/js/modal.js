(function () {
  //↓モーダルを表示するスクリプト↓
  const modalArea = document.getElementById('modalArea');
  const openModal = document.getElementById('openModal');
  const closeModal = document.getElementById('closeModal');
  const modalBg = document.getElementById('modalBg');
  const toggle = [openModal,closeModal,modalBg];
  
  for(let i=0, len=toggle.length ; i<len ; i++){
    toggle[i].addEventListener('click',function(){
      if(!modalArea.classList.contains('is-show')){
        modalArea.classList.add('is-show');
        bodyScrollPrevent(true); //スクロール制御関数
      } else {
        modalArea.classList.remove('is-show');
        bodyScrollPrevent(false,modalArea); //スクロール制御関数
      }
    });
  }
  //↓スクロール制御のための関数↓
  function bodyScrollPrevent(flag, modal){
    let scrollPosition;
    const body = document.getElementsByTagName('body')[0];
    const ua = window.navigator.userAgent.toLowerCase();
    const isiOS = ua.indexOf('iphone') > -1 || ua.indexOf('ipad') > -1 || ua.indexOf('macintosh') > -1 && 'ontouchend' in document;
    const scrollBarWidth = window.innerWidth - document.body.clientWidth;
    if(flag){
      body.style.paddingRight = scrollBarWidth + 'px';
      if(isiOS){
        scrollPosition = -window.pageYOffset;
        body.style.position = 'fixed';
        body.style.width = '100%';
        body.style.top = scrollPosition + 'px';
      } else {
        body.style.overflow = 'hidden';
      }
    } else if(!flag) {
      addEventListenerOnce(modal,'transitionend',function(){
        body.style.paddingRight = '';
        if(isiOS){
          scrollPosition = parseInt(body.style.top.replace(/[^0-9]/g,''));
          body.style.position = '';
          body.style.width = '';
          body.style.top = '';
          window.scrollTo(0, scrollPosition);
        }else {
          body.style.overflow = '';
        }
      });
    }
    function addEventListenerOnce(node, event, callback) {
      const handler = function(e) {
        callback.call(this, e);
        node.removeEventListener(event, handler);
      };
      node.addEventListener(event, handler);
    }
  }
}());