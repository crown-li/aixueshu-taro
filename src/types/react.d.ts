declare namespace React {
  type ReactNode =
    | string
    | number
    | boolean
    | null
    | undefined
    | React.ReactElement
    | React.ReactFragment
    | React.ReactPortal
    | Iterable<React.ReactNode>;

  interface ReactElement<
    P = any,
    T extends string | JSXElementConstructor<any> =
      | string
      | JSXElementConstructor<any>
  > {
    type: T;
    props: P;
    key: Key | null;
  }

  type ReactFragment = Iterable<ReactNode>;
  type ReactPortal = any;
  type Key = string | number;
}

interface ButtonProps {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}
