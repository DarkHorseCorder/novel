import { Editor } from "@tiptap/core";
import { Dispatch, FC, SetStateAction } from "react";
import { BubbleMenuItem } from "./bubble-menu";
import {
    AlignLeft,
    AlignCenter,
    AlignRight,
    AlignJustify,
    ChevronDown,
    Check
} from "lucide-react";
import { Tooltip as ReactTooltip } from "react-tooltip";

interface AlignSelectorProps {
    editor: Editor;
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const AlignSelector: FC<AlignSelectorProps> = ({
    editor,
    isOpen,
    setIsOpen,
}) => {
    const items: BubbleMenuItem[] = [
        {
            name: "Align Left",
            icon: AlignLeft,
            command: () => {
                editor.chain().focus().setTextAlign('left').run()
            },
            isActive: () =>
            editor.isActive({textAlign : 'left'}),
            toottipMsg: "Ctrl + Shift + L"
        },
        {
            name: "Align Right",
            icon: AlignRight,
            command: () => {
                editor.chain().focus().setTextAlign('right').run()
            },
            isActive: () =>
            editor.isActive({textAlign : 'right'}),
            toottipMsg: "Ctrl + Shift + R"
        },
        {
            name: "Align Center",
            icon: AlignCenter,
            command: () => {
                editor.chain().focus().setTextAlign('center').run()
            },
            isActive: () =>
            editor.isActive({textAlign : 'center'}),
            toottipMsg: "Ctrl + Shift + E"
        },
        {
            name: "Align Justify",
            icon: AlignJustify,
            command: () => {
                editor.chain().focus().setTextAlign('justify').run()
            },
            isActive: () =>
            editor.isActive({textAlign : 'justify'}),
            toottipMsg: "Ctrl + Shift + J"
        }
    ];

    const activeItem = items.filter((item) => item.isActive()).pop() ?? {
        name: "Multiple",
        icon: AlignLeft
    };

    return(
        <div className="relative h-full">
            <button
                className="flex h-full items-center gap-1 whitespace-nowrap p-2 text-sm font-medium text-stone-600 hover:bg-stone-100 active:bg-stone-200"
                onClick={() => setIsOpen(!isOpen)}
            >
                {activeItem && <activeItem.icon className="h-3 w-3" />}
                <ChevronDown className="h-4 w-4" />
            </button>

            {isOpen && (
                <section className="fixed top-full z-[99999] mt-1 flex w-48 flex-col overflow-hidden rounded border border-stone-200 bg-white p-1 shadow-xl animate-in fade-in slide-in-from-top-1">
                {items.map((item, index) => (
                    <button
                    key={index}
                    onClick={() => {
                        item.command();
                        setIsOpen(false);
                    }}
                    className="flex items-center justify-between rounded-sm px-2 py-1 text-sm text-stone-600 hover:bg-stone-100"
                    data-tooltip-id={item.name}
                    >
                    <div className="flex items-center space-x-2">
                        <div className="rounded-sm border border-stone-200 p-1">
                        <item.icon className="h-3 w-3" />
                        </div>
                        <span>{item.name}</span>
                    </div>
                    {activeItem.name === item.name && <Check className="h-4 w-4" />}
                    <ReactTooltip
                        id={item.name}
                        place="bottom"
                        content={item.toottipMsg}
                    />
                    </button>
                ))}
                </section>
            )}
        </div>
    )
}