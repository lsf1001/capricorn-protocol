/** GitHub 数据等待期间的仓库节点骨架。 */
export function RepositorySkeleton(): React.JSX.Element {
  return (
    <div className="repository-skeleton" aria-hidden="true">
      {Array.from({ length: 6 }, (_, index) => (
        <div key={index} className="repository-skeleton__card" data-testid="repository-skeleton-card">
          <span className="skeleton-line skeleton-line--short" />
          <span className="skeleton-line skeleton-line--title" />
          <span className="skeleton-line" />
          <span className="skeleton-line" />
          <span className="skeleton-line skeleton-line--medium" />
        </div>
      ))}
    </div>
  );
}
