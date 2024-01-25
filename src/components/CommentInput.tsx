
import axios from "axios";
import { useRef, useState } from "react";

export const CommentInput = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isSending, setIsSending] = useState(false)
  
  const sendComment = async () => {
    if (inputRef.current === null) return
    const value = inputRef.current.value
    const data = {
      text:value
    }
    setIsSending(true)
    await axios.post("https://streame-comment-worker.0fz3394278f245t.workers.dev/api/comments",data)
    inputRef.current.value = ""
    setIsSending(false)
  }

  return (
    <div className="flex w-full mt-3">
      <input placeholder="ここにコメントをかく" ref={inputRef} className="p-3 bg-gray-50 text-xs leading-5 w-full border-solid" />
      <button disabled={isSending} onClick={sendComment} className="p-3 bg-red-300 text-xs leading-5 ml-4 cursor-pointer text-center w-[200px]">コメント送信</button>
    </div>
  );
};