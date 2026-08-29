/* =========================================
   ABOUT PAGE JAVASCRIPT
========================================= */


/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(
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

    revealObserver.observe(element);

});



/* =========================================
   TIMELINE ACTIVE STATE
========================================= */

const timelineItems =
    document.querySelectorAll(
        ".about-timeline-item"
    );


const timelineObserver =
    new IntersectionObserver(
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

    timelineObserver.observe(item);

});



/* =========================================
   TIMELINE SCROLL PROGRESS
========================================= */

const journeySection =
    document.querySelector(
        ".about-journey-section"
    );


const progressFill =
    document.querySelector(
        ".timeline-progress-fill"
    );


function updateTimelineProgress() {

    if (
        !journeySection ||
        !progressFill
    ) {
        return;
    }


    const rect =
        journeySection.getBoundingClientRect();


    const viewportHeight =
        window.innerHeight;


    const totalDistance =
        rect.height -
        viewportHeight;


    if (totalDistance <= 0) {

        return;

    }


    const progress =
        Math.min(
            Math.max(
                -rect.top / totalDistance,
                0
            ),
            1
        );


    progressFill.style.height =
        `${progress * 100}%`;

}


window.addEventListener(
    "scroll",
    updateTimelineProgress,
    {
        passive: true
    }
);


updateTimelineProgress();



/* =========================================
   INTEREST CARD 3D TILT
========================================= */

const interestCards =
    document.querySelectorAll(
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


            const mouseX =
                (x / rect.width) *
                100;


            const mouseY =
                (y / rect.height) *
                100;


            card.style.transform =
                `translateY(-8px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)`;


            card.style.setProperty(
                "--mouse-x",
                `${mouseX}%`
            );


            card.style.setProperty(
                "--mouse-y",
                `${mouseY}%`
            );

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform =
                "";


            card.style.setProperty(
                "--mouse-x",
                "50%"
            );


            card.style.setProperty(
                "--mouse-y",
                "50%"
            );

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


const thinkingDisplay =
    document.querySelector(
        ".thinking-display"
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


function updateThinkingDisplay(
    key
) {

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


    const activeStep =
        document.querySelector(
            `[data-thinking="${key}"]`
        );


    if (activeStep) {

        activeStep.classList.add(
            "active"
        );

    }


    if (thinkingDisplay) {

        thinkingDisplay.classList.add(
            "thinking-changing"
        );

    }


    setTimeout(
        () => {

            thinkingNumber.textContent =
                data.number;


            thinkingTitle.textContent =
                data.title;


            thinkingDescription.textContent =
                data.description;


            if (thinkingDisplay) {

                thinkingDisplay.classList.remove(
                    "thinking-changing"
                );

            }

        },
        150
    );

}


thinkingSteps.forEach((step) => {

    step.addEventListener(
        "click",
        () => {

            const key =
                step.dataset.thinking;


            updateThinkingDisplay(
                key
            );

        }
    );

});



/* =========================================
   HERO MOUSE EFFECT
========================================= */

const hero =
    document.querySelector(
        ".about-hero"
    );


const orbit =
    document.querySelector(
        ".about-hero-orbit"
    );


const heroGlow =
    document.querySelector(
        ".hero-mouse-glow"
    );


if (
    hero &&
    orbit &&
    heroGlow &&
    window.matchMedia(
        "(hover: hover)"
    ).matches
) {

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
                ((x / rect.width) -
                    0.5) *
                25;


            const moveY =
                ((y / rect.height) -
                    0.5) *
                25;


            orbit.style.transform =
                `translate(
                    calc(-50% + ${moveX}px),
                    calc(-50% + ${moveY}px)
                )`;


            heroGlow.style.left =
                `${x}px`;


            heroGlow.style.top =
                `${y}px`;

        }
    );


    hero.addEventListener(
        "mouseleave",
        () => {

            orbit.style.transform =
                "translateY(-50%)";


            heroGlow.style.left =
                "50%";


            heroGlow.style.top =
                "50%";

        }
    );

}



/* =========================================
   FOCUS CARD POINTER EFFECT
========================================= */

const focusCards =
    document.querySelectorAll(
        ".focus-card"
    );


focusCards.forEach((card) => {

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


            const rotateY =
                ((x / rect.width) -
                    0.5) *
                3;


            const rotateX =
                ((y / rect.height) -
                    0.5) *
                -3;


            card.style.transform =
                `translateY(-7px)
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

                behavior:
                    "smooth",

                block:
                    "start"

            });

        }
    );

});