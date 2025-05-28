import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Navbar from "../components/Navbar";
import useVisualViewportHeight from "../hooks/useVisualViewportHeight";

const projectSections = [
  {
    title: "AWS Code Hike Demo",
    direction: "left",
    description:
      "This prototype demonstrates how AWS Amplify documentation could be enhanced with Code Hike for a more interactive learning experience.",
    icon: "/logos/amazonwebservices.svg",
    link: "https://code-hike-demo.vercel.app/",
  },
  {
    title: "Global News",
    direction: "right",
    description:
      "A news application built with React, utilized News API that showcases UI components, responsive design, and accessibility best practices.",
    icon: "/logos/global.svg",
    link: "https://news-react-five-zeta.vercel.app/",
  },
  {
    title: "GSAP animated UI components",
    direction: "left",
    description:
      "A CodePen collection showcasing interactive UI components built with HTML5, SCSS, JS and React. These components bring Figma designs to life, demonstrating various states and animations powered by GSAP.",
    icon: "/logos/codepen.svg",
    link: "https://codepen.io/collection/XvwjYb",
  },
  {
    title: "Cube Runner Game",
    direction: "right",
    description:
      "Game that I built using Babylon.js, a powerful open-source 3D engine that brings stunning graphics and immersive experiences to the web using WebGL and WebGPU. Dodge the pink obstacles in this fast-paced game! ",
    icon: "/logos/anycubic.svg",
    link: "https://cube-runner-lemon.vercel.app/",
  },
];

const Projects = () => {
  const headingRef = useRef(null);
  const rowsContainerRef = useRef(null);
  const viewportHeight = useVisualViewportHeight();

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    const letters = headingRef.current.querySelectorAll(".letter");
    tl.fromTo(
      letters,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 0.6, stagger: 0.1 }
    ).to(
      letters,
      { scale: 1.1, duration: 0.2, yoyo: true, repeat: 1, stagger: 0.05 },
      "+=0.2"
    );

    const sections = rowsContainerRef.current.querySelectorAll(".section");
    const listeners = [];

    sections.forEach((sectionEl) => {
      const direction = sectionEl.getAttribute("data-direction");
      const fromX = direction === "left" ? -50 : 50;
      tl.fromTo(
        sectionEl,
        { opacity: 0, x: fromX },
        { opacity: 1, x: 0, duration: 0.6 }
      );

      gsap.set(sectionEl, {
        transformPerspective: 600,
        transformStyle: "preserve-3d",
      });
      const maxRotation = 8;

      const handleMouseMove = (e) => {
        const rect = sectionEl.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        const rotateX = (y / (rect.height / 2)) * -maxRotation;
        const rotateY = (x / (rect.width / 2)) * maxRotation;

        gsap.to(sectionEl, {
          rotationX: rotateX,
          rotationY: rotateY,
          duration: 0.2,
          ease: "power1.out",
        });
      };

      const handleMouseEnter = () => {
        gsap.to(sectionEl, {
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(sectionEl, {
          rotationX: 0,
          rotationY: 0,
          duration: 0.4,
          ease: "elastic.out(1, 0.75)",
        });
      };

      sectionEl.addEventListener("mousemove", handleMouseMove);
      sectionEl.addEventListener("mouseenter", handleMouseEnter);
      sectionEl.addEventListener("mouseleave", handleMouseLeave);

      listeners.push({
        el: sectionEl,
        type: "mousemove",
        handler: handleMouseMove,
      });
      listeners.push({
        el: sectionEl,
        type: "mouseenter",
        handler: handleMouseEnter,
      });
      listeners.push({
        el: sectionEl,
        type: "mouseleave",
        handler: handleMouseLeave,
      });
    });

    return () => {
      listeners.forEach((listener) => {
        listener.el.removeEventListener(listener.type, listener.handler);
      });
      sections.forEach((sectionEl) => gsap.killTweensOf(sectionEl));
    };
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
      <main
        className="overflow-y-auto bg-black text-white p-12 relative top-[64px]"
        style={{
          height: viewportHeight
            ? `${viewportHeight - 64}px`
            : "calc(100vh - 64px)",
        }}
      >
        <h1 className="text-4xl font-bold mb-12 text-center" ref={headingRef}>
          {splitWord("Projects")}
        </h1>
        <div ref={rowsContainerRef} className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projectSections.map((section, idx) => (
              <article
                key={idx}
                className="section border-2 border-white rounded-[8px] p-4 cursor-pointer"
                data-direction={section.direction}
                onClick={() =>
                  window.open(section.link, "_blank", "noopener,noreferrer")
                }
                aria-labelledby={`project-title-${idx}`}
              >
                <h2
                  className="text-2xl font-semibold mb-2"
                  id={`project-title-${idx}`}
                >
                  {section.title}
                </h2>
                <p className="text-gray-300 text-lg md:text-xl">
                  {section.description}
                </p>
                {section.icon && (
                  <div className="flex justify-center mt-4">
                    <img
                      src={section.icon}
                      alt={`${section.title} icon`}
                      className="h-10 w-10"
                    />
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Projects;
