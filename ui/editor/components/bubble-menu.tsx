import { BubbleMenu, BubbleMenuProps } from "@tiptap/react";
import { FC, useState } from "react";
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  StrikethroughIcon,
  CodeIcon,
} from "lucide-react";
import { Tooltip as ReactTooltip } from "react-tooltip";

import { NodeSelector } from "./node-selector";
import { ColorSelector } from "./color-selector";
import { LinkSelector } from "./link-selector";
import { AiReWriter } from "./ai-rewriter";
import { TranslateSelector } from "./translate-selector";
import { AlignSelector } from "./align-selector";
import { CaseSensitiveSelector } from "./case-sensitive-selector";
import { cn } from "@/lib/utils";

export interface BubbleMenuItem {
  name: string;
  isActive: () => boolean;
  command: () => void;
  icon: typeof BoldIcon;
  toottipMsg: string;
}

type EditorBubbleMenuProps = Omit<BubbleMenuProps, "children">;

export const EditorBubbleMenu: FC<EditorBubbleMenuProps> = (props) => {
  const items: BubbleMenuItem[] = [
    {
      name: "bold",
      isActive: () => props.editor.isActive("bold"),
      command: () => props.editor.chain().focus().toggleBold().run(),
      icon: BoldIcon,
      toottipMsg: "Ctrl + B",
    },
    {
      name: "italic",
      isActive: () => props.editor.isActive("italic"),
      command: () => props.editor.chain().focus().toggleItalic().run(),
      icon: ItalicIcon,
      toottipMsg: "Ctrl + I",
    },
    {
      name: "underline",
      isActive: () => props.editor.isActive("underline"),
      command: () => props.editor.chain().focus().toggleUnderline().run(),
      icon: UnderlineIcon,
      toottipMsg: "Ctrl + U",
    },
    {
      name: "strike",
      isActive: () => props.editor.isActive("strike"),
      command: () => props.editor.chain().focus().toggleStrike().run(),
      icon: StrikethroughIcon,
      toottipMsg: "Ctrl + Shift + X",
    },
    {
      name: "code",
      isActive: () => props.editor.isActive("code"),
      command: () => props.editor.chain().focus().toggleCode().run(),
      icon: CodeIcon,
      toottipMsg: "Ctrl + E",
    },
  ];

  const bubbleMenuProps: EditorBubbleMenuProps = {
    ...props,
    shouldShow: ({ editor }) => {
      // don't show if image is selected
      if (editor.isActive("image")) {
        return false;
      }
      return editor.view.state.selection.content().size > 0;
    },
    tippyOptions: {
      moveTransition: "transform 0.15s ease-out",
      onHidden: () => {
        setIsNodeSelectorOpen(false);
        setIsColorSelectorOpen(false);
        setIsLinkSelectorOpen(false);
        setTranslateSeletorOpen(false);
        setAlignSelectorOpen(false);
        setCaseSensitiveOpen(false);
      },
    },
  };

  const [isNodeSelectorOpen, setIsNodeSelectorOpen] = useState(false);
  const [isColorSelectorOpen, setIsColorSelectorOpen] = useState(false);
  const [isLinkSelectorOpen, setIsLinkSelectorOpen] = useState(false);
  const [isTranslateSelectorOpen, setTranslateSeletorOpen] = useState(false);
  const [isAlignSelectorOpen, setAlignSelectorOpen] = useState(false);
  const [isCaseSensitiveOpen, setCaseSensitiveOpen] = useState(false);

  return (
    <BubbleMenu
      {...bubbleMenuProps}
      className="flex w-fit divide-x divide-stone-200 rounded border border-stone-200 bg-white shadow-xl"
    >
      <NodeSelector
        editor={props.editor}
        isOpen={isNodeSelectorOpen}
        setIsOpen={() => {
          setIsNodeSelectorOpen(!isNodeSelectorOpen);
          setIsColorSelectorOpen(false);
          setIsLinkSelectorOpen(false);
          setTranslateSeletorOpen(false);
          setAlignSelectorOpen(false);
          setCaseSensitiveOpen(false);
        }}
      />
      <LinkSelector
        editor={props.editor}
        isOpen={isLinkSelectorOpen}
        setIsOpen={() => {
          setIsLinkSelectorOpen(!isLinkSelectorOpen);
          setIsColorSelectorOpen(false);
          setIsNodeSelectorOpen(false);
          setTranslateSeletorOpen(false);
          setAlignSelectorOpen(false);
          setCaseSensitiveOpen(false);
        }}
      />
      <div className="flex">
        {items.map((item, index) => (
            <button
              key={index}
              onClick={item.command}
              className="p-2 text-stone-600 hover:bg-stone-100 active:bg-stone-200"
              data-tooltip-id={item.name}
            >
              <item.icon
                className={cn("h-4 w-4", {
                  "text-blue-500": item.isActive(),
                })}
              />
              <ReactTooltip
              id={item.name}
              place="bottom"
              content={item.toottipMsg}
            />
            </button>
        ))}
      </div>
      <ColorSelector
        editor={props.editor}
        isOpen={isColorSelectorOpen}
        setIsOpen={() => {
          setIsColorSelectorOpen(!isColorSelectorOpen);
          setIsNodeSelectorOpen(false);
          setIsLinkSelectorOpen(false);
          setTranslateSeletorOpen(false);
          setAlignSelectorOpen(false);
          setCaseSensitiveOpen(false);
        }}
      />
      <AlignSelector 
        editor={props.editor}
        isOpen={isAlignSelectorOpen}
        setIsOpen={() => {
          setAlignSelectorOpen(!isAlignSelectorOpen);
          setIsColorSelectorOpen(false);
          setIsNodeSelectorOpen(false);
          setIsLinkSelectorOpen(false);
          setTranslateSeletorOpen(false);
          setCaseSensitiveOpen(false);
        }}
      />
      <CaseSensitiveSelector
        editor={props.editor}
        isOpen={isCaseSensitiveOpen}
        setIsOpen={() => {
          setCaseSensitiveOpen(!isCaseSensitiveOpen);
          setIsColorSelectorOpen(false);
          setIsNodeSelectorOpen(false);
          setIsLinkSelectorOpen(false);
          setTranslateSeletorOpen(false);
          setAlignSelectorOpen(false);
        }}
      />
      <AiReWriter 
        editor={props.editor}
      />
      <TranslateSelector 
        editor={props.editor}
        isOpen={isTranslateSelectorOpen}
        setIsOpen={() => {
          setTranslateSeletorOpen(!isTranslateSelectorOpen);
          setIsColorSelectorOpen(false);
          setIsNodeSelectorOpen(false);
          setIsLinkSelectorOpen(false);
          setAlignSelectorOpen(false);
          setCaseSensitiveOpen(false);
        }}
      />
    </BubbleMenu>
  );
};
