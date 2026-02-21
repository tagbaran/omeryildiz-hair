"use client";

import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

interface OpenChatButtonProps {
    text: string;
}

export function OpenChatButton({ text }: OpenChatButtonProps) {
    const handleClick = () => {
        window.dispatchEvent(new Event('open-chat-widget'));
    };

    return (
        <Button
            onClick={handleClick}
            variant="secondary"
            className="rounded-full gap-2 font-semibold shadow-sm hover:shadow-md transition-all hover:scale-105"
        >
            <MessageCircle className="h-4 w-4" />
            {text}
        </Button>
    );
}
