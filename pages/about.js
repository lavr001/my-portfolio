import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Navbar from "../components/Navbar";

const aboutSections = [
  {
    title: "Front-End Development",
    direction: "left",
    bullets: [
      "Developed scalable applications with React, Next.js, and Tailwind CSS.",
      "Leveraged JavaScript and TypeScript for modern, maintainable code.",
      "Built reusable web components for consistency across projects using Stencil and Lit.",
    ],
  },
  {
    title: "UX & UI",
    direction: "right",
    bullets: [
      "Developed prototypes deployed in A/B testing to validate design decisions and optimize usability.",
      "Standardized UI styles by integrating design tokens into projects via Style Dictionary.",
      "Delivered high-fidelity prototypes that took design ideas from concept to deployment.",
    ],
  },
  {
    title: "Prototyping & Animation",
    direction: "left",
    bullets: [
      "Rapidly prototyped solutions using React, Figma, and Axure RP.",
      "Integrated GSAP for smooth, engaging animations.",
      "Iteratively refined prototypes based on user feedback.",
    ],
  },
  {
    title: "Design Systems & Testing",
    direction: "right",
    bullets: [
      "Developed and maintained design systems for product consistency and reusability.",
      "Utilized Storybook for detailed components documentation with visual previews.",
      "Employed Jest for robust front-end testing.",
    ],
  },
];

const About = () => {
  const headingRef = useRef(null);
  const rowsContainerRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    const letters = headingRef.current.querySelectorAll(".letter");
    tl.fromTo(
      letters,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 0.6, stagger: 0.1 }
    ).to(
      letters,
      {
        scale: 1.1,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        stagger: 0.05,
      },
      "+=0.2"
    );

    const sections = rowsContainerRef.current.querySelectorAll(".section");
    sections.forEach((section) => {
      const direction = section.getAttribute("data-direction");
      const fromX = direction === "left" ? -50 : 50;
      tl.fromTo(
        section,
        { opacity: 0, x: fromX },
        { opacity: 1, x: 0, duration: 0.6 },
        ">0.1"
      );
    });
  }, []);

  const splitWord = (word) =>
    word.split("").map((char, index) => (
      <span key={index} className="inline-block letter">
        {char}
      </span>
    ));

  const row1 = aboutSections.slice(0, 2);
  const row2 = aboutSections.slice(2, 4);

  return (
    <>
      <Navbar />
      <main className="overflow-y-auto bg-black text-white p-8 relative top-[64px] h-[calc(100vh-64px)]">
        <h1 className="text-4xl font-bold my-8 text-center" ref={headingRef}>
          {splitWord("About")}
        </h1>
        <div ref={rowsContainerRef} className="max-w-5xl mx-auto space-y-8">
          <div className="row grid grid-cols-1 md:grid-cols-2 gap-8">
            {row1.map((section, index) => (
              <div
                key={index}
                className="section border-2 border-white rounded-[8px] p-4"
                data-direction={section.direction}
              >
                <h2 className="text-2xl font-semibold mb-2">{section.title}</h2>
                <ul className="list-disc list-inside space-y-2 mx-auto">
                  {section.bullets.map((bullet, idx) => (
                    <li key={idx} className="text-gray-300 text-lg md:text-xl">
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="row grid grid-cols-1 md:grid-cols-2 gap-8">
            {row2.map((section, index) => (
              <div
                key={index}
                className="section border-2 border-white rounded-[8px] p-4"
                data-direction={section.direction}
              >
                <h2 className="text-2xl font-semibold mb-2">{section.title}</h2>
                <ul className="list-disc list-inside space-y-2 mx-auto">
                  {section.bullets.map((bullet, idx) => (
                    <li key={idx} className="text-gray-300 text-lg md:text-xl">
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default About;
