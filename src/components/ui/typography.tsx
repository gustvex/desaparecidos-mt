import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const typographyVariants = cva("", {
    variants: {
        variant: {
            display:   "text-display font-bold leading-tight",
            h1:        "text-heading-1 font-bold leading-tight",
            h2:        "text-heading-2 font-semibold leading-snug",
            h3:        "text-heading-3 font-semibold leading-snug",
            "body-lg": "text-body-lg font-regular leading-relaxed",
            body:      "text-body leading-normal",
            label:     "text-label font-semibold leading-normal",
            small:     "text-small leading-normal",
            caption:   "text-caption leading-normal text-muted-foreground",
        },
        color: {
            default:  "text-foreground",
            muted:    "text-muted-foreground",
            primary:  "text-primary",
            inherit:  "",
        },
    },
    defaultVariants: {
        variant: "body",
        color: "default",
    },
});

type VariantTag = {
    display:   "h1";
    h1:        "h1";
    h2:        "h2";
    h3:        "h3";
    "body-lg": "p";
    body:      "p";
    label:     "span";
    small:     "small";
    caption:   "span";
};

const defaultTag: VariantTag = {
    display:   "h1",
    h1:        "h1",
    h2:        "h2",
    h3:        "h3",
    "body-lg": "p",
    body:      "p",
    label:     "span",
    small:     "small",
    caption:   "span",
};

type TypographyVariant = keyof VariantTag;

interface TypographyProps extends VariantProps<typeof typographyVariants> {
    as?: keyof JSX.IntrinsicElements;
    className?: string;
    children?: React.ReactNode;
    title?: string;
}

const Typography = ({
    as,
    variant = "body",
    color,
    className,
    children,
    ...props
}: TypographyProps) => {
    const Tag = (as ?? defaultTag[variant as TypographyVariant] ?? "p") as React.ElementType;

    return (
        <Tag
            className={cn(typographyVariants({ variant, color }), className)}
            {...props}
        >
            {children}
        </Tag>
    );
};

export { Typography, typographyVariants };
export type { TypographyProps };
