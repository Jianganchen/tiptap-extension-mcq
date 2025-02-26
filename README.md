# TipTap-Multiple-Choice-Question-extension

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). This app implements a Multiple-choice question, built on top of [TipTap](https://github.com/ueberdosis/tiptap).

## Installation & Usage

### 1. Clone the repository

To begin, clone the repository from GitHub, using the following command:

```
git clone https://github.com/Jianganchen/tiptap-extension-mcq.git
```

### 2. Install the dependencies

To install the dependencies, run this:

```
npm install
```

### 3. Launch the server

run the development server:

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

### 1. Tool Bar

- You can toggle **Bold**, **Italic**, and three different levels of **headings** with the buttons on the tool bar.
- You can also toggle **Underline** and **Strikethrough** with the corresponding buttons.
- **Hover** on the buttons to see the tool tips, if you don't know what that button is for.
- You can also toggle a **MCQ** with the "CheckList" button.
- You can also toggle **edit mode** and **read-only** mode.
- Select some text and you can see their active effects. Try select the heading, you can see the h1 button is active!
- Select some text and hit the "Robot" button to see the result of the AI summary.

### 2. Multiple-Choice Question

- In edit mode, you can:
  - **Delete** existing choices
  - **Add** new choices
  - **Edit** the text on the choices
  - **Edit** the question
  - **Set** the correct answer for the question
- In read-only mode, you can:
  - Choose an answer and submit it
  - Once Submitted answer, you can see if your answer is correct
  - Now you can submit your answers multiple times, until you get it right!

### 3. AI Summarize

- You can see summarized text by clicking the **"Robot"** button

## Known issues

- ~~Choices in MCQComponents are taking length as keys, which might cause two choices having the same keys.~~
- ~~Toggle edit mode and read-only mode button isn't toggling the mode for the entire page.~~
- ~~The text summarization model used here is a free-tier model so the summarization is pretty bad.~~
