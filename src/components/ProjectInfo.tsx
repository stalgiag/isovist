type Props = {};

// @ts-ignore
const ProjectInfo = ({ project }: Props) => {
  return (
    <div class="uppercase self-center md:grid-in-main-right">
      <h2 class="text-foreground text-[10px] lg:text-xl">
        {project.data.title}
      </h2>
      <p class="text-foreground text-[6px] whitespace-pre-line max-w-[180px] lg:max-w-[400px] lg:text-sm">
        {project.body}
      </p>
    </div>
  );
};
export default ProjectInfo;
