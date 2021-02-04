
/*-----------------Navigation Menu---------------*/
(() => {

    const hamburgerBtn = document.querySelector(".hamburger-btn"),
        navMenu = document.querySelector(".nav-menu"),
        closeNavBtn = navMenu.querySelector(".close-nav-menu");

    hamburgerBtn.addEventListener("click", showNavMenu);
    closeNavBtn.addEventListener("click", hideNavMenu);

    function showNavMenu() {
        navMenu.classList.add("open");
    }
    function hideNavMenu() {
        navMenu.classList.remove("open");
        fadeOutEffect();
    }

    function fadeOutEffect() {
        document.querySelector(".fade-out-effect").classList.add("active");
        setTimeout(() => {
            document.querySelector(".fade-out-effect").classList.remove("active");
        }, 500)
    }

    //Attach an event handler to document
    document.addEventListener("click", (event) => {
        if (event.target.classList.contains('link-item')) {

            /*to ensure event.target.hash has a value (#) before a clicked class, if its not,
            to prevent it from new page load(error).*/

            if (event.target.hash !== "") {
                //prevent default anchor click behaviour
                event.preventDefault();

                const hash = event.target.hash;

                //deavtivating excisting active 'section'
                document.querySelector(".section.active").classList.add("hide");
                document.querySelector(".section.active").classList.remove("active");

                //avtivating new 'section'
                document.querySelector(hash).classList.add("active");
                document.querySelector(hash).classList.remove("hide");

                /* deactivating existing active navigation menu 'link-item' */
                navMenu.querySelector(".active").classList.add("outer-shadow", "hover-in-shadow");
                navMenu.querySelector(".active").classList.remove("active", "inner-shadow");

                if (navMenu.classList.contains("open")) {
                    /* activating new active navigation menu 'link-item' */
                    event.target.classList.add("active", "inner-shadow");
                    event.target.classList.remove("outer-shadow", "hover-in-shadow");

                    //hide navigation menu
                    hideNavMenu();
                }
                else {
                    let navItems = navMenu.querySelectorAll(".link-item");
                    navItems.forEach((item) => {
                        if (hash === item.hash) {
                            // activating new navigation menu 'link-item'
                            item.classList.add("active", "inner-shadow");
                            item.classList.remove("outer-shadow", "hover-in-shadow");
                        }
                    })
                    fadeOutEffect();
                }

            }
        }
    })
})();


/*-----------------About-section tabs---------------*/

(() => {
    const aboutSection = document.querySelector(".about-section"),
        tabsContainer = document.querySelector(".about-tabs");

    tabsContainer.addEventListener("click", (event) => {
        //--If event.target contains 'tab-item' class and not contain 'active' class--//
        if (event.target.classList.contains("tab-item") &&
            !event.target.classList.contains("active")) {
            const target = event.target.getAttribute("data-target");

            //---deactivate existing active 'tab-item'
            tabsContainer.querySelector(".active").classList.remove("outer-shadow", "active");

            //---activate new 'tab-item'
            event.target.classList.add("active", "outer-shadow");

            //---deactivate existing active 'tab-content'
            aboutSection.querySelector(".tab-content.active").classList.remove("active");

            //---activate new 'tab-content'
            aboutSection.querySelector(target).classList.add("active");


        }
    })



    window.addEventListener("load", () => {
        //preloader

        document.querySelector(".preloader").classList.add("fade-out");
        setTimeout(() => {
            document.querySelector(".preloader").style.display = "none";
        }, 1000)
    })
})();

// /*---------------HIde All Sections Except active--------------\
(() => {
    const sections = document.querySelectorAll(".section");
    sections.forEach((section) => {
        if (!section.classList.contains("active")) {
            section.classList.add("hide");
        }
    })
})();




// /*---------------------Portfolio Filter and popup------------------------\

function bodyScrollingToggle() {
    document.body.classList.toggle("hidden-scrolling");
}

(() => {

    const filterContainer = document.querySelector(".portfolio-filter"),
        portfolioItemsContainer = document.querySelector(".portfolio-items"),
        portfolioItems = document.querySelectorAll(".portfolio-item"),
        popup = document.querySelector(".portfolio-popup"),
        closeBtn = popup.querySelector(".pp-close"),
        projectDetailsContainer = popup.querySelector(".pp-details"),
        projectDetailsBtn = popup.querySelector(".pp-project-details-btn");



    portfolioItemsContainer.addEventListener("click", (event) => {
        if (event.target.closest(".portfolio-item-inner")) {

            const portfolioItem = event.target.closest(".portfolio-item-inner").parentElement;
            itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(portfolioItem);

            screenshots = portfolioItems[itemIndex].querySelector(".portfolio-item-img img").getAttribute("data-screenshots");

            screenshots = screenshots.split(",");
            slideIndex = 0;

            popupToggle();
            popupSlideshow();
            popupDetails();
        }
    })

    function popupToggle() {
        popup.classList.toggle("open");
        bodyScrollingToggle();
    }

    closeBtn.addEventListener("click", () => {
        popupToggle();
        popupDetailsToggle();
        
    })

    function popupSlideshow() {
        const imgSrc = screenshots[slideIndex];
        const popupImg = popup.querySelector(".pp-img");
        //-------Activate loader until the popupImg loaded-----------
        popup.querySelector(".pp-loader").classList.add("active");
        popupImg.src = imgSrc;
        popupImg.onload = () =>{
        //-------DeActivate loader After the popupImg loaded-----------
        popup.querySelector(".pp-loader").classList.remove("active");
        }
    }

    function popupDetails(){
        //--get The Project Details----
        const details = portfolioItems[itemIndex].querySelector(".portfolio-item-details").innerHTML;
        popup.querySelector(".pp-project-details").innerHTML = details;

        //--get The Project Title----
        const title = portfolioItems[itemIndex].querySelector(".portfolio-item-text").innerHTML;
        popup.querySelector(".pp-title h2").innerHTML = title;

        //--get The Project Category----
        const category = portfolioItems[itemIndex].getAttribute("data-category");
        popup.querySelector(".pp-project-category").innerHTML = category;

    }

    projectDetailsBtn.addEventListener("click", () =>{
        popupDetailsToggle();
    })

    function popupDetailsToggle(){
        if(projectDetailsContainer.classList.contains("active")){

            projectDetailsBtn.querySelector("i").classList.remove("fa-arrow-alt-circle-up");
            projectDetailsBtn.querySelector("i").classList.add("fa-arrow-alt-circle-down");

            projectDetailsContainer.classList.remove("active");
            projectDetailsContainer.style.maxHeight = 0 + "px";

            
        }
        else{
            projectDetailsBtn.querySelector("i").classList.remove("fa-arrow-alt-circle-down");
            projectDetailsBtn.querySelector("i").classList.add("fa-arrow-alt-circle-up");

            projectDetailsContainer.classList.add("active");
            projectDetailsContainer.style.maxHeight = projectDetailsContainer.scrollHeight + "px";
            popup.scrollTo(0, projectDetailsContainer.offsetTop);

            
        }
    }


})();

