import { Editor } from "@tiptap/core";
import {
  Check,
  ChevronDown,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  TextQuote,
  ListOrdered,
  TextIcon,
  Code,
  CheckSquare,
} from "lucide-react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { Dispatch, FC, SetStateAction } from "react";

import { BubbleMenuItem } from "./bubble-menu";

interface NodeSelectorProps {
  editor: Editor;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const NodeSelector: FC<NodeSelectorProps> = ({
  editor,
  isOpen,
  setIsOpen,
}) => {
  const items: BubbleMenuItem[] = [
    {
      name: "Text",
      icon: TextIcon,
      command: () =>
        editor.chain().focus().toggleNode("paragraph", "paragraph").run(),
      // I feel like there has to be a more efficient way to do this – feel free to PR if you know how!
      isActive: () =>
        editor.isActive("paragraph") &&
        !editor.isActive("bulletList") &&
        !editor.isActive("orderedList"),
      toottipMsg: "Ctrl + Alt + 0"
    },
    {
      name: "Heading 1",
      icon: Heading1,
      command: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: () => editor.isActive("heading", { level: 1 }),
      toottipMsg: "Ctrl + Alt + 1"
    },
    {
      name: "Heading 2",
      icon: Heading2,
      command: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: () => editor.isActive("heading", { level: 2 }),
      toottipMsg: "Ctrl + Alt + 2"
    },
    {
      name: "Heading 3",
      icon: Heading3,
      command: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: () => editor.isActive("heading", { level: 3 }),
      toottipMsg: "Ctrl + Alt + 3"
    },
    {
      name: "Heading 4",
      icon: Heading4,
      command: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
      isActive: () => editor.isActive("heading", { level: 4 }),
      toottipMsg: "Ctrl + Alt + 4"
    },
    {
      name: "Heading 5",
      icon: Heading5,
      command: () => editor.chain().focus().toggleHeading({ level: 5 }).run(),
      isActive: () => editor.isActive("heading", { level: 5 }),
      toottipMsg: "Ctrl + Alt + 5"
    },
    {
      name: "Heading 6",
      icon: Heading6,
      command: () => editor.chain().focus().toggleHeading({ level: 6 }).run(),
      isActive: () => editor.isActive("heading", { level: 6 }),
      toottipMsg: "Ctrl + Alt + 6"
    },
    {
      name: "Numbered List",
      icon: ListOrdered,
      command: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: () => editor.isActive("orderedList"),
      toottipMsg: "Ctrl + Shift + 7"
    },
    {
      name: "Bullet List",
      icon: ListOrdered,
      command: () => editor.chain().focus().toggleBulletList().run(),
      isActive: () => editor.isActive("bulletList"),
      toottipMsg: "Ctrl + Shift + 8"
    },
    {
      name: "To-do List",
      icon: CheckSquare,
      command: () => editor.chain().focus().toggleTaskList().run(),
      isActive: () => editor.isActive("taskItem"),
      toottipMsg: "Ctrl + Shift + 9"
    },
    {
      name: "Quote",
      icon: TextQuote,
      command: () =>
        editor
          .chain()
          .focus()
          .toggleNode("paragraph", "paragraph")
          .toggleBlockquote()
          .run(),
      isActive: () => editor.isActive("blockquote"),
      toottipMsg: "Ctrl + Shift + B"
    },
    {
      name: "Code",
      icon: Code,
      command: () => editor.chain().focus().toggleCodeBlock().run(),
      isActive: () => editor.isActive("codeBlock"),
      toottipMsg: "Ctrl + Alt + C"
    },
  ];

  const activeItem = items.filter((item) => item.isActive()).pop() ?? {
    name: "Multiple",
  };

  return (
    <div className="relative h-full">
      <button
        className="flex h-full items-center gap-1 whitespace-nowrap p-2 text-sm font-medium text-stone-600 hover:bg-stone-100 active:bg-stone-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{activeItem?.name}</span>
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
  );
};
