'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function VirtualKeyboard({
  value = "",
  onChange,
  onDone,
  onCancel,
  showKeyboard = true,
  type = "default", // "default" or "email"
}) {
  const [layout, setLayout] = useState('lowercase'); // 'lowercase', 'uppercase', 'numbers', 'symbols'
  
  React.useEffect(() => {
    if (!showKeyboard) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Backspace') {
        e.preventDefault();
        if (value.length > 0) {
          onChange(value.slice(0, -1));
        }
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (onDone) onDone();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        if (onCancel) onCancel();
      } else if (e.key === ' ') {
        e.preventDefault();
        onChange(value + ' ');
      } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        onChange(value + e.key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showKeyboard, value, onChange, onDone, onCancel]);

  if (!showKeyboard) return null;

  const handleKeyPress = (key) => {
    if (key === '{shift}') {
      setLayout(layout === 'uppercase' ? 'lowercase' : 'uppercase');
      return;
    }

    if (key === '{numbers}') {
      setLayout('numbers');
      return;
    }

    if (key === '{abc}') {
      setLayout('lowercase');
      return;
    }

    if (key === '{symbols}') {
      setLayout('symbols');
      return;
    }

    if (key === '{backspace}') {
      if (value.length > 0) {
        onChange(value.slice(0, -1));
      }
      return;
    }

    if (key === '{space}') {
      onChange(value + ' ');
      return;
    }

    // Default key insertion
    onChange(value + key);

    // If shift was on (single letter capitalization), switch back to lowercase
    if (layout === 'uppercase') {
      setLayout('lowercase');
    }
  };

  const renderKey = (key, customClasses = "", flex = "flex-1") => {
    let content = key;
    let isFunctionKey = false;

    if (key === '{shift}') {
      isFunctionKey = true;
      content = (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`w-5 h-5 ${layout === 'uppercase' ? 'text-[#099FF9] fill-[#099FF9]' : 'text-slate-800'}`}>
          <path d="M12 19V5M5 12l7-7 7 7"/>
        </svg>
      );
    } else if (key === '{backspace}') {
      isFunctionKey = true;
      content = (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-slate-800">
          <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"/>
          <line x1="18" y1="9" x2="12" y2="15"/>
          <line x1="12" y1="9" x2="18" y2="15"/>
        </svg>
      );
    } else if (key === '{numbers}') {
      isFunctionKey = true;
      content = <span className="font-bold text-[15px]">123</span>;
    } else if (key === '{abc}') {
      isFunctionKey = true;
      content = <span className="font-bold text-[15px]">ABC</span>;
    } else if (key === '{symbols}') {
      isFunctionKey = true;
      content = <span className="font-bold text-[14px]">#+=</span>;
    } else if (key === '{space}') {
      content = <span className="text-[14px] text-slate-500 font-bold">space</span>;
    } else if (key === '.com') {
      content = <span className="font-bold text-[14px]">.com</span>;
    }

    return (
      <motion.button
        key={key}
        type="button"
        whileTap={{ scale: 0.94, y: 1 }}
        transition={{ duration: 0.05 }}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleKeyPress(key);
        }}
        className={`h-11 md:h-12 rounded-lg flex items-center justify-center font-bold shadow-[0_1px_1px_rgba(0,0,0,0.25)] select-none text-[18px] md:text-[20px] transition-colors ${
          isFunctionKey
            ? 'bg-[#B0B7C1] text-slate-900 active:bg-[#9EA5AF]'
            : 'bg-white text-slate-900 active:bg-slate-200'
        } ${flex} ${customClasses}`}
      >
        {content}
      </motion.button>
    );
  };

  const getRows = () => {
    if (layout === 'lowercase') {
      return {
        row1: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        row2: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
        row3: ['{shift}', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '{backspace}'],
        row4: ['{numbers}', '@', '.', '{space}', '.com', '-']
      };
    }

    if (layout === 'uppercase') {
      return {
        row1: ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        row2: ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        row3: ['{shift}', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '{backspace}'],
        row4: ['{numbers}', '@', '.', '{space}', '.com', '-']
      };
    }

    if (layout === 'numbers') {
      return {
        row1: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
        row2: ['-', '/', ':', ';', '(', ')', '$', '&', '@', '"'],
        row3: ['{symbols}', '.', ',', '?', '!', '\'', '_', '{backspace}'],
        row4: ['{abc}', '@', '.', '{space}', '.com', '-']
      };
    }

    // symbols
    return {
      row1: ['[', ']', '{', '}', '#', '%', '^', '*', '+', '='],
      row2: ['_', '\\', '|', '~', '<', '>', '€', '£', '¥', '•'],
      row3: ['{numbers}', '.', ',', '?', '!', '\'', '"', '{backspace}'],
      row4: ['{abc}', '@', '.', '{space}', '.com', '-']
    };
  };

  const rows = getRows();

  return (
    <motion.div
      initial={{ y: 200, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 200, opacity: 0 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className="fixed bottom-0 left-0 right-0 z-50 flex flex-col items-center bg-[#E5E8EC]/95 backdrop-blur-md border-t border-[#D1D5DB] shadow-2xl select-none"
    >
      {/* iOS Top Bar (Cancel / Done) */}
      <div className="w-full max-w-[850px] flex items-center justify-between px-5 py-2.5 border-b border-[#D1D5DB]/70 text-[16px]">
        <button
          type="button"
          onClick={onCancel}
          className="text-[#099FF9] hover:text-[#0088EE] font-medium transition-colors cursor-pointer py-1 px-2 -ml-2 rounded-md hover:bg-black/5"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onDone}
          className="text-[#099FF9] hover:text-[#0088EE] font-bold transition-colors cursor-pointer py-1 px-2 -mr-2 rounded-md hover:bg-black/5"
        >
          Done
        </button>
      </div>

      {/* Keyboard Keys Layout */}
      <div className="w-full max-w-[850px] px-2 md:px-4 pt-3 pb-6 flex flex-col gap-2">
        {/* Row 1 */}
        <div className="w-full flex justify-center gap-1.5">
          {rows.row1.map((k) => renderKey(k, "", "flex-1"))}
        </div>

        {/* Row 2 */}
        <div className="w-full flex justify-center gap-1.5 px-[3%] md:px-[2.5%]">
          {rows.row2.map((k) => renderKey(k, "", "flex-1"))}
        </div>

        {/* Row 3 */}
        <div className="w-full flex justify-center gap-1.5">
          {rows.row3.map((k) => {
            if (k === '{shift}' || k === '{backspace}' || k === '{symbols}' || k === '{numbers}') {
              return renderKey(k, "", "flex-[1.4]");
            }
            return renderKey(k, "", "flex-1");
          })}
        </div>

        {/* Row 4 */}
        <div className="w-full flex justify-center gap-1.5">
          {renderKey(rows.row4[0], "", "flex-[1.4]")}
          {renderKey(rows.row4[1], "", "flex-1")}
          {renderKey(rows.row4[2], "", "flex-1")}
          {renderKey(rows.row4[3], "", "flex-[4]")}
          {renderKey(rows.row4[4], "", "flex-[1.6]")}
          {renderKey(rows.row4[5], "", "flex-1")}
        </div>
      </div>
    </motion.div>
  );
}
