import { Editor } from "@tiptap/core";
import { 
    CaseSensitive,
    ChevronDown,
    Check
} from "lucide-react";
import { Dispatch, FC, SetStateAction } from "react";

interface CaseSensitiveSelectorProps {
    editor: Editor;
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>
}

interface CaseSensitiveSelectorItem {
    name: String;
    command: () => void;
}
export const CaseSensitiveSelector: FC<CaseSensitiveSelectorProps> = ({
    editor,
    isOpen,
    setIsOpen
}) => {
    const items: CaseSensitiveSelectorItem[] = [
        {
            name: "lowercase",
            command: ()=>{
                changeSensitive(1)
            },
        },
        {
            name: "UPPERCASE",
            command: ()=>{
                changeSensitive(2)
            },
        },
        {
            name: "Capitalize Each Word",
            command: ()=>{
                changeSensitive(3)
            },
        },
        {
            name: "tOGGLE cASE",
            command: ()=>{
                console.log("-------------")
                changeSensitive(4)
            },
        }
    ]

    const changeSensitive = (num: Number) => {
        const { from, to } = editor.state.selection;
        const selectedText = editor.state.doc.textBetween(from, to);
        editor.chain().deleteRange({from:from , to:to}).run();
        switch (num) {
            case 1:
                editor.chain().insertContent(selectedText.toLowerCase()).run();
                break;
            case 2:
                editor.chain().insertContent(selectedText.toUpperCase()).run();
                break;
            case 3:
                editor.chain().insertContent(selectedText.replace(/\b\w/g, (char) => char.toUpperCase())).run();
                break;
            case 4:
                editor.chain().insertContent(selectedText.replace(/./g, char => char === char.toLowerCase() ? char.toUpperCase() : char.toLowerCase())).run()
                break;
            default:
                break;
        }
    }
    return (
        <div className="relative h-full">
            <button
                className="flex h-full items-center gap-1 whitespace-nowrap p-2 text-sm font-medium text-stone-600 hover:bg-stone-100 active:bg-stone-200"
                onClick={() => setIsOpen(!isOpen)}
            >
                <CaseSensitive className="h-4 w-4" />
                <ChevronDown className="h-4 w-4" />
            </button>
            {isOpen && (
                <section className="fixed top-full z-[99999] mt-1 flex w-48 flex-col overflow-hidden rounded border border-stone-200 bg-white p-1 shadow-xl animate-in fade-in slide-in-from-top-1">
                {items.map(({name, command}, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            command()
                            setIsOpen(false);
                        }}
                        className="flex items-center justify-between rounded-sm px-2 py-1 text-sm text-stone-600 hover:bg-stone-100"
                    >
                        <div className="flex items-center space-x-2">
                            <span>{name}</span>
                        </div>
                    </button>
                ))}
                </section>
            )}
        </div>
    )
}
