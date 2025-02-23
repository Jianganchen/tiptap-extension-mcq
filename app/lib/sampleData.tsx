export const sampleData = {
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: {
        textAlign: "left",
        level: 1,
      },
      content: [
        {
          type: "text",
          text: "Multiple Choice Question Editor Template",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        class: null,
        textAlign: "left",
      },
      content: [
        {
          type: "text",
          text: "Climate change is one of the most pressing challenges of our time. It refers to long-term shifts in temperature and weather patterns, primarily caused by human activities such as burning fossil fuels. These activities increase the concentration of greenhouse gases in the atmosphere, leading to global warming.",
        },
      ],
    },
    {
      type: "mcq",
      attrs: {
        MultipleChoices: {
          question:
            "Which of the following is the primary cause of climate change?",
          choices: [
            { id: 0, value: "Deforestation", selected: false },
            { id: 1, value: "Burning fossil fuels", selected: false },
            { id: 2, value: "Volcanic eruptions", selected: false },
            {
              id: 3,
              value: "Earth’s natural temperature cycles",
              selected: false,
            },
          ],
        },
        isEditable: true,
      },
    },
  ],
};
