import React, { useState, useRef } from 'react';
import { Upload, Check, X } from 'lucide-react';

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === 'audio/mpeg') {
      setFile(selectedFile);
      setUploadStatus('success');
    } else {
      setUploadStatus('error');
      setTimeout(() => setUploadStatus('idle'), 2000);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const getStatusColor = () => {
    switch (uploadStatus) {
      case 'success':
        return 'bg-green-500 hover:bg-green-600';
      case 'error':
        return 'bg-red-500 hover:bg-red-600';
      default:
        return 'bg-blue-500 hover:bg-blue-600';
    }
  };

  const getStatusIcon = () => {
    switch (uploadStatus) {
      case 'success':
        return <Check className="w-6 h-6" />;
      case 'error':
        return <X className="w-6 h-6" />;
      default:
        return <Upload className="w-6 h-6" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="audio/mpeg"
        className="hidden"
      />
      
      <div className="text-center mb-8">
        <h1 className="text-3xl font-light text-gray-800 mb-2">Audio Upload</h1>
        <p className="text-gray-600">Upload your MP3 conversation file</p>
      </div>

      <button
        onClick={handleButtonClick}
        className={`${getStatusColor()} text-white rounded-full p-6 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 flex items-center justify-center`}
      >
        {getStatusIcon()}
      </button>

      {file && (
        <div className="mt-6 text-sm text-gray-600">
          Selected file: {file.name}
        </div>
      )}

      {uploadStatus === 'error' && (
        <div className="mt-4 text-sm text-red-500">
          Please select a valid MP3 file
        </div>
      )}
    </div>
  );
}

export default App;