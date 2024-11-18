type Props = {};

// @ts-ignore
const ProjectInfo = ({ project }: Props) => {
  return (
    <div class="uppercase self-center md:grid-in-main-right pr-16">
      <h2 class="font-din-medium text-foreground lg:text-[16px] lg:tracking-[7px] mb-3">
        {project.data.title}
      </h2>
      <p class="font-helvetica-neue text-foreground tracking-[3px] leading-normal text-[6px] whitespace-pre-line max-w-[180px] lg:max-w-[500px] lg:text-[11px]">
        {project.body}
      </p>
    </div>
  );
};
export default ProjectInfo;
