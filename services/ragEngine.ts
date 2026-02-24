
import { MOCK_BARE_ACTS } from '../constants';
import { Statute } from '../types';

/**
 * A simplified RAG engine that simulates semantic search
 * In a production app, this would use embeddings + VectorDB (like ChromaDB mentioned in prompt)
 */
export const performLocalRetrieval = (query: string): Statute[] => {
  const queryWords = query.toLowerCase().split(/\W+/);
  
  return MOCK_BARE_ACTS.map(statute => {
    let score = 0;
    const content = `${statute.title} ${statute.description} ${statute.section} ${statute.actName}`.toLowerCase();
    
    queryWords.forEach(word => {
      if (word.length > 3 && content.includes(word)) {
        score += 1;
      }
    });

    return { statute, score };
  })
  .filter(item => item.score > 0)
  .sort((a, b) => b.score - a.score)
  .slice(0, 3)
  .map(item => item.statute);
};
