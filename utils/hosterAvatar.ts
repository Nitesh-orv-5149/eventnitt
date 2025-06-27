export function getInitials(line: string): string {
    const words = line.trim().split(/\s+/);
  
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    } else if (words.length === 1 && words[0].length >= 2) {
      const word = words[0];
      return (word[0] + word[word.length - 1]).toUpperCase();
    } else {
      return words[0]?.[0]?.toUpperCase() || ""; 
    }
  }
  