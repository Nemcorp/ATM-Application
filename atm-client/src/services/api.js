import axios from 'axios';

const API_BASE_URL = 'https://localhost:7237/api';

export const fetchAccounts = async () => {
  const response = await axios.get(`${API_BASE_URL}/accounts`);
  return response.data;
};

export const fetchTransactions = async () => {
  const response = await axios.get(`${API_BASE_URL}/transactions`);
  return response.data;
};

export const deposit = async (accountId, amount) => {
  const response = await axios.post(`${API_BASE_URL}/accounts/${accountId}/deposit`, { amount });
  return response.data;
};

export const withdraw = async (accountId, amount) => {
  const response = await axios.post(`${API_BASE_URL}/accounts/${accountId}/withdraw`, { amount });
  return response.data;
};

export const transfer = async (sourceAccountId, targetAccountId, amount) => {
  const response = await axios.post(`${API_BASE_URL}/accounts/${sourceAccountId}/transfer`, { 
    targetAccountId, 
    amount 
  });
  return response.data;
};