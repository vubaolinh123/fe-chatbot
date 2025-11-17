import axiosInstance from "./axios-config";

export interface BotData {
  _id: string;
  name: string;
  status: "ACTIVE" | "INACTIVE";
  description: string;
  createdAt: number;
  updatedAt: number;
  firstMessage: string;
  uid: string;
  field?: string;
  target?: string;
  mainTarget?: string;
  prompt?: string;
}

export interface BotListResponse {
  error: number;
  data: BotData[];
}

export interface CreateBotRequest {
  name: string;
  status: "ACTIVE" | "INACTIVE";
  description: string;
  field: string;
  target: string;
  firstMessage: string;
  mainTarget: string;
}

export interface CreateBotResponse {
  error: number;
  data: {
    _id: string;
    name: string;
    status: string;
    description: string;
    createdAt: number;
    updatedAt: number;
    firstMessage: string;
    field: string;
    target: string;
    mainTarget: string;
  };
}

/**
 * Fetch list of bots from the API
 * @returns Promise with array of bot data
 */
export async function getListBots(): Promise<BotData[]> {
  try {
    const response: BotListResponse = await axiosInstance.get(
      "/webhook/api/v1/demo/list-bot"
    );

    // Check if response has error
    if (response.error !== 0) {
      throw new Error(`API returned error: ${response.error}`);
    }

    return response.data || [];
  } catch (error) {
    console.error("Failed to fetch bots:", error);
    throw error;
  }
}

/**
 * Create a new bot
 * @param data - Bot creation data
 * @returns Promise with created bot data
 */
export async function createBot(data: CreateBotRequest): Promise<CreateBotResponse> {
  try {
    const response: CreateBotResponse = await axiosInstance.post(
      "/webhook/api/v1/demo/create-bot",
      data
    );

    // Check if response has error
    if (response.error !== 0) {
      throw new Error(`API returned error: ${response.error}`);
    }

    return response;
  } catch (error) {
    console.error("Failed to create bot:", error);
    throw error;
  }
}

/**
 * Interface for bot detail response
 */
export interface BotDetailData {
  _id: string;
  name: string;
  status: "ACTIVE" | "INACTIVE";
  description: string;
  field: string;
  target: string;
  mainTarget: string;
  firstMessage: string | null;
  prompt: string;
  createdAt: number;
  updatedAt: number;
}

export interface BotDetailResponse {
  error: number;
  data: BotDetailData;
}

/**
 * Interface for update bot request
 */
export interface UpdateBotRequest {
  _id: string;
  name: string;
  status: "ACTIVE" | "INACTIVE";
  description: string;
  field: string;
  target: string;
  mainTarget: string;
  firstMessage: string | null;
  prompt: string;
}

export interface UpdateBotResponse {
  error: number;
  message?: string;
  data?: BotDetailData;
}

/**
 * Fetch bot detail by ID
 * @param id - Bot ID
 * @returns Promise with bot detail data
 */
export async function getBotDetail(id: string): Promise<BotDetailResponse> {
  try {
    const response: BotDetailResponse = await axiosInstance.get(
      `/webhook/api/v1/demo/deltail?_id=${id}`
    );

    // Check if response has error
    if (response.error !== 0) {
      throw new Error(`API returned error: ${response.error}`);
    }

    return response;
  } catch (error) {
    console.error("Failed to fetch bot detail:", error);
    throw error;
  }
}

/**
 * Update bot information
 * @param data - Bot update data
 * @returns Promise with updated bot data
 */
export async function updateBot(data: UpdateBotRequest): Promise<UpdateBotResponse> {
  try {
    const response: UpdateBotResponse = await axiosInstance.post(
      "/webhook/api/v1/demo/update-bot",
      data
    );

    // Check if response has error
    if (response.error !== 0) {
      throw new Error(`API returned error: ${response.error}`);
    }

    return response;
  } catch (error) {
    console.error("Failed to update bot:", error);
    throw error;
  }
}

/**
 * Interface for delete bot request
 */
export interface DeleteBotRequest {
  uid: string;
}

export interface DeleteBotResponse {
  error: number;
  message?: string;
}

/**
 * Delete a bot by UID
 * @param uid - Bot UID
 * @returns Promise with delete result
 */
export async function deleteBot(uid: string): Promise<DeleteBotResponse> {
  try {
    const payload: DeleteBotRequest = { uid };

    const response: DeleteBotResponse = await axiosInstance.post(
      "/webhook/api/v1/demo/remove-bot",
      payload
    );

    if (response.error !== 0) {
      throw new Error(response.message || `API returned error: ${response.error}`);
    }

    return response;
  } catch (error) {
    console.error("Failed to delete bot:", error);
    throw error;
  }
}


/**
 * Interface for message history request
 */
export interface MessageHistoryRequest {
  _id: string;
}

export interface MessageHistoryResponse {
  error: number;
  data: {
    data: string[]; // Array of JSON strings
  };
}

/**
 * Fetch message history for a bot
 * @param botId - Bot ID
 * @returns Promise with message history data
 */
export async function getMessageHistory(botId: string): Promise<MessageHistoryResponse> {
  try {
    const response: MessageHistoryResponse = await axiosInstance.post(
      "/webhook/api/v1/demo/message-history",
      { _id: botId }
    );

    // Check if response has error
    if (response.error !== 0) {
      throw new Error(`API returned error: ${response.error}`);
    }

    return response;
  } catch (error) {
    console.error("Failed to fetch message history:", error);
    throw error;
  }
}

/**
 * Interface for send message request
 */
export interface SendMessageRequest {
  _id: string;
  text: string;
  kind: "text";
  uid: string;
}

export interface SendMessageResponse {
  error: number;
  data: {
    output: string;
  };
}

/**
 * Send a message to the bot
 * @param data - Send message request data
 * @returns Promise with bot response
 */
export async function sendMessage(data: SendMessageRequest): Promise<SendMessageResponse> {
  try {
    const response: SendMessageResponse = await axiosInstance.post(
      "/webhook/api/v1/demo/send-message",
      data
    );

    // Check if response has error
    if (response.error !== 0) {
      throw new Error(`API returned error: ${response.error}`);
    }

    return response;
  } catch (error) {
    console.error("Failed to send message:", error);
    throw error;
  }
}

