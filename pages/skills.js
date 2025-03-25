import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Navbar from "../components/Navbar";

const skillsData = [
  {
    name: "HTML5",
    src: "/logos/html5.svg",
  },
  {
    name: "CSS3",
    src: "/logos/css3.svg",
  },
  {
    name: "JavaScript",
    src: "/logos/javascript.svg",
  },
  {
    name: "TypeScript",
    src: "/logos/typescript.svg",
  },
  {
    name: "React",
    src: "/logos/react.svg",
  },
  {
    name: "Node.js",
    src: "/logos/nodejs.svg",
  },
  {
    name: "Next.js",
    src: "/logos/nextjs.svg",
  },
  {
    name: "Jest",
    src: "/logos/jest.svg",
  },
  {
    name: "Tailwind CSS",
    src: "/logos/tailwindcss.svg",
  },
  {
    name: "Figma",
    src: "/logos/figma.svg",
  },
  {
    name: "Storybook",
    src: "/logos/storybook.svg",
  },
  {
    name: "GSAP",
    src: "/logos/greensock.svg",
  },
];

const Skills = () => {
  const headingRef = useRef(null);
  const logosRef = useRef(null);

  useEffect(() => {
    const letters = headingRef.current.querySelectorAll(".letter");
    const logoItems = logosRef.current.children;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      letters,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.1,
      }
    );

    tl.to(
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

    for (let i = 0; i < logoItems.length; i++) {
      tl.fromTo(
        logoItems[i],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 }
      );
    }
  }, []);

  const splitWord = (word) =>
    word.split("").map((char, index) => (
      <span key={index} className="inline-block letter">
        {char}
      </span>
    ));

  return (
    <>
      <Navbar />
      <main className="overflow-y-auto bg-black text-white relative top-[64px] h-[calc(100vh-64px)]">
        <div className="flex flex-col items-center justify-center min-h-full p-8">
        <h1 className="text-4xl font-bold my-8 text-center" ref={headingRef}>
          {splitWord("Skills")}
        </h1>
        <div ref={logosRef} className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          {skillsData.map((skill) => (
            <div key={skill.name} className="flex flex-col items-center">
              <img
                src={skill.src}
                alt={`${skill.name} logo`}
                className="w-20 h-20 object-contain mb-2"
              />
              <p className="text-lg font-medium">{skill.name}</p>
            </div>
          ))}
        </div>
      </div>
      </main>
    </>
  );
};

export default Skills;
