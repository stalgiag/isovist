import { useState, useEffect } from "preact/hooks";
import bracketImage from "../assets/brackets.png";
import ProjectInfo from "./ProjectInfo";

export default function ProjectView({ projects }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleChange = () => {
      setCurrentIndex(window.currentProjectIndex as number);
    };
    window.addEventListener("projectChanged", handleChange);
    return () => window.removeEventListener("projectChanged", handleChange);
  }, []);

  return (
    <>
      <ProjectInfo project={projects[currentIndex]} />
      <div class="w-full h-[200px] flex justify-center items-center self-center relative grid-in-main md:grid-in-main-center">
        <img
          class="w-auto h-full object-contain relative z-10 mix-blend-screen"
          src={projects[currentIndex].data.featuredImage.src}
          alt={projects[currentIndex].data.featuredImageAlt}
        />
        <img
          class="w-auto h-[300px] object-contain absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          src={bracketImage.src}
          alt="bracket"
        />
      </div>
    </>
  );
}
