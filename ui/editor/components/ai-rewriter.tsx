import { Editor } from "@tiptap/core";
import { FC, useState } from "react";
import { PenLine } from "lucide-react";
import { useCompletion } from "ai/react";
import { toast } from "sonner";
import va from "@vercel/analytics";

interface AiReWriterProps {
    editor: Editor;
}
export const AiReWriter:FC<AiReWriterProps> = ({
    editor
}) => {
    const Ai_rewrite = () => {
        const { from, to } = editor.state.selection;
        const selectedText = editor.state.doc.textBetween(from, to);
        const newContent = "I'm going to write this part";
        editor.chain()
        .deleteRange({from:from , to:to})
        // .insertContent(newContent)
        .run();
        complete(selectedText,);
    }

    const { complete, completion, isLoading, stop } = useCompletion({
        id: "novel",
        api: "/api/generate",
        onFinish: (_prompt, completion) => {
          editor?.commands.setTextSelection({
            from: editor.state.selection.from - completion.length,
            to: editor.state.selection.from,
          });
        },
        onError: (err) => {
          toast.error(err.message);
          if (err.message === "You have reached your request limit for the day.") {
            va.track("Rate Limit Reached");
          }
        },
      });

    return (
        <button
            onClick={() => Ai_rewrite()}
            className="flex h-full items-center gap-1 whitespace-nowrap p-2 text-sm font-medium text-stone-600 hover:bg-stone-100 active:bg-stone-200"
        >
            <PenLine
              className="h-4 w-4"
            />
            <span>ReWrite</span>
        </button>
    )
} 