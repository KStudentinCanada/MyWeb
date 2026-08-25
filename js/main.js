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


    /* Close menu when clicking outside */

    document.addEventListener("click", event => {

        if (
            mobileNav.classList.contains("active") &&
            !mobileNav.contains(event.target) &&
            !mobileMenuButton.contains(event.target)
        ) {

            mobileNav.classList.remove("active");

            mobileMenuButton.classList.remove("active");

            mobileMenuButton.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });


    /* Close menu with Escape */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            mobileNav.classList.remove("active");

            mobileMenuButton.classList.remove("active");

            mobileMenuButton.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });

}


/* =========================================
   REDUCED MOTION
========================================= */

const prefersReducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


/* =========================================
   NAVBAR SCROLL EFFECT
========================================= */

const navbar =
    document.querySelector(".navbar");


if (navbar) {

    const updateNavbar = () => {

        if (window.scrollY > 20) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    };


    updateNavbar();

    window.addEventListener(
        "scroll",
        updateNavbar,
        { passive: true }
    );

}


/* =========================================
   HERO ENTRANCE ANIMATION
========================================= */

const hero =
    document.querySelector(".hero");


if (
    hero &&
    !prefersReducedMotion
) {

    const heroElements = [

        ".hero-status",
        ".hero-greeting",
        ".hero-name",
        ".hero-role",
        ".hero-description",
        ".hero-goal-card",
        ".hero-buttons",
        ".hero-scroll"

    ];


    heroElements.forEach(
        (selector, index) => {

            const element =
                hero.querySelector(selector);


            if (!element) {
                return;
            }


            element.classList.add(
                "hero-reveal"
            );


            element.style.setProperty(
                "--hero-delay",
                `${index * 100}ms`
            );

        }
    );


    requestAnimationFrame(() => {

        requestAnimationFrame(() => {

            hero.classList.add(
                "hero-loaded"
            );

        });

    });

}


/* =========================================
   HERO MOUSE PARALLAX
========================================= */

if (
    hero &&
    !prefersReducedMotion &&
    window.matchMedia("(pointer: fine)").matches
) {

    const background =
        hero.querySelector(".hero-background");

    const floatingLabels =
        hero.querySelectorAll(".hero-floating");


    let mouseX = 0;
    let mouseY = 0;

    let currentX = 0;
    let currentY = 0;


    hero.addEventListener(
        "mousemove",
        event => {

            const rect =
                hero.getBoundingClientRect();


            mouseX =
                (event.clientX - rect.left) /
                rect.width -
                0.5;


            mouseY =
                (event.clientY - rect.top) /
                rect.height -
                0.5;

        }
    );


    const animateParallax = () => {

        currentX +=
            (mouseX - currentX) * 0.05;

        currentY +=
            (mouseY - currentY) * 0.05;


        if (background) {

            background.style.transform =
                `translate3d(
                    ${currentX * 8}px,
                    ${currentY * 8}px,
                    0
                )`;

        }


        floatingLabels.forEach(
            (label, index) => {

                const strength =
                    (index + 1) * 5;


                label.style.setProperty(
                    "--mouse-x",
                    `${currentX * strength}px`
                );


                label.style.setProperty(
                    "--mouse-y",
                    `${currentY * strength}px`
                );

            }
        );


        requestAnimationFrame(
            animateParallax
        );

    };


    animateParallax();


    hero.addEventListener(
        "mouseleave",
        () => {

            mouseX = 0;
            mouseY = 0;

        }
    );

}


/* =========================================
   HERO CURSOR GLOW
========================================= */

if (
    hero &&
    !prefersReducedMotion &&
    window.matchMedia("(pointer: fine)").matches
) {

    const cursorGlow =
        document.createElement("div");


    cursorGlow.className =
        "hero-cursor-glow";


    hero.appendChild(
        cursorGlow
    );


    hero.addEventListener(
        "mousemove",
        event => {

            const rect =
                hero.getBoundingClientRect();


            cursorGlow.style.left =
                `${event.clientX - rect.left}px`;


            cursorGlow.style.top =
                `${event.clientY - rect.top}px`;

        }
    );


    hero.addEventListener(
        "mouseenter",
        () => {

            cursorGlow.classList.add(
                "visible"
            );

        }
    );


    hero.addEventListener(
        "mouseleave",
        () => {

            cursorGlow.classList.remove(
                "visible"
            );

        }
    );

}


/* =========================================
   ACTIVE NAVIGATION
========================================= */

const sections =
    document.querySelectorAll(
        "main section[id]"
    );


const navigationLinks =
    document.querySelectorAll(
        ".desktop-nav a, .mobile-nav a"
    );


if (
    sections.length &&
    navigationLinks.length
) {

    const sectionObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }


                        const sectionId =
                            entry.target.id;


                        navigationLinks.forEach(
                            link => {

                                const target =
                                    link.getAttribute(
                                        "href"
                                    );


                                link.classList.toggle(
                                    "active",
                                    target ===
                                    `#${sectionId}`
                                );

                            }
                        );

                    }
                );

            },
            {
                rootMargin:
                    "-35% 0px -55% 0px",

                threshold: 0
            }
        );


    sections.forEach(
        section => {

            sectionObserver.observe(
                section
            );

        }
    );

}

/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements =
    document.querySelectorAll(".reveal");


if (
    revealElements.length &&
    !prefersReducedMotion
) {

    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }


                    entry.target.classList.add(
                        "visible"
                    );


                    revealObserver.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.12,

                rootMargin:
                    "0px 0px -60px 0px"
            }
        );


    revealElements.forEach(element => {

        revealObserver.observe(
            element
        );

    });

}


/* =========================================
   REDUCED MOTION FALLBACK
========================================= */

if (prefersReducedMotion) {

    revealElements.forEach(element => {

        element.classList.add(
            "visible"
        );

    });

}