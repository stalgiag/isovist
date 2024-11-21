import { useMemo } from "preact/hooks";

type Props = {};

// @ts-ignore
const ProjectInfo = ({ project }: Props) => {
  const title = useMemo(() => {
    if (project.data.title.includes("<")) {
      const split = project.data.title.split("<");
      return (
        <>
          {split[0]}
          <span class="font-helvetica-neue">&lt;</span>
          {split[1]}
        </>
      );
    }
    return project.data.title;
  }, [project]);

  return (
    <div class="uppercase lg:mt-0 self-center lg:grid-in-main-right lg:pr-8 h-auto lg:h-auto relative max-w-full pr-2 overflow-visible">
      <h2 class="font-din-medium text-foreground text-[10px] tracking-[2px] md:text-[14px] md:tracking-[4px] lg:text-[16px] lg:tracking-[7px] mb-1 lg:mb-3">
        {title}
      </h2>
      <p class="font-helvetica-neue text-foreground tracking-[3px] leading-normal text-[6px] md:text-[7px] whitespace-pre-line max-w-full md:max-w-[400px] lg:max-w-[500px] lg:text-[11px]">
        {project.body}
      </p>
    </div>
  );
};
export default ProjectInfo;
