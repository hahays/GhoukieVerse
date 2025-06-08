import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {Icon} from "../Icon/Icon";


interface AddToListDropdownProps {
    lists: { id: string; name: string }[];
    onSelect: (listId: string) => void;
    className?: string;
}

export const AddToListDropdown: React.FC<AddToListDropdownProps> = ({
                                                                        lists,
                                                                        onSelect,
                                                                        className = ''
                                                                    }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`relative w-full min-w-[180px] ${className}`}>
            <div className="relative rounded-lg p-[1.5px] bg-gradient-to-r from-[#000000] to-[#666666]">
                <div className="bg-[#A1D07E] rounded-[calc(0.5rem-1.5px)] p-1">
                    <div className="bg-[#ECFAEB] rounded-[calc(0.5rem-3.5px)] h-full">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="w-full px-3 py-3 bg-transparent text-xl appearance-none focus:outline-none text-ghoukie-black rounded-[calc(0.5rem-3.5px)] flex justify-between items-center"
                        >
                            <span>Добавить в список</span>
                            <motion.div
                                animate={{ rotate: isOpen ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                                className="pointer-events-none"
                            >
                                <Icon name="addToList" size={24} />
                            </motion.div>
                        </button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 10 }}
                        exit={{ opacity: 0, y: 5 }}
                        transition={{ duration: 0.2 }}
                        className="absolute z-50 mt-1 w-full origin-top"
                    >
                        <div className="rounded-lg p-[1.5px] bg-gradient-to-r from-[#000000] to-[#666666]">
                            <div className="bg-ghoukie-green rounded-[calc(0.5rem-1.5px)] p-[2px]">
                                <div className="bg-ghoukie-white rounded-[calc(0.5rem-3.5px)] py-1">
                                    {lists.map((list) => (
                                        <button
                                            key={list.id}
                                            onClick={() => {
                                                onSelect(list.id);
                                                setIsOpen(false);
                                            }}
                                            className="w-full px-4 py-2 text-left hover:bg-ghoukie-white text-xl transition-colors text-ghoukie-black"
                                        >
                                            {list.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.3 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black z-40"
                        onClick={() => setIsOpen(false)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};