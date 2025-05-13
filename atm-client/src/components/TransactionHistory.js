import React, { useState } from 'react';

const TransactionHistory = ({ transactions}) => {


  return (
    <div className="transaction-history">
      <div>
        <h2>Transactions</h2>
        {transactions.length === 0 ? (
          <p>No transactions to display</p>
        ) : (
          <ul className="transaction-list">
            {transactions.map(transaction => (
              <li key={transaction.id} className="transaction-item">
                <div className="transaction-type">{transaction.transactionType}</div>
                <div className="transaction-amount">
                  ${Math.abs(transaction.amount).toFixed(2)}
                </div>
                <div className="transaction-date">
                  {new Date(transaction.timestamp).toLocaleString()}
                </div>
                <div className="transfer-info">
                  {transaction.targetAccountId && <p>From account: {transaction.sourceAccountId} to account: {transaction.targetAccountId}</p>}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;