
import { dataApi } from '@/lib/api';
import { Receipt } from '@/types/api';
import Tesseract from 'tesseract.js';

export const receiptService = {
  async getReceipts(): Promise<Receipt[]> {
    return dataApi.get<Receipt[]>('receipt');
  },

  async getReceipt(id: number): Promise<Receipt> {
    return dataApi.get<Receipt>(`receipt/${id}`);
  },

  async createReceipt(receipt: Partial<Receipt>): Promise<Receipt> {
    return dataApi.post<Receipt>('receipt', receipt);
  },

  async updateReceipt(id: number, receipt: Partial<Receipt>): Promise<Receipt> {
    return dataApi.patch<Receipt>(`receipt/${id}`, receipt);
  },

  async deleteReceipt(id: number): Promise<void> {
    return dataApi.delete<void>(`receipt/${id}`);
  },

  processReceiptWithOCR: async (imageFile: File): Promise<any> => {
    try {
      // Convert file to base64 for Tesseract
      const base64Image = await receiptService.fileToBase64(imageFile);
      
      // Process with Tesseract
      const result = await Tesseract.recognize(
        base64Image,
        'eng',
        {
          logger: m => console.log(m)
        }
      );

      // Extract text and try to parse receipt data
      const extractedText = result.data.text;
      const parsedData = receiptService.parseReceiptText(extractedText);

      return {
        success: true,
        text: extractedText,
        parsed: parsedData,
        confidence: result.data.confidence
      };
    } catch (error) {
      console.error('OCR processing failed:', error);
      throw new Error(`OCR processing failed: ${error.message}`);
    }
  },

  fileToBase64: async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  },

  parseReceiptText: (text: string): any => {
    const lines = text.split('\n').filter(line => line.trim());
    
    // Try to extract common receipt fields
    const parsed = {
      total: receiptService.extractTotal(lines),
      date: receiptService.extractDate(lines),
      merchant: receiptService.extractMerchant(lines),
      items: receiptService.extractItems(lines),
      tax: receiptService.extractTax(lines),
      receiptType: receiptService.determineReceiptType(lines),
      smartTitle: receiptService.generateSmartTitle(lines)
    };

    return parsed;
  },

  determineReceiptType: (lines: string[]): string => {
    const text = lines.join(' ').toLowerCase();
    
    // Common store/business type indicators
    const storeTypes = {
      'grocery': ['grocery', 'supermarket', 'walmart', 'target', 'kroger', 'safeway', 'food', 'market'],
      'restaurant': ['restaurant', 'cafe', 'diner', 'bistro', 'grill', 'kitchen', 'pizza', 'burger'],
      'gas': ['gas', 'fuel', 'shell', 'exxon', 'chevron', 'bp', 'station'],
      'pharmacy': ['pharmacy', 'cvs', 'walgreens', 'drugstore', 'medical'],
      'retail': ['store', 'shop', 'retail', 'mall', 'outlet'],
      'clothing': ['clothing', 'apparel', 'fashion', 'wear', 'shirt', 'pants'],
      'electronics': ['electronics', 'tech', 'computer', 'phone', 'device'],
      'home': ['home', 'depot', 'lowes', 'hardware', 'furniture']
    };

    for (const [type, keywords] of Object.entries(storeTypes)) {
      if (keywords.some(keyword => text.includes(keyword))) {
        return type;
      }
    }

    return 'general';
  },

  generateSmartTitle: (lines: string[]): string => {
    const merchant = receiptService.extractMerchant(lines);
    const receiptType = receiptService.determineReceiptType(lines);
    const total = receiptService.extractTotal(lines);
    
    // Generate a smart title based on merchant and type
    if (merchant && receiptType !== 'general') {
      return `${merchant} - ${receiptType.charAt(0).toUpperCase() + receiptType.slice(1)}`;
    } else if (merchant) {
      return `${merchant} Purchase`;
    } else {
      return `${receiptType.charAt(0).toUpperCase() + receiptType.slice(1)} Receipt`;
    }
  },

  extractTotal: (lines: string[]): string | null => {
    // Look for total amount patterns
    const totalPatterns = [
      /total.*?(\d+\.?\d*)/i,
      /amount.*?(\d+\.?\d*)/i,
      /(\d+\.?\d*).*?total/i,
      /(\d+\.?\d*).*?amount/i
    ];

    for (const line of lines) {
      for (const pattern of totalPatterns) {
        const match = line.match(pattern);
        if (match) return match[1];
      }
    }
    return null;
  },

  extractDate: (lines: string[]): string | null => {
    // Look for date patterns
    const datePatterns = [
      /\d{1,2}\/\d{1,2}\/\d{2,4}/,
      /\d{1,2}-\d{1,2}-\d{2,4}/,
      /\d{4}-\d{2}-\d{2}/
    ];

    for (const line of lines) {
      for (const pattern of datePatterns) {
        const match = line.match(pattern);
        if (match) return match[0];
      }
    }
    return null;
  },

  extractMerchant: (lines: string[]): string | null => {
    // Usually the first few lines contain merchant info
    for (let i = 0; i < Math.min(5, lines.length); i++) {
      const line = lines[i].trim();
      if (line && line.length > 3 && !line.match(/^\d/) && !line.toLowerCase().includes('receipt')) {
        return line;
      }
    }
    return null;
  },

  extractItems: (lines: string[]): any[] => {
    // Look for lines that might be items (contain prices and product names)
    const items = [];
    const itemPattern = /^(.+?)\s+(\d+\.?\d*)$/;
    
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed && trimmed.length > 5) {
        const match = trimmed.match(itemPattern);
        if (match && !trimmed.toLowerCase().includes('total') && !trimmed.toLowerCase().includes('tax')) {
          items.push({
            name: match[1].trim(),
            price: parseFloat(match[2]),
            rawLine: trimmed
          });
        }
      }
    }
    
    return items.slice(0, 10); // Limit to first 10 items
  },

  extractTax: (lines: string[]): string | null => {
    // Look for tax patterns
    const taxPatterns = [
      /tax.*?(\d+\.?\d*)/i,
      /(\d+\.?\d*).*?tax/i,
      /vat.*?(\d+\.?\d*)/i,
      /(\d+\.?\d*).*?vat/i
    ];

    for (const line of lines) {
      for (const pattern of taxPatterns) {
        const match = line.match(pattern);
        if (match) return match[1];
      }
    }
    return null;
  }
};
