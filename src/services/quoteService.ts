import axios from 'axios';

interface QuoteType {
  text: string;
  author: string | null;
}

export const fetchQuotes = async (): Promise<QuoteType[]> => {
  try {
    const response = await axios.get<QuoteType[]>('https://type.fit/api/quotes');
    return response.data;
  } catch (error) {
    console.error('Error fetching quotes', error);
    throw error;
  }
};
