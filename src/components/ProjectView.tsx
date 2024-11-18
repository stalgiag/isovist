import { useState, useEffect } from "preact/hooks";
import bracketImage from "../assets/brackets.png";
import ProjectInfo from "./ProjectInfo";
import { SPOTLIGHTS } from "../content/config";
import { Image } from "astro:assets";

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

  const renderFeaturedMedia = () => {
    if (projects[currentIndex].data.image) {
      return (
        <img
          class="w-auto h-[300px] lg:h-[350px] mt-2 object-contain absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          src={projects[currentIndex]?.data?.image.src}
          alt={projects[currentIndex]?.data?.thumbnailAlt}
          width={projects[currentIndex]?.data?.image.width}
          height={projects[currentIndex]?.data?.image.height}
        />
      );
    }

    if (projects[currentIndex].data.video) {
      return (
        <video
          class="w-auto h-full max-h-full object-contain relative z-10 mix-blend-screen"
          style={{
            height: isLargeScreen ? `${h}px` : `${h / 2}px`,
            marginTop: `${projects[currentIndex]?.data?.offset?.[1] ?? 0}px`,
            marginLeft: `${projects[currentIndex]?.data?.offset?.[0] ?? 0}px`,
          }}
          src={`${import.meta.env.BASE_URL}${projects[currentIndex].data.video.replace("./", "/")}`}
          ref={(el) => {
            if (el) el.playbackRate = 0.9;
          }}
          autoplay
          muted
          loop
          playsinline
        />
      );
    }

    // ... existing code ...

    if (projects[currentIndex].data.videos) {
      return (
        <video
          class="w-auto h-full max-h-full relative z-10 mix-blend-screen"
          style={{
            height: isLargeScreen ? `${h}px` : `${h / 2}px`,
            marginTop: `${projects[currentIndex]?.data?.offset?.[1] ?? 0}px`,
            marginLeft: `${projects[currentIndex]?.data?.offset?.[0] ?? 0}px`,
            width: "125%", // Make the video 20% wider
            scale: "1.8",
            transformOrigin: "center center",
          }}
          autoplay
          loop
          muted
          playsinline
          key={currentIndex}
        >
          <source
            src={projects[currentIndex].data.videos[0]}
            type="video/webm"
          />
          <source
            src={projects[currentIndex].data.videos[1]}
            type="video/quicktime"
          />
        </video>
      );
    }
  };

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
        class={`w-auto flex justify-center items-center self-center relative grid-in-main md:grid-in-main-center`}
      >
        {renderFeaturedMedia()}
        <img
          class="w-auto h-[300px] lg:h-[500px] object-contain absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          src={bracketImage.src}
          alt="bracket"
        />
        {projects[currentIndex].data.spotlight === SPOTLIGHTS.INVERSE && (
          <div
            class="absolute inset-0 bg-black opacity-40 backdrop-blur-md -z-10"
            style={{
              background:
                "radial-gradient(ellipse 60% 80% at center, black 60%, transparent 100%)",
              width: "100%",
              height: "100%",
              left: "0",
              top: "0",
              filter: "blur(40px)",
            }}
          />
        )}
        {projects[currentIndex]?.data?.spotlight === SPOTLIGHTS.NORMAL && (
          <div
            class="absolute inset-0 bg-white opacity-60 backdrop-blur-md -z-10"
            style={{
              background:
                "radial-gradient(ellipse 48% 30% at center, white 60%, transparent 100%)",
              width: "100%",
              height: "100%",
              left: "0",
              top: "0",
              filter: "blur(40px)",
            }}
          />
        )}
      </div>
    </>
  );
}
