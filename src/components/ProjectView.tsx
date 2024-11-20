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

  const [screenSize, setScreenSize] = useState<"mobile" | "tablet" | "desktop">(
    null,
  );

  useEffect(() => {
    const getScreenSize = () => {
      const width = window.innerWidth;
      if (width <= 768) return "mobile";
      if (width <= 1280) return "tablet";
      return "desktop";
    };

    // Set initial value
    setScreenSize(getScreenSize());

    // Add resize listener
    const handleResize = () => {
      setScreenSize(getScreenSize());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (screenSize === null) {
    return null;
  }

  const getHeightForScreen = () => {
    const baseHeight = 600;
    console.log(screenSize);
    switch (screenSize) {
      case "mobile":
        return baseHeight * getScaleForScreen() * 0.65;
      case "tablet":
        return baseHeight * getScaleForScreen() * 0.75;
      case "desktop":
        return baseHeight * getScaleForScreen() * 1;
    }
  };

  const getScaleForScreen = () => {
    switch (screenSize) {
      case "mobile":
        return (
          projects[currentIndex].data.mobileScale ||
          projects[currentIndex].data.scale ||
          1
        );
      case "tablet":
      case "desktop":
        return projects[currentIndex].data.scale || 1;
    }
  };

  const getOffsetForScreen = () => {
    switch (screenSize) {
      case "mobile":
        return projects[currentIndex].data.mobileOffset || [0, 0];
      case "tablet":
      case "desktop":
        return projects[currentIndex].data.offset || [0, 0];
    }
  };

  const renderFeaturedMedia = () => {
    if (projects[currentIndex].data.image) {
      return (
        <img
          class="w-auto h-[130px] md:h-[180px] lg:h-[220px]  object-contain absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
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
            height: `${getHeightForScreen()}px`,
            marginTop: `${getOffsetForScreen()?.[1] ?? 0}px`,
            marginLeft: `${getOffsetForScreen()?.[0] ?? 0}px`,
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

    if (projects[currentIndex].data.videos) {
      return (
        <video
          class="w-auto h-full max-h-full relative z-10 pointer-events-none"
          style={{
            height: `${getHeightForScreen()}px`,
            marginTop: `${getOffsetForScreen()?.[1] ?? 0}px`,
            marginLeft: `${getOffsetForScreen()?.[0] ?? 0}px`,
            scale: screenSize === "desktop" ? "1.6" : "1",
            transformOrigin: "center center",
          }}
          autoplay
          loop
          muted
          playsinline
          key={currentIndex}
        >
          <source
            src={`${import.meta.env.BASE_URL}${projects[currentIndex].data.videos[0].replace("./", "/")}`}
            type="video/webm"
          />
          <source
            src={`${import.meta.env.BASE_URL}${projects[currentIndex].data.videos[1].replace("./", "/")}`}
            type="video/quicktime"
          />
        </video>
      );
    }
  };

  return (
    <>
      {/* @ts-ignore */}
      <ProjectInfo project={projects[currentIndex]} />
      <div
        style={{
          height: `${getHeightForScreen()}px`,
        }}
        class={`w-auto flex justify-center items-center self-center relative grid-in-main lg:grid-in-main-center pointer-events-none`}
      >
        {renderFeaturedMedia()}
        <img
          class="w-auto h-[300px] md:h-[400px] lg:h-[500px] object-contain absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          src={bracketImage.src}
          alt="bracket"
        />
        {projects[currentIndex].data.spotlight === SPOTLIGHTS.INVERSE && (
          <div
            class="absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(ellipse 60% 80% at center, rgba(0, 0, 0, 0.4) 60%, transparent 100%)",
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
            class="absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(ellipse 48% 30% at center, rgba(255, 255, 255, 0.6) 60%, transparent 100%)",
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
