document.addEventListener(
  "DOMContentLoaded",
  function () {
    function renderJsonContent() {
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

            img.src = item.image;
            img.alt = item.alt;
            thumbnail.src = item.thumbnail;
            date.innerHTML = "制作日　" + item.date;
            period.innerHTML = "工数　" + item.period;
            title.innerHTML = item.title;

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
    }

    function renderJsonContentByCategory(category) {
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
          json
            .filter((item) => item.category === category)
            .forEach(function (item) {
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

              img.src = item.image;
              img.alt = item.alt;
              thumbnail.src = item.thumbnail;
              date.innerHTML = "制作日　" + item.date;
              period.innerHTML = "工数　" + item.period;
              title.innerHTML = item.title;

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
    }

    function removeImages() {
      const parent = document.getElementById("images");

      while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
      }
    }

    renderJsonContent(null);

    document
      .getElementById("tab-webpage")
      .addEventListener("click", function () {
        removeImages();

        renderJsonContentByCategory("webpage");
      });

    document
      .getElementById("tab-lp-banner")
      .addEventListener("click", function () {
        removeImages();

        renderJsonContentByCategory("lp-banner");
      });

    document
      .getElementById("tab-banner")
      .addEventListener("click", function () {
        removeImages();

        renderJsonContentByCategory("banner");
      });

    document
      .getElementById("tab-package")
      .addEventListener("click", function () {
        removeImages();

        renderJsonContentByCategory("package");
      });
  },
  false
);
