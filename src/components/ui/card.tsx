import { cn } from "@/lib/utils"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
}

export function Card({ className, children, ...props }: CardProps) {
    return (
        <div
            className={cn(
                "rounded-2xl border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md",
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
}

export function CardHeader({ className, children, ...props }: CardProps) {
    return <div className={cn("p-6 pb-2", className)} {...props}>{children}</div>
}

export function CardContent({ className, children, ...props }: CardProps) {
    return <div className={cn("p-6 pt-0", className)} {...props}>{children}</div>
}
