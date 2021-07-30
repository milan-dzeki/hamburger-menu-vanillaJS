class Menu {
  constructor() {
    // dom items
    this.menuShowBtn = document.querySelector(".menu-btn");
    this.menuHideBtn = document.querySelector(".menu-close");
    this.menu = document.querySelector(".menu");
    this.submenuOpeners = [...document.querySelectorAll(".menu-item__main")];
    this.submenus = [...document.querySelectorAll(".submenu")];
    this.backdrop = document.querySelector(".backdrop");
    this.media = window.matchMedia("screen and (min-width: 760px)");
    
  }
  match =() => {
    if(this.media.matches) {
      let timeout;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        this.backdrop.style.display = "none";
        this.submenuOpeners.forEach(opener => {
          if(opener.classList.contains("submenu-opener")) {
            opener.classList.remove("submenu-opener");
          }
        });
      }, 100);
    } else if(!this.media.matches) { 
      let timeout;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        this.hideMenu();
        this.submenuOpeners.forEach(opener => {
          if(!opener.classList.contains("submenu-opener")) {
            opener.classList.add("submenu-opener");
          }
        });
      }, 100);
    }
  }
  showMenu = () => {
    console.log(this);
    this.menu.classList.add("menu-open");
    this.backdrop.style.display = "block";
  }
  hideMenu = () => {
    this.menu.classList.remove("menu-open");
    this.backdrop.style.display = "none";
    this.submenus.forEach(submenu => {
      if(submenu.classList.contains("submenu-open")) {
        submenu.classList.remove("submenu-open");
        submenu.previousElementSibling.querySelector(".menu-item__icon").classList.remove("icon-rotated");
      }
    })
  }
  toggleSubmenus = (opener, array) => {
    opener.addEventListener("click", () => {
      if(opener.classList.contains("submenu-opener")) {
        if(!opener.nextElementSibling.classList.contains("submenu-open")) {
          opener.nextElementSibling.classList.add("submenu-open");
          opener.querySelector(".menu-item__icon").classList.add("icon-rotated");
        } else {
          opener.nextElementSibling.classList.remove("submenu-open");
          opener.querySelector(".menu-item__icon").classList.remove("icon-rotated");
        }

        array.filter(item => item !== opener).forEach(item => {
          if(item.nextElementSibling.classList.contains("submenu-open")) {
            item.nextElementSibling.classList.remove("submenu-open");
            item.querySelector(".menu-item__icon").classList.remove("icon-rotated");
          }
        })
      }
    });
  }
}

// controller function
const controllerFn = (() => {
  // Menu instance
  const menuInst = new Menu();
  // show menu
  menuInst.menuShowBtn.addEventListener("click", menuInst.showMenu.bind(this));
  // hide menu
  menuInst.menuHideBtn.firstElementChild.addEventListener("click", menuInst.hideMenu.bind(this));
  menuInst.backdrop.addEventListener("click", menuInst.hideMenu.bind(this));
  // toggle submenus
  menuInst.submenuOpeners.forEach((opener, _, array) => {
    menuInst.toggleSubmenus(opener, array);
  });
  window.addEventListener("resize", menuInst.match);
  window.addEventListener("load", menuInst.match);
})();
