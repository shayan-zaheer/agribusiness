function Message({ text, isSender }) {
  return (
      <div
          className={`message p-4 bg-gray-100 border border-gray-300 rounded-lg shadow-md w-64 m-6 ${
              isSender ? "ml-auto bg-blue-100" : "mr-auto bg-green-100"
          }`}
      >
          {text}
      </div>
  );
}

export default Message;
