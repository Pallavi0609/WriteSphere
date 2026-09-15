'use client';

import { Check, Clipboard, Download, FileDown, Save } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Document, Packer, Paragraph } from 'docx';
import PptxGenJS from 'pptxgenjs';

interface GenerationActionsProps {
  textToCopy: string;
  fileName: string;
  onSave?: () => void;
}

export function GenerationActions({
  textToCopy,
  fileName,
  onSave,
}: GenerationActionsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleExport = async (format: 'txt' | 'pdf' | 'docx' | 'pptx') => {
    if (format === 'txt') {
      const blob = new Blob([textToCopy], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${fileName}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } else if (format === 'docx') {
      const doc = new Document({
        sections: [
          {
            properties: {},
            children: [
              new Paragraph({ text: textToCopy }),
            ],
          },
        ],
      });

      const blob = await Packer.toBlob(doc);
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${fileName}.docx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } else if (format === 'pptx') {
      const pptx = new PptxGenJS();
      const slide = pptx.addSlide();
      slide.addText(textToCopy, { x: 1, y: 1, w: '80%', h: '80%' });
      const blob = await pptx.write('blob');
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${fileName}.pptx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } else if (format === 'pdf') {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`<html><head><title>${fileName}</title></head><body><pre>${textToCopy}</pre></body></html>`);
        printWindow.document.close();
        printWindow.print();
      }
    }
  };

  return (
    <TooltipProvider>
      <div className="flex items-center gap-2">
        {onSave && (
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={onSave}>
                        <Save className="h-4 w-4" />
                        <span className="sr-only">Save Draft</span>
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Save Draft</p>
                </TooltipContent>
            </Tooltip>
        )}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={handleCopy}>
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Clipboard className="h-4 w-4" />
              )}
              <span className="sr-only">Copy to clipboard</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Copy to clipboard</p>
          </TooltipContent>
        </Tooltip>
        <DropdownMenu>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Download className="h-4 w-4" />
                  <span className="sr-only">Download</span>
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>Download</p>
            </TooltipContent>
          </Tooltip>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleExport('txt')}>
              <FileDown className="mr-2 h-4 w-4" />
              Download as .txt
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport('pdf')}>
              <FileDown className="mr-2 h-4 w-4" />
              Download as .pdf
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport('docx')}>
              <FileDown className="mr-2 h-4 w-4" />
              Download as .docx
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport('pptx')}>
              <FileDown className="mr-2 h-4 w-4" />
              Download as .pptx
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </TooltipProvider>
  );
}
