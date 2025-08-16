// ChatLoading.jsx

export default function ChatLoading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-blue-700 bg-opacity-30 backdrop-blur-md z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 flex items-center space-x-4 animate-pulse">
        <div className="flex space-x-2">
          <span className="w-3 h-3 bg-blue-700 rounded-full animate-bounce"></span>
          <span className="w-3 h-3 bg-blue-700 rounded-full animate-bounce delay-150"></span>
          <span className="w-3 h-3 bg-blue-700 rounded-full animate-bounce delay-300"></span>
        </div>
        <span className="text-blue-700 font-semibold">Chat is loading...</span>
      </div>
    </div>
  );
}
