/* =========================================
   ABOUT PAGE JAVASCRIPT
========================================= */


/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements = document.querySelectorAll(
    ".reveal"
);


const revealObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add(
                    "is-visible"
                );

                revealObserver.unobserve(
                    entry.target
                );

            }

        });

    },
    {
        threshold: 0.12
    }
);


revealElements.forEach((element) => {

    revealObserver.observe(
        element
    );

});


/* =========================================
   TIMELINE ACTIVE STATE
========================================= */

const timelineItems = document.querySelectorAll(
    ".about-timeline-item"
);


const timelineObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                timelineItems.forEach((item) => {

                    item.classList.remove(
                        "timeline-active"
                    );

                });


                entry.target.classList.add(
                    "timeline-active"
                );

            }

        });

    },
    {
        threshold: 0.55
    }
);


timelineItems.forEach((item) => {

    timelineObserver.observe(
        item
    );

});


/* =========================================
   INTEREST CARD TILT
========================================= */

const interestCards = document.querySelectorAll(
    ".about-interest-card"
);


interestCards.forEach((card) => {

    card.addEventListener(
        "mousemove",
        (event) => {

            const rect =
                card.getBoundingClientRect();


            const x =
                event.clientX -
                rect.left;


            const y =
                event.clientY -
                rect.top;


            const centerX =
                rect.width / 2;


            const centerY =
                rect.height / 2;


            const rotateX =
                ((y - centerY) /
                    centerY) *
                -3;


            const rotateY =
                ((x - centerX) /
                    centerX) *
                3;


            card.style.transform =
                `translateY(-8px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)`;

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform =
                "";

        }
    );

});


/* =========================================
   THINKING FLOW
========================================= */

const thinkingSteps =
    document.querySelectorAll(
        ".thinking-step"
    );


const thinkingTitle =
    document.querySelector(
        "#thinking-title"
    );


const thinkingDescription =
    document.querySelector(
        "#thinking-description"
    );


const thinkingNumber =
    document.querySelector(
        ".thinking-display-number"
    );


const thinkingData = {

    learn: {

        number: "01",

        title: "Learn",

        description:
            "Start with curiosity. Understand how something works before trying to change it."

    },

    question: {

        number: "02",

        title: "Question",

        description:
            "Ask why it works, what could be different, and whether there is a better way to approach the problem."

    },

    build: {

        number: "03",

        title: "Build",

        description:
            "Turn an idea into something real. Even a rough first version teaches more than an idea sitting on paper."

    },

    break: {

        number: "04",

        title: "Break",

        description:
            "Things don't always work the first time. Debugging forces me to understand the system instead of guessing."

    },

    improve: {

        number: "05",

        title: "Improve",

        description:
            "Take what I learned from the first version and make the system clearer, stronger, and more useful."

    }

};


thinkingSteps.forEach((step) => {

    step.addEventListener(
        "click",
        () => {

            const key =
                step.dataset.thinking;


            const data =
                thinkingData[key];


            if (!data) {
                return;
            }


            thinkingSteps.forEach(
                (item) => {

                    item.classList.remove(
                        "active"
                    );

                }
            );


            step.classList.add(
                "active"
            );


            thinkingNumber.textContent =
                data.number;


            thinkingTitle.textContent =
                data.title;


            thinkingDescription.textContent =
                data.description;

        }
    );

});


/* =========================================
   HERO MOUSE PARALLAX
========================================= */

const hero =
    document.querySelector(
        ".about-hero"
    );


const orbit =
    document.querySelector(
        ".about-hero-orbit"
    );


if (hero && orbit) {

    hero.addEventListener(
        "mousemove",
        (event) => {

            const rect =
                hero.getBoundingClientRect();


            const x =
                event.clientX -
                rect.left;


            const y =
                event.clientY -
                rect.top;


            const moveX =
                ((x / rect.width) - 0.5)
                * 20;


            const moveY =
                ((y / rect.height) - 0.5)
                * 20;


            orbit.style.transform =
                `translate(
                    calc(-50% + ${moveX}px),
                    calc(-50% + ${moveY}px)
                )`;

        }
    );


    hero.addEventListener(
        "mouseleave",
        () => {

            orbit.style.transform =
                "translate(-50%, -50%)";

        }
    );

}


/* =========================================
   SMOOTH INTERNAL LINKS
========================================= */

document.querySelectorAll(
    'a[href^="#"]'
).forEach((link) => {

    link.addEventListener(
        "click",
        (event) => {

            const targetId =
                link.getAttribute(
                    "href"
                );


            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }


            const target =
                document.querySelector(
                    targetId
                );


            if (!target) {
                return;
            }


            event.preventDefault();


            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }
    );

});