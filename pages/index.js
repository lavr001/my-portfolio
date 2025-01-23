import { useEffect, useState } from "react";
import { gsap } from "gsap";
import Navbar from "../components/Navbar";

const Home = () => {
  const [nameText, setNameText] = useState("");
  const [titleText, setTitleText] = useState("");
  const [isTypingName, setIsTypingName] = useState(true);
  const [isTypingTitle, setIsTypingTitle] = useState(false);

  useEffect(() => {
    const myName = "ROMAN";
    const title = "Design Technologist";

    const typingSpeed = 0.15; // seconds per character

    const masterTimeline = gsap.timeline();

    masterTimeline.to(
      {},
      {
        duration: myName.length * typingSpeed,
        onStart: () => setIsTypingName(true),
        onUpdate: function () {
          const progress = this.progress();
          const chars = Math.round(progress * myName.length);
          setNameText(myName.substring(0, chars));
        },
        onComplete: () => setIsTypingName(false),
      }
    );

    masterTimeline.to({}, { duration: 0.6 });

    masterTimeline.to(
      {},
      {
        duration: title.length * typingSpeed,
        onStart: () => setIsTypingTitle(true),
        onUpdate: function () {
          const progress = this.progress();
          const chars = Math.round(progress * title.length);
          setTitleText(title.substring(0, chars));
        },
        onComplete: () => setIsTypingTitle(false),
      }
    );
  }, []);

  return (
    <>
      <Navbar />
      <main className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-4">
            {nameText}
            {isTypingName && <span className="cursor"></span>}
          </h1>
          <h2 className="text-4xl font-medium">
            {titleText}
            {isTypingTitle && <span className="cursor"></span>}
          </h2>
        </div>
      </main>
    </>
  );
};

export default Home;
