export interface Story {
    id: number;
    type: 'story';
    by: string;
    time: number;
    title: string;
    score: number;
    // Marking them as optional (?) prevents "Property does not exist" crashes.
    url?: string; 
    descendants?: number;
    kids?: number[]; // Included because it's standard for the 'story' type
    text?: string;   // For "Ask HN" posts which have text instead of a URL
    dead?: boolean;
    deleted?: boolean;
  }
  
  export type SortOrder = 'score' | 'time';