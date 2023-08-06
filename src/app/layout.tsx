import Layout from "src/components/Layout";
import "./globals.css";
import "../styles/layout.css";
import "../components/TextEditor/styles.css";
import "../components/TextEditor/plugins/FloatingLinkEditorPlugin/FloatingLinkEditorPlugin.css";
import "../components/TextEditor/ui/LinkPreview/LinkPreview.css";
import "../components/TextEditor/ui/ImageNode/ImageNode.css";
import "../components/TextEditor/ui/ContentEditable/ContentEditable.css";
import "../components/TextEditor/ui/Input.css";
import "../components/TextEditor/ui/Button/Button.css";
import "../components/TextEditor/ui/Dialog/Dialog.css";
import "../components/TextEditor/ui/Input.css";
import "../components/TextEditor/ui/Placeholder/Placeholder.css";
import "../components/TextEditor/plugins/DraggableBlockPlugin/DraggableBlockPlugin.css";
import "../components/TextEditor/plugins/FloatingTextFormatToolbarPlugin/index.css";
import "../components/TextEditor/ui/Modal/Modal.css";
import "../components/TextEditor/plugins/CommentPlugin/index.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Admin Dashboard",
  description: "Admin Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
