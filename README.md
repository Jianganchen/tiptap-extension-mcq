This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). This app implements a Multiple-choice question, built on top of [TipTap](https://github.com/ueberdosis/tiptap).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Functionalities

- Move the caret onto the multiple-choice question and click the "eye" button to switch between edit mode and read-only mode.
- In edit mode, you can:
  - Delete existing choices
  - Add new choices
  - Edit the text on the choices
  - Edit the question
- In read-only mode, you can:
  - Choose an answer and submit it
- Move the caret to some regular text and click the "CheckList" button to toggle between regular text and a mutiple-choice question

## Known issues

- Choices in MCQComponents are taking length as keys, which might cause two choices having the same keys.
- Toggle edit mode and read-only mode button isn't toggling the mode for the entire page.
