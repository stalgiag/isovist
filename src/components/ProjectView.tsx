import { Image } from "astro:assets";
import { useState, useEffect } from "preact/hooks";

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
      <div class="w-full  ">
        <h2 class="text-foreground-secondary">
          {projects[currentIndex].data.title}
        </h2>
        <p class="text-foreground-secondary">{projects[currentIndex].body}</p>
      </div>
      <div class="w-full h-[200px] mix-blend-screen flex justify-center items-center">
        <img
          class="w-auto h-full object-contain"
          src={projects[currentIndex].data.featuredImage.src}
          alt={projects[currentIndex].data.featuredImageAlt}
        />
      </div>
    </>
  );
}
