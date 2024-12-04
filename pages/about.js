import Navbar from "../components/Navbar";

const About = () => (
  <>
    <Navbar />
    <main className="container mx-auto px-4 py-8">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">About Me</h1>
        <p className="text-lg text-gray-300">
          Design Technologist with over 7 years of experience in design systems
          and interactive prototypes.
        </p>
      </section>

      <section className="flex flex-col-reverse md:flex-row items-center md:items-start">
        <div className="md:w-2/3 md:pr-8">
          <h2 className="text-2xl font-semibold mb-4">Professional Journey</h2>
          <p className="text-gray-300 mb-4">
            I specialize in bridging the gap between design and development,
            bringing ideas to life through interactive prototypes and robust
            design systems. Over the past seven years, I've collaborated with
            cross-functional teams to deliver user-centric solutions.
          </p>
          <p className="text-gray-300 mb-4">
            My expertise includes working with modern technologies and
            methodologies to streamline the design-to-development workflow. I am
            passionate about creating accessible and responsive interfaces that
            enhance user experience.
          </p>
          <p className="text-gray-300">
            When I'm not coding, I enjoy exploring the latest trends in design
            and technology, and contributing to open-source projects.
          </p>
        </div>
      </section>
    </main>
  </>
);

export default About;
