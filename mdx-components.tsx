import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: (props) => <h2 className="mt-10 text-2xl" {...props} />,
    h3: (props) => <h3 className="mt-8 text-xl" {...props} />,
    p: (props) => <p className="mt-4" {...props} />,
    ul: (props) => <ul className="mt-4 list-disc space-y-2 pl-5" {...props} />,
    ol: (props) => <ol className="mt-4 list-decimal space-y-2 pl-5" {...props} />,
    a: (props) => <a className="font-semibold text-terracotta" {...props} />,
    blockquote: (props) => (
      <blockquote className="mt-4 border-l-4 border-sage pl-4 italic text-muted" {...props} />
    ),
    ...components,
  };
}
