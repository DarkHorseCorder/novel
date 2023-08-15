import { Editor } from "@tiptap/core";
import { Dispatch, FC, SetStateAction } from "react";
import { Languages, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import va from "@vercel/analytics";

interface TranslateMenuItem {
    language: string,
    langcode: string
}

interface TranslateSelectorProps {
    editor: Editor;
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}
const LANGUAGES: TranslateMenuItem[] = [
    {
        language: "English",
        langcode: "en"
    },
    {
        language: "Japanese",
        langcode: "ja"
    },
    {
        language: "日本語",
        langcode: "ja",
    },
    {
        language: "Español",
        langcode: "es",
    },
    {
        language: "Français",
        langcode: "fr",
    },
    {
        language: "Deutsch",
        langcode: "de",
    },
    {
        language: "Italiano",
        langcode: "it",
    },
    {
        language: "中文",
        langcode: "zh",
    },
    {
        language: "Русский",
        langcode: "ru",
    },
    {
        language: "Português",
        langcode: "pt",
    },
    {
        language: "Nederlands",
        langcode: "nl",
    },
    {
        language: "العربية",
        langcode: "ar",
    },
    {
        language: "Türkçe",
        langcode: "tr",
    },
    {
        language: "ไทย",
        langcode: "th",
    },
    {
        language: "Polski",
        langcode: "pl",
    },
    {
        language: "Svenska",
        langcode: "sv",
    },
    {
        language: "Dansk",
        langcode: "da",
    },
];

export const TranslateSelector: FC<TranslateSelectorProps> = ({
    editor,
    isOpen,
    setIsOpen
}) => {

    const Translate = async (langcode) => {
        const { from, to } = editor.state.selection;
        const selectedText = editor.state.doc.textBetween(from, to);
        editor.chain().deleteRange({from:from , to:to}).run();
        return new Promise((resolve, reject) => {
            toast.promise(
                fetch("/api/translate", {
                    method: "POST",
                    body: JSON.stringify({
                        text: selectedText,
                        langcode: langcode,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }).then(async (res) => {
                    if (res.status === 200) {
                        return await res.json();
                    }
                    else throw new Error("Translation failed");
                }).catch(error => {
                    throw error;
                }),
                {
                    loading: "Translating...",
                    success: (translatedContent) => {
                        editor.chain().insertContent(translatedContent).run();
                        return "Translation successful.";
                    },
                    error: (error) => {
                        editor.chain().insertContent(selectedText).run();
                        toast.error(error.message);
                        va.track(error.message);
                        return "Translation failed.";
                    },
                }
            )
        })
    }

    return (
        <div>
            <button
                className="flex h-full items-center gap-1 p-2 text-sm font-medium text-stone-600 hover:bg-stone-100 active:bg-stone-200"
                onClick={() => setIsOpen(!isOpen)}
            >
                <Languages className="h-4 w-4" />
                <ChevronDown className="h-4 w-4" />
            </button>
            {isOpen && (
                <section className="fixed top-full z-[99999] mt-1 flex w-48 flex-col overflow-hidden rounded border border-stone-200 bg-white p-1 shadow-xl animate-in fade-in slide-in-from-top-1">
                    {LANGUAGES.map(({ language, langcode }, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                Translate(langcode)
                            }}
                            className="flex items-center justify-between rounded-sm px-2 py-1 text-sm text-stone-600 hover:bg-stone-100"
                        >
                        <div className="flex items-center space-x-2">
                            <span>{language}</span>
                        </div>
                        
                        </button>
                    ))}
                </section>
            )}
        </div>
    )
}