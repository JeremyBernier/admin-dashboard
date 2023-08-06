import Image from "next/image";
import SqlEditor from "src/components/SqlEditor";
import Table from "src/components/Table";
import TextEditor from "src/components/TextEditor/TextEditorWrapper";

export default function Home() {
  return (
    <main>
      <div className="grid grid-cols-4 gap-8">
        <div className="bg-slate-800 rounded h-32 py-4 px-6">X Tables</div>
        <div className="bg-slate-800 rounded h-32 py-4 px-6">Box 1</div>
        <div className="bg-slate-800 rounded h-32 py-4 px-6">Box 1</div>
        <div className="bg-slate-800 rounded h-32 py-4 px-6">Box 1</div>
      </div>
      <SqlEditor />
      {/* <TextEditor id="test-thing" /> */}
      {/* <TextEditor id="test-thing2" /> */}
      {/* <div>Text content goes here</div>
      <div className="mb-12">Text content goes here</div>
      <button className="btn mb-6">Add Quiz</button>
      <Table
        headings={[
          "Heading 1",
          "Heading 2",
          "Heading 3",
          "Heading 4",
          "Heading 5",
        ]}
        rows={[
          ["Data 1", "Column 2", "Column 3", "Column 4", "Column 5"],
          ["Data 1", "Column 2", "Column 3", "Column 4", "Column 5"],
          ["Data 1", "Column 2", "Column 3", "Column 4", "Column 5"],
          ["Data 1", "Column 2", "Column 3", "Column 4", "Column 5"],
          ["Data 1", "Column 2", "Column 3", "Column 4", "Column 5"],
          ["Data 1", "Column 2", "Column 3", "Column 4", "Column 5"],
          ["Data 1", "Column 2", "Column 3", "Column 4", "Column 5"],
          ["Data 1", "Column 2", "Column 3", "Column 4", "Column 5"],
          ["Data 1", "Column 2", "Column 3", "Column 4", "Column 5"],
          ["Data 1", "Column 2", "Column 3", "Column 4", "Column 5"],
          ["Data 1", "Column 2", "Column 3", "Column 4", "Column 5"],
          ["Data 1", "Column 2", "Column 3", "Column 4", "Column 5"],
          ["Data 1", "Column 2", "Column 3", "Column 4", "Column 5"],
          ["Data 1", "Column 2", "Column 3", "Column 4", "Column 5"],
        ]}
      />
      <div className="mb-48">Text content goes here</div>
      <div className="mb-48">Text content goes here</div>
      <div className="mb-48">Text content goes here</div>
      <div className="mb-48">Text content goes here</div>
      <div className="mb-48">Text content goes here</div>
      <div className="mb-48">Text content goes here</div>
      <div className="mb-48">Text content goes here</div> */}
    </main>
  );
}
