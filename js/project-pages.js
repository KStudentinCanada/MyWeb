/* =========================================
   MAPLEPATH LIVE PRODUCT DEMO
========================================= */


const demoSteps =
    document.querySelectorAll(".demo-step");

const demoContent =
    document.getElementById("demo-content");

const demoTitle =
    document.getElementById("demo-title");

const demoProgress =
    document.querySelector(".demo-progress span");

const demoProgressFill =
    document.querySelector(".demo-progress-fill");


/* =========================================
   DEMO DATA
========================================= */

const demoData = {

    profile: {

        title: "Your Immigration Journey",

        progress: 25,

        label: "PROFILE COMPLETE",

        icon: "✓",

        heading: "Your profile is ready.",

        description:
            "MaplePath uses your information to create a personalized immigration journey.",

        iconClass: "success"

    },


    pathway: {

        title: "Choose Your Pathway",

        progress: 45,

        label: "PATHWAY SELECTED",

        icon: "→",

        heading: "Canadian Experience Class",

        description:
            "MaplePath organizes your selected immigration pathway into a clear sequence of steps.",

        iconClass: "pathway"

    },


    journey: {

        title: "Your Personalized Journey",

        progress: 68,

        label: "CURRENT STEP",

        icon: "◉",

        heading: "Track your progress.",

        description:
            "See where you are in your immigration journey and understand what comes next.",

        iconClass: "journey"

    },


    timeline: {

        title: "Community Timeline",

        progress: 90,

        label: "COMMUNITY DATA",

        icon: "◌",

        heading: "Understand real timelines.",

        description:
            "Community timeline data can help users see how long similar steps have taken for other applicants.",

        iconClass: "timeline"

    }

};


/* =========================================
   CHANGE DEMO
========================================= */

function changeDemoStep(step) {

    const data =
        demoData[step];

    if (!data) {
        return;
    }


    /*
        Start exit animation
    */

    demoContent.classList.add(
        "switching"
    );


    /*
        Animate progress bar
    */

    demoProgressFill.style.width =
        `${data.progress}%`;


    /*
        Update percentage
    */

    demoProgress.textContent =
        `${data.progress}%`;


    /*
        Wait for content transition
    */

    setTimeout(() => {

        demoTitle.textContent =
            data.title;


        demoContent.innerHTML = `

            <div
                class="demo-content-icon ${data.iconClass}"
            >
                ${data.icon}
            </div>

            <span class="demo-content-label">
                ${data.label}
            </span>

            <h4>
                ${data.heading}
            </h4>

            <p>
                ${data.description}
            </p>

        `;


        demoContent.classList.remove(
            "switching"
        );

    }, 250);

}


/* =========================================
   STEP BUTTONS
========================================= */

demoSteps.forEach(step => {

    step.addEventListener(
        "click",
        () => {

            /*
                Remove active state
                from every button
            */

            demoSteps.forEach(item => {

                item.classList.remove(
                    "active"
                );

            });


            /*
                Activate selected step
            */

            step.classList.add(
                "active"
            );


            /*
                Get selected step
            */

            const selectedStep =
                step.dataset.step;


            /*
                Update demo
            */

            changeDemoStep(
                selectedStep
            );

        }
    );

});


/* =========================================
   INITIAL STATE
========================================= */

if (demoData.profile) {

    demoProgressFill.style.width =
        `${demoData.profile.progress}%`;

}