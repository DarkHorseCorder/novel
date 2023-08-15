const DEFAULT_EDITOR_CONTENT = {
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: { level: 2 },
      content: [{ type: "text", text: "GWCustom" }],
      style: {textAlign: "center"}
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "We build AI-powered workflows, custom web-applications, and provide full-service digital makeovers for SMEs in Europe.",
        }
      ],
    },
    {
      type: "heading",
      attrs: { level: 3 },
      content: [{ type: "text", text: "We build:" }],
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
              content: [{ type: "text", text: "Time saving automation tools" }],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [{ type: "text", text: "User-facing web-applications" }],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [{ type: "text", text: "A.I. integrated workflows" }],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [{ type: "text", text: "Amazing web-based software" }],
            },
          ],
        }
      ],
    },
    {
      type: "image",
      attrs: {
        src: "https://media.licdn.com/dms/image/D560BAQF2bdUryR3OEg/company-logo_200_200/0/1691582372782?e=1700092800&v=beta&t=N3cMSOWDkFmUsIygctqCNYIB4IiLeBXA67nRKuBQLLQ",
        alt: "banner.png",
        title: "banner.png",
      },
    },
  ],
};

export default DEFAULT_EDITOR_CONTENT;
