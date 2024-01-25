import { Stream } from "@cloudflare/stream-react";
import { Comments } from "./Comments";
import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import type { CommentType } from "./Comment";

export const CloudflareStream = () => {
  const videoIdOrSignedToken = "7de7a1c9509f9b0f6c79b8c27e04460a";

  const isFirstFetch = useRef<boolean>(true)
  const [firstComments, setFirstComments] = useState<CommentType[]>([])
  const [comments, setComments] = useState<CommentType[]>([])
  
  const getComments = useCallback( async () => {
    const response = await axios.get<CommentType[]>("https://streame-comment-worker.0fz3394278f245t.workers.dev/api/comments")
    
    if(isFirstFetch.current) {
      isFirstFetch.current = false
      setFirstComments(response.data)
      return
    }

    const firstCommentsDiff = response.data.filter((comment: CommentType) => {
      return !firstComments.find((c: CommentType) => c.id === comment.id)
    })

    const newComments = firstCommentsDiff.filter((comment: CommentType) => {
      return !comments.find((c: CommentType) => c.id === comment.id)
    })
    setComments(prev=> [...prev, ...newComments])
  },[firstComments, comments])

  const intervalFuncRef = useRef<()=>void>(getComments);


  useEffect(() => {
    intervalFuncRef.current = getComments
  },[getComments])

  useEffect(() => {
    getComments()
    const tick = () => { intervalFuncRef.current() } 
    const id = setInterval(tick, 5000)
    return () => {
      clearInterval(id);
    };
  },[])


  return (
    <div className="grid gap-2 grid-cols-[1fr,300px] h-[400px]">
      <div className="w-full h-full relative bg-black">
        <Stream 
          className="w-full pt-[56.2%]"
          controls 
          src={videoIdOrSignedToken}
        />

        <div className="w-full h-full absolute top-0 left-0 overflow-hidden pointer-events-none">
          {comments.map((comment: CommentType) => 
            <div 
              key={`comment-${comment.id}-${comment.createdAt}`} 
              className="text-white text-lg leading-5 absolute top-0 left-0 animate-appear w-full">
                {comment.text}
            </div>
          )}
        </div>
      </div>
			<Comments getComments={getComments} comments={comments} firstComments={firstComments}/>
		</div>
  );
};