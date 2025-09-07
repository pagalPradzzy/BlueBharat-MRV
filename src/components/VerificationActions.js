import React, { useState } from 'react';

const VerificationActions = ({ project, onClose }) => {
  const [action, setAction] = useState('');
  const [reason, setReason] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleApprove = async () => {
    setIsProcessing(true);
    setAction('approve');
    
    // Simulate API call
    setTimeout(() => {
      alert(`Project ${project.id} has been approved!`);
      setIsProcessing(false);
      onClose();
    }, 2000);
  };

  const handleReject = async () => {
    if (!reason.trim()) {
      alert('Please provide a reason for rejection.');
      return;
    }

    setIsProcessing(true);
    setAction('reject');
    
    // Simulate API call
    setTimeout(() => {
      alert(`Project ${project.id} has been rejected. Reason: ${reason}`);
      setIsProcessing(false);
      onClose();
    }, 2000);
  };

  const handleRequestMoreInfo = async () => {
    if (!reason.trim()) {
      alert('Please specify what additional information is needed.');
      return;
    }

    setIsProcessing(true);
    setAction('request-info');
    
    // Simulate API call
    setTimeout(() => {
      alert(`Information request sent for project ${project.id}`);
      setIsProcessing(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="border-t border-secondary-200 pt-6">
      <h3 className="text-lg font-semibold text-government-dark mb-4">
        Verification Actions
      </h3>
      
      <div className="space-y-4">
        {/* Reason Input */}
        <div>
          <label className="block text-sm font-medium text-secondary-600 mb-2">
            Reason / Comments
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Enter your reason for approval, rejection, or information request..."
            className="gov-input h-24 resize-none"
            disabled={isProcessing}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleApprove}
            disabled={isProcessing}
            className={`px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed ${
              action === 'approve' ? 'ring-2 ring-green-300' : ''
            }`}
          >
            {isProcessing && action === 'approve' ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Approving...
              </div>
            ) : (
              '✅ Approve Project'
            )}
          </button>

          <button
            onClick={handleReject}
            disabled={isProcessing || !reason.trim()}
            className={`px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed ${
              action === 'reject' ? 'ring-2 ring-red-300' : ''
            }`}
          >
            {isProcessing && action === 'reject' ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Rejecting...
              </div>
            ) : (
              '❌ Reject Project'
            )}
          </button>

          <button
            onClick={handleRequestMoreInfo}
            disabled={isProcessing || !reason.trim()}
            className={`px-6 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed ${
              action === 'request-info' ? 'ring-2 ring-yellow-300' : ''
            }`}
          >
            {isProcessing && action === 'request-info' ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Sending Request...
              </div>
            ) : (
              '📋 Request More Information'
            )}
          </button>

          <button
            onClick={onClose}
            disabled={isProcessing}
            className="px-6 py-2 gov-button-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
        </div>

        {/* Guidelines */}
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
          <h4 className="text-sm font-medium text-blue-800 mb-2">Verification Guidelines:</h4>
          <ul className="text-xs text-blue-700 space-y-1">
            <li>• Verify GPS coordinates match the project location</li>
            <li>• Check that images show actual restoration work</li>
            <li>• Ensure hectare measurements are accurate</li>
            <li>• Validate organization credentials</li>
            <li>• Review carbon sequestration calculations</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VerificationActions;
