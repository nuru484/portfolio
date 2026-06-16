// src/components/dashboard/blog/RichTextEditor.tsx
'use client';

import { useCallback } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const tinyMceApiKey = process.env.NEXT_PUBLIC_TINYMCE_API_KEY;

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

interface FilePickerMeta {
  title?: string;
}

/**
 * TinyMCE rich-text editor. Inserted images are read as base64; the server
 * uploads them to Cloudinary on save (see utils/content-images).
 */
export function RichTextEditor({
  value,
  onChange,
  placeholder = 'Write your post…',
}: RichTextEditorProps) {
  const filePickerCallback = useCallback(
    (cb: (value: string, meta?: FilePickerMeta) => void) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = function () {
        const file = (this as HTMLInputElement).files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => cb(reader.result as string, { title: file.name });
        reader.readAsDataURL(file);
      };
      input.click();
    },
    [],
  );

  return (
    <div className="rounded-lg border border-input overflow-hidden">
      <Editor
        apiKey={tinyMceApiKey}
        value={value}
        onEditorChange={onChange}
        init={{
          height: 560,
          menubar: true,
          plugins: [
            'advlist',
            'autolink',
            'lists',
            'link',
            'image',
            'charmap',
            'preview',
            'anchor',
            'searchreplace',
            'visualblocks',
            'code',
            'codesample',
            'fullscreen',
            'insertdatetime',
            'media',
            'table',
            'help',
            'wordcount',
          ],
          toolbar:
            'undo redo | blocks | bold italic underline | bullist numlist | ' +
            'link image media codesample blockquote | alignleft aligncenter alignright | ' +
            'code preview fullscreen | removeformat help',
          placeholder,
          image_caption: true,
          image_advtab: true,
          file_picker_types: 'image',
          file_picker_callback: filePickerCallback,
          codesample_languages: [
            { text: 'TypeScript', value: 'typescript' },
            { text: 'JavaScript', value: 'javascript' },
            { text: 'JSON', value: 'json' },
            { text: 'Bash', value: 'bash' },
            { text: 'HTML/XML', value: 'markup' },
            { text: 'CSS', value: 'css' },
            { text: 'SQL', value: 'sql' },
            { text: 'Python', value: 'python' },
          ],
          content_style:
            'body{font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:16px;line-height:1.7;}',
        }}
      />
    </div>
  );
}
