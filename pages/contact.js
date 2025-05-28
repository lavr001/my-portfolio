import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Navbar from "../components/Navbar";
import useVisualViewportHeight from "../hooks/useVisualViewportHeight";

const contactData = [
  {
    name: "LinkedIn",
    src: "/logos/linkedin.svg",
    link: "https://www.linkedin.com/in/rlavrenov/",
  },
  {
    name: "GitHub",
    src: "/logos/github.svg",
    link: "https://github.com/lavr001",
  },
];

const Contact = () => {
  const headingRef = useRef(null);
  const logosRef = useRef(null);
  const emailTextRef = useRef(null);
  const viewportHeight = useVisualViewportHeight();
  const finalEmail = "lavr001@gmail.com";

  useEffect(() => {
    const letters = headingRef.current.querySelectorAll(".letter");
    const logoLinkElements = gsap.utils.toArray(
      logosRef.current.querySelectorAll("li > a")
    );
    const emailEl = emailTextRef.current;

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

    if (logoLinkElements.length > 0) {
      tl.fromTo(
        logoLinkElements,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.6 } // Changed stagger to 0.6 and removed position parameter
      );
    }

    if (emailEl) {
      emailEl.innerHTML = finalEmail
        .split("")
        .map((char) => `<span class="inline-block email-letter">${char}</span>`)
        .join("");
      const emailLetters = emailEl.querySelectorAll(".email-letter");
      if (emailLetters.length > 0) {
        tl.fromTo(
          emailLetters,
          { opacity: 0, scale: 0, y: -20 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.8,
            ease: "back.out(1.7)",
            stagger: 0.1,
          },
          ">0.2"
        );
      }
    }

    const iconHoverListeners = [];
    logoLinkElements.forEach((linkElement) => {
      const iconImage = linkElement.querySelector("img");
      const iconText = linkElement.querySelector("p");

      const handleMouseEnter = () => {
        gsap.to(iconImage, {
          scale: 1.15,
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(iconText, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(iconImage, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(iconText, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      linkElement.addEventListener("mouseenter", handleMouseEnter);
      linkElement.addEventListener("mouseleave", handleMouseLeave);

      iconHoverListeners.push({
        el: linkElement,
        type: "mouseenter",
        handler: handleMouseEnter,
      });
      iconHoverListeners.push({
        el: linkElement,
        type: "mouseleave",
        handler: handleMouseLeave,
      });
    });

    return () => {
      iconHoverListeners.forEach((listener) => {
        listener.el.removeEventListener(listener.type, listener.handler);
      });
      logoLinkElements.forEach((linkElement) => {
        const iconImage = linkElement.querySelector("img");
        const iconText = linkElement.querySelector("p");
        if (iconImage) gsap.killTweensOf(iconImage);
        if (iconText) gsap.killTweensOf(iconText);
      });
      if (emailEl) {
        const emailLetters = emailEl.querySelectorAll(".email-letter");
        if (emailLetters.length > 0) {
          gsap.killTweensOf(emailLetters);
        }
      }
      if (letters.length > 0) {
        gsap.killTweensOf(letters);
      }
    };
  }, [finalEmail]);

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
        className="overflow-y-auto bg-black text-white relative top-[64px]"
        style={{
          height: viewportHeight
            ? `${viewportHeight - 64}px`
            : "calc(100vh - 64px)",
        }}
      >
        <div className="flex flex-col items-center min-h-full p-12">
          <h1 className="text-4xl font-bold mb-12 text-center" ref={headingRef}>
            {splitWord("Contact")}
          </h1>
          <ul ref={logosRef} className="flex space-x-8 list-none p-0 m-0">
            {contactData.map((contact) => (
              <li key={contact.name}>
                <a
                  href={contact.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center"
                  aria-label={`Visit my ${contact.name} profile`}
                >
                  <img
                    src={contact.src}
                    alt={`${contact.name} logo`}
                    className="w-20 h-20 object-contain mb-2"
                  />
                  <p className="text-lg font-medium">{contact.name}</p>
                </a>
              </li>
            ))}
          </ul>
          <a
            href={`mailto:${finalEmail}`}
            className="text-2xl font-mono mt-12 text-center block hover:underline"
            aria-label={`Email ${finalEmail}`}
          >
            <span ref={emailTextRef} className="inline-block"></span>
          </a>
        </div>
      </main>
    </>
  );
};

export default Contact;
