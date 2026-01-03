import Anthropic from '@anthropic-ai/sdk';
import OpenAI from 'openai';

export type AIProvider = 'claude' | 'openai' | 'deepseek';

export interface AIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface AICompletionRequest {
  messages: AIMessage[];
  temperature?: number;
  maxTokens?: number;
  responseFormat?: 'json' | 'text';
}

export interface AICompletionResponse {
  content: string;
  provider: AIProvider;
  model: string;
  tokensUsed?: number;
}

export class UnifiedAIService {
  private anthropic: Anthropic;
  private openai: OpenAI;
  private deepseek: OpenAI;

  constructor() {
    this.anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY || '',
    });

    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_SECRET_KEY || '',
    });

    this.deepseek = new OpenAI({
      apiKey: process.env.DEEPSEEK_API_KEY || '',
      baseURL: 'https://api.deepseek.com',
    });
  }

  async getCompletion(
    provider: AIProvider,
    request: AICompletionRequest
  ): Promise<AICompletionResponse> {
    try {
      switch (provider) {
        case 'claude':
          return await this.getClaudeCompletion(request);
        case 'openai':
          return await this.getOpenAICompletion(request);
        case 'deepseek':
          return await this.getDeepSeekCompletion(request);
        default:
          throw new Error(`Unknown AI provider: ${provider}`);
      }
    } catch (error) {
      console.error(`[AI Provider] ${provider} failed:`, error);
      return await this.getCompletionWithFallback(provider, request);
    }
  }

  private async getClaudeCompletion(
    request: AICompletionRequest
  ): Promise<AICompletionResponse> {
    const systemMessage = request.messages.find(m => m.role === 'system');
    const userMessages = request.messages.filter(m => m.role !== 'system');

    const response = await this.anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: request.maxTokens || 4096,
      temperature: request.temperature || 0.7,
      system: systemMessage?.content,
      messages: userMessages.map(m => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      })),
    });

    const content = response.content[0].type === 'text' 
      ? response.content[0].text 
      : '';

    return {
      content,
      provider: 'claude',
      model: 'claude-sonnet-4-20250514',
      tokensUsed: response.usage.input_tokens + response.usage.output_tokens,
    };
  }

  private async getOpenAICompletion(
    request: AICompletionRequest
  ): Promise<AICompletionResponse> {
    const params: any = {
      model: 'gpt-4o',
      messages: request.messages,
      temperature: request.temperature || 0.7,
      max_tokens: request.maxTokens || 4096,
    };

    if (request.responseFormat === 'json') {
      params.response_format = { type: 'json_object' };
    }

    const response = await this.openai.chat.completions.create(params);

    return {
      content: response.choices[0]?.message?.content || '',
      provider: 'openai',
      model: 'gpt-4o',
      tokensUsed: response.usage?.total_tokens,
    };
  }

  private async getDeepSeekCompletion(
    request: AICompletionRequest
  ): Promise<AICompletionResponse> {
    const params: any = {
      model: 'deepseek-chat',
      messages: request.messages,
      temperature: request.temperature || 0.7,
      max_tokens: request.maxTokens || 4096,
    };

    if (request.responseFormat === 'json') {
      params.response_format = { type: 'json_object' };
    }

    const response = await this.deepseek.chat.completions.create(params);

    return {
      content: response.choices[0]?.message?.content || '',
      provider: 'deepseek',
      model: 'deepseek-chat',
      tokensUsed: response.usage?.total_tokens,
    };
  }

  private async getCompletionWithFallback(
    failedProvider: AIProvider,
    request: AICompletionRequest
  ): Promise<AICompletionResponse> {
    const fallbackOrder: AIProvider[] = ['deepseek', 'claude', 'openai'];
    const remainingProviders = fallbackOrder.filter(p => p !== failedProvider);

    for (const provider of remainingProviders) {
      try {
        console.log(`[AI Provider] Trying fallback: ${provider}`);
        
        switch (provider) {
          case 'claude':
            return await this.getClaudeCompletion(request);
          case 'openai':
            return await this.getOpenAICompletion(request);
          case 'deepseek':
            return await this.getDeepSeekCompletion(request);
        }
      } catch (error) {
        console.error(`[AI Provider] Fallback ${provider} also failed:`, error);
        continue;
      }
    }

    throw new Error('All AI providers failed');
  }

  async testProvider(provider: AIProvider): Promise<{ success: boolean; message: string; tokensUsed?: number }> {
    const testRequest: AICompletionRequest = {
      messages: [{ role: 'user', content: 'Reply with "OK" if you can read this message.' }],
      maxTokens: 10,
      temperature: 0,
    };

    try {
      let response: AICompletionResponse;
      
      switch (provider) {
        case 'claude':
          response = await this.getClaudeCompletion(testRequest);
          break;
        case 'openai':
          response = await this.getOpenAICompletion(testRequest);
          break;
        case 'deepseek':
          response = await this.getDeepSeekCompletion(testRequest);
          break;
        default:
          throw new Error(`Unknown provider: ${provider}`);
      }

      if (response.provider !== provider) {
        return { success: false, message: `Unexpected provider response: ${response.provider}` };
      }

      return { 
        success: true, 
        message: `Connected! Response: ${response.content.substring(0, 50)}`,
        tokensUsed: response.tokensUsed,
      };
    } catch (error: any) {
      console.error(`[AI Provider Test] ${provider} test failed:`, error);
      return { 
        success: false, 
        message: error.message || 'Connection failed - check API key configuration',
      };
    }
  }
}

export const unifiedAI = new UnifiedAIService();
