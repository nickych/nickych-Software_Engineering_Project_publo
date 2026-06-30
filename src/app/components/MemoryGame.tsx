"use client";
import React, { useState, useEffect } from "react";

const cardSymbols = ["🐱", "🐶", "🐸", "🦊", "🐵", "🐼"];

export default function MemoryGame() {
  const [cards, setCards] = useState<string[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);

  useEffect(() => {
    // Duplicate & shuffle cards
    const deck = [...cardSymbols, ...cardSymbols]
      .sort(() => Math.random() - 0.5);
    setCards(deck);
  }, []);

  const handleFlip = (index: number) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (cards[first] === cards[second]) {
        setMatched([...matched, first, second]);
      }
      setTimeout(() => setFlipped([]), 800);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-lg font-bold text-white mb-3">🃏 Memory Match</h2>
      <div className="grid grid-cols-4 gap-3">
        {cards.map((card, index) => {
          const isFlipped = flipped.includes(index) || matched.includes(index);
          return (
            <button
              key={index}
              onClick={() => handleFlip(index)}
              className={`w-16 h-20 flex items-center justify-center rounded-lg text-2xl font-bold transition transform
                ${isFlipped ? "bg-blue-500 text-white" : "bg-gray-700"} 
              `}
            >
              {isFlipped ? card : "❓"}
            </button>
          );
        })}
      </div>
      {matched.length === cards.length && (
        <p className="mt-3 text-green-400 font-semibold">🎉 You Won!</p>
      )}
    </div>
  );
}
