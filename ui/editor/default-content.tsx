const DEFAULT_EDITOR_CONTENT = {
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: { level: 2 },
      content: [{ type: "text", text: "Welcome to my project" }],
      style: {textAlign: "center"}
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "I've customized Novel using Next.js, TipTap, OpenAI and deployed with Vercel",
        }
      ],
    },
    {
      type: "heading",
      attrs: { level: 3 },
      content: [{ type: "text", text: "Main features:" }],
    },
    {
      type: "orderedList",
      attrs: { tight: true, start: 1 },
      content: [
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [{ type: "text", text: "Change Color of Text, text background, paper" }],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [{ type: "text", text: "Change the style, font, case, align of the text" }],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [{ type: "text", text: "Upload and resize image" }],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [{ type: "text", text: "Re-write text using AI and translate text" }],
            },
          ],
        }
      ],
    },
  ],
};

export default DEFAULT_EDITOR_CONTENT;
