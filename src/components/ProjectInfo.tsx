type Props = {};

const ProjectInfo = ({ project }: Props) => {
  return (
    <div class="uppercase self-center">
      <h2 class="text-foreground text-[10px]">{project.data.title}</h2>
      <p class="text-foreground text-[6px] whitespace-pre-line">
        {project.body}
      </p>
    </div>
  );
};
export default ProjectInfo;
