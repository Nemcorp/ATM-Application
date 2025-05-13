import React, { useState } from 'react';

const TransactionFlow = ({ 
  isOpen, 
  onClose, 
  accounts, 
  transactionType,
  onSubmit 
}) => {
  const [step, setStep] = useState(1);
  const [selectedAccountId, setSelectedAccountId] = useState(null);
  const [targetAccountId, setTargetAccountId] = useState(null); // for transfers
  const [amount, setAmount] = useState('');

  const resetForm = () => {
    setStep(1);
    setSelectedAccountId(null);
    setTargetAccountId(null);
    setAmount('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleAccountSelect = (accountId) => {
    setSelectedAccountId(accountId);
    // transfer involves an extra step, 'account selection'
    setStep(transactionType === 'transfer' ? 2 : 2);
  };

  const handleTargetAccountSelect = (accountId) => {
    setTargetAccountId(accountId);
    setStep(3);
  };

  const handleSubmit = () => {
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    onSubmit({
      sourceAccountId: selectedAccountId,
      targetAccountId: transactionType === 'transfer' ? targetAccountId : null,
      amount: parseFloat(amount)
    });

    resetForm();
  };

  if (!isOpen) return null;

  const getTitleText = () => {
    switch (transactionType) {
      case 'deposit':
        return step === 1 
          ? 'Which account would you like to deposit to?' 
          : 'How much would you like to deposit?';
      case 'withdraw':
        return step === 1 
          ? 'Which account would you like to withdraw from?' 
          : 'How much would you like to withdraw?';
      case 'transfer':
        if (step === 1) return 'Which account would you like to transfer from?';
        if (step === 2) return 'Which account would you like to transfer to?';
        return 'How much would you like to transfer?';
      default:
        return 'Select an option';
    }
  };

  const getActionButtonText = () => {
    switch (transactionType) {
      case 'deposit': return 'Deposit';
      case 'withdraw': return 'Withdraw';
      case 'transfer': return 'Transfer';
      default: return 'Submit';
    }
  };

  if (step === 1) {
    return (
      <div className="transaction-flow">
        <div className="modal">
          <h2>{getTitleText()}</h2>
          <div className="account-options">
            {accounts.map(account => (
              <button 
                key={account.id} 
                className="account-option-btn"
                onClick={() => handleAccountSelect(account.id)}
              >
                {account.type} (Balance: ${account.balance.toFixed(2)})
              </button>
            ))}
          </div>
          <button className="cancel-btn" onClick={handleClose}>Cancel</button>
        </div>
      </div>
    );
  }

  if (step === 2 && transactionType === 'transfer') {
    const sourceAccountId = selectedAccountId;
    return (
      <div className="transaction-flow">
        <div className="modal">
          <h2>{getTitleText()}</h2>
          <div className="account-options">
            {accounts
              .filter(account => account.id !== sourceAccountId) // can't transfer to same account
              .map(account => (
                <button 
                  key={account.id} 
                  className="account-option-btn"
                  onClick={() => handleTargetAccountSelect(account.id)}
                >
                  {account.type} (Balance: ${account.balance.toFixed(2)})
                </button>
              ))}
          </div>
          <div className="modal-buttons">
            <button className="cancel-btn" onClick={handleClose}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }

  const selectedAccount = accounts.find(a => a.id === selectedAccountId);
  const maxAmount = transactionType === 'withdraw' ? selectedAccount?.balance : undefined;

  return (
    <div className="transaction-flow">
      <div className="modal">
        <h2>{getTitleText()}</h2>
        {transactionType === 'withdraw' && (
          <p>Available balance: ${selectedAccount ? selectedAccount.balance.toFixed(2) : '0.00'}</p>
        )}
        <div className="amount-input">
          <span className="dollar-sign">$</span>
          <input 
            type="number" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            step="0.01"
            min="0.01"
            max={maxAmount}
          />
        </div>
        <div className="modal-buttons">
          <button className="submit-btn" onClick={handleSubmit}>{getActionButtonText()}</button>
          <button className="cancel-btn" onClick={handleClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default TransactionFlow;