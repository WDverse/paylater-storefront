declare namespace React {
  namespace JSX {
    interface IntrinsicElements {
      'paylater-message': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & { amount: string; currency?: string },
        HTMLElement
      >;
    }
  }
}
