import { useState, useEffect } from "preact/hooks";
import bracketImage from "../assets/brackets.png";
import ProjectInfo from "./ProjectInfo";

export default function ProjectView({ projects, logo }) {
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
      <div class="w-full grid grid-cols-2 gap-2">
        {logo}
        <ProjectInfo project={projects[currentIndex]} />
      </div>
      <div class="w-full h-[200px] flex justify-center items-center self-center relative">
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
