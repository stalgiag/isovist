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

  const [isLargeScreen, setIsLargeScreen] = useState(null);

  useEffect(() => {
    // Set initial value
    setIsLargeScreen(window.innerWidth >= 1024);

    // Optional: Add resize listener if you want it to be responsive
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  if (isLargeScreen === null) {
    return null; // Or return a loading spinner/placeholder
  }

  const scale = projects[currentIndex].data.scale || 1;
  const h = 600 * scale;

  return (
    <>
      {/* @ts-ignore */}
      <ProjectInfo project={projects[currentIndex]} />
      <div
        style={{
          height: isLargeScreen ? `600px` : `300px`,
        }}
        class={`w-full flex justify-center items-center self-center relative grid-in-main md:grid-in-main-center`}
      >
        <video
          class="w-auto h-full max-h-full object-contain relative z-10 mix-blend-screen"
          style={{
            height: isLargeScreen ? `${h}px` : `${h / 2}px`,
            marginTop: `${projects[currentIndex]?.data?.offset?.[1] ?? 0}px`,
            marginLeft: `${projects[currentIndex]?.data?.offset?.[0] ?? 0}px`,
          }}
          src={projects[currentIndex].data.video}
          ref={(el) => {
            if (el) el.playbackRate = 0.9;
          }}
          autoplay
          muted
          loop
          playsinline
        />
        <img
          class="w-auto h-[300px] lg:h-[500px] object-contain absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          src={bracketImage.src}
          alt="bracket"
        />
      </div>
    </>
  );
}
