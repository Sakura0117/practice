const url = "/js/detail.json";
//json loading
fetch(url)
  .then(function (response) {
    return response.json();
  })
  .then(function (json) {
    //console.log(json[0].image);
    const image = document.getElementById("images");
    image.classList.add("grid-container");
    //Json loop
    json.forEach(function (item) {
      const div = document.createElement("div");
      const figure = document.createElement("figure");
      const img = document.createElement("img");
      const p = document.createElement("p");

      //modal
      const modal = document.createElement("div");
      const modalbg = document.createElement("div");
      const modalwrap = document.createElement("div");
      const modalcontents = document.createElement("div");
      const modalClose = document.createElement("div");
      const title = document.createElement("h3");
      const date = document.createElement("p");
      const period = document.createElement("p");
      const thumbnail = document.createElement("img");

      div.classList.add("grid");
      modal.setAttribute("id", "modal");
      modal.classList.add("modal");
      modalbg.setAttribute("id", "overlay");
      modalbg.classList.add("overlay");
      modalwrap.classList.add("modal-wrapper");
      modalcontents.classList.add("modal-contents");
      modalClose.classList.add("modal-close");
      thumbnail.classList.add("thumbnail-image");
      figure.setAttribute("id", "open");
      figure.classList.add("panel", "tab-A");

      const toggle = [figure, modalClose, modalbg];
      for (let i = 0, len = toggle.length; i < len; i++) {
        toggle[i].addEventListener("click", function () {
          const body = document.getElementsByTagName("body")[0];
          if (!modal.classList.contains("is-show")) {
            modal.classList.add("is-show");
            body.classList.add("fixed");
          } else {
            modal.classList.remove("is-show");
            body.classList.remove("fixed");
          }
        });
      }
      img.src = item.image;
      img.alt = item.alt;
      thumbnail.src = item.thumbnail;
      date.innerHTML = "制作日　" + item.date;
      period.innerHTML = "工数　" + item.period;
      title.innerHTML = json[i].title;

      p.innerText = item.title;
      modalClose.innerText = "×";
      figure.appendChild(img);
      div.appendChild(figure);
      div.appendChild(p);
      //div.appendChild(p);
      image.appendChild(div);
      div.appendChild(modal);
      modal.appendChild(modalbg);
      modal.appendChild(modalwrap);
      modalwrap.appendChild(modalcontents);
      modalwrap.appendChild(modalClose);
      modalcontents.appendChild(title);
      modalcontents.appendChild(date);
      modalcontents.appendChild(period);
      modalcontents.appendChild(thumbnail);
    });
  });

document.addEventListener(
  "DOMContentLoaded",
  function () {
    // タブに対してクリックイベントを適用
    const tabs = document.getElementsByClassName("tab");
    for (let i = 0; i < tabs.length; i++) {
      tabs[i].addEventListener("click", tabSwitch, false);
    }

    // タブをクリックすると実行する関数
    function tabSwitch() {
      // タブのclassの値を変更
      document
        .getElementsByClassName("is-active")[0]
        .classList.remove("is-active");
      this.classList.add("is-active");
      // コンテンツのclassの値を変更
      document.getElementsByClassName("is-show")[0].classList.remove("is-show");
      const arrayTabs = Array.prototype.slice.call(tabs);
      const index = arrayTabs.indexOf(this);
      document.getElementsByClassName("panel")[index].classList.add("is-show");
    }
  },
  false
);
