import React from 'react';

const ActionButtons = ({ onDeposit, onWithdraw, onTransfer }) => {
  return (
    <div className="atm-actions">
      <button className="action-btn deposit-btn" onClick={onDeposit}>
        Deposit
      </button>
      <button className="action-btn withdraw-btn" onClick={onWithdraw}>
        Withdraw
      </button>
      <button className="action-btn transfer-btn" onClick={onTransfer}>
        Transfer
      </button>
    </div>
  );
};

export default ActionButtons;