"use client";

import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => <div className="h-44 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center text-xs text-slate-400">Loading editor...</div>,
});

interface Props {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "code-block"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "link",
  "code-block",
];

export default function BlogRichEditor({ value, onChange, placeholder }: Props) {
  return (
    <div className="rich-editor-wrapper text-slate-900">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        placeholder={placeholder || "Write your blog post content here..."}
        modules={modules}
        formats={formats}
        className="bg-white rounded-xl overflow-hidden border border-slate-200"
      />
      <style jsx global>{`
        .rich-editor-wrapper .ql-toolbar {
          border-top-left-radius: 0.75rem;
          border-top-right-radius: 0.75rem;
          border-color: #e2e8f0;
          background: #f8fafc;
        }
        .rich-editor-wrapper .ql-container {
          border-bottom-left-radius: 0.75rem;
          border-bottom-right-radius: 0.75rem;
          border-color: #e2e8f0;
          min-height: 220px;
          font-family: inherit;
          font-size: 0.875rem;
        }
        .rich-editor-wrapper .ql-editor {
          min-height: 220px;
        }
      `}</style>
    </div>
  );
}
