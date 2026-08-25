/* =========================================
   MYWEB — MAIN JAVASCRIPT
========================================= */


/* =========================================
   MOBILE NAVIGATION
========================================= */

const mobileMenuButton =
    document.getElementById("mobile-menu-button");

const mobileNav =
    document.getElementById("mobile-nav");


if (mobileMenuButton && mobileNav) {

    mobileMenuButton.addEventListener("click", () => {

        const isOpen =
            mobileNav.classList.toggle("active");

        mobileMenuButton.classList.toggle(
            "active",
            isOpen
        );

        mobileMenuButton.setAttribute(
            "aria-expanded",
            isOpen
        );

    });


    /* Close menu when a navigation link is clicked */

    mobileNav.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            mobileNav.classList.remove("active");

            mobileMenuButton.classList.remove("active");

            mobileMenuButton.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });

}