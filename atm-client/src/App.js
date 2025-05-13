import React, { useState, useEffect } from 'react';
import { fetchAccounts, fetchTransactions, deposit, withdraw, transfer } from './services/api';
import ActionButtons from './components/ActionButtons';
import TransactionFlow from './components/TransactionFlow';
import TransactionHistory from './components/TransactionHistory';
import './App.css';

function App() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTransactionType, setCurrentTransactionType] = useState(null); // deposit, withdraw, transfer, or null
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const loadAccounts = async () => {
      try {
        const data = await fetchAccounts();
        setAccounts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching accounts:', error);
        setLoading(false);
      }
    };

    loadAccounts();

    const loadTransactions = async () => {
    try {
      const data = await fetchTransactions();
      setTransactions(data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  loadTransactions();
  }, []);

  function closeCurrentModal() {
    setCurrentTransactionType(null);
  }

  const handleTransactionSubmit = async (operationData) => {
    try {
      let result;
      
      switch (currentTransactionType) {
        case 'deposit':
          result = await deposit(operationData.sourceAccountId, operationData.amount);
          break;
        case 'withdraw':
          result = await withdraw(operationData.sourceAccountId, operationData.amount);
          break;
        case 'transfer':
          result = await transfer(
            operationData.sourceAccountId,
            operationData.targetAccountId,
            operationData.amount
          );
          break;
        default:
          return;
      }

      // refresh accounts
      const updatedAccounts = await fetchAccounts();
      setAccounts(updatedAccounts);

      // refresh transaction history
      const updatedTransactions = await fetchTransactions();
      setTransactions(updatedTransactions);
      
      closeCurrentModal();
      
      alert(`${currentTransactionType} successful!`);
    } catch (error) {
      console.error(`Error processing ${currentTransactionType}:`, error);
      if (error.response && error.response.status === 400) {
        alert(error.response.data);
      } else {
        alert(`There was an error processing your ${currentTransactionType}. Please try again.`);
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>ATM Application</h1>
      </header>
      <main>
        {loading ? (
          <p>Loading accounts...</p>
        ) : (
          <>
            <div className="accounts-container">
              <h2>Your Accounts</h2>
              {accounts.map(account => (
                <div key={account.id} className="account-card">
                  <h3>{account.type} Account</h3>
                  <p className="balance">Balance: ${account.balance.toFixed(2)}</p>
                </div>
              ))}
            </div>
            
            <ActionButtons
              onDeposit={() => setCurrentTransactionType('deposit')}
              onWithdraw={() => setCurrentTransactionType('withdraw')}
              onTransfer={() => setCurrentTransactionType('transfer')}
            />
            
            <TransactionFlow
              isOpen={currentTransactionType !== null}
              onClose={() => closeCurrentModal()}
              accounts={accounts}
              transactionType={currentTransactionType}
              onSubmit={handleTransactionSubmit}
            />

            <TransactionHistory transactions={transactions} />


          </>
        )}
      </main>
    </div>
  );
}

export default App;