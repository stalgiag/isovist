type Props = {};

// @ts-ignore
const ProjectInfo = ({ project }: Props) => {
  return (
    <div class="uppercase self-start mt-4 lg:mt-0 lg:self-center lg:grid-in-main-right lg:pr-16 h-[40px] md:h-[100px] lg:h-auto relative max-w-full pr-2">
      <h2 class="font-din-medium text-foreground text-[10px] tracking-[2px] md:text-[14px] md:tracking-[4px] lg:text-[16px] lg:tracking-[7px] mb-1 lg:mb-3">
        {project.data.title}
      </h2>
      <p class="font-helvetica-neue text-foreground tracking-[3px] leading-normal text-[6px] md:text-[7px] whitespace-pre-line max-w-full md:max-w-[400px] lg:max-w-[500px] lg:text-[11px]">
        {project.body}
      </p>
    </div>
  );
};
export default ProjectInfo;
