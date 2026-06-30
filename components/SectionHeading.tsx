interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
}

/**
 * 渲染带协议编号的统一章节标题。
 */
export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
}: SectionHeadingProps): React.JSX.Element {
  return (
    <header className="section-heading">
      <div className="section-heading__protocol-line">
        <span className="section-heading__index">{index}</span>
        <span className="section-heading__eyebrow">{eyebrow}</span>
      </div>
      <h2 className="section-heading__title">{title}</h2>
      {description ? <p className="section-heading__description">{description}</p> : null}
    </header>
  );
}
