
import { useEffect, useRef } from "react";
import { Comment, type CommentType } from "./Comment";

type CommentsProps = {
  firstComments: CommentType[],
  comments : CommentType[],
  getComments: ()=>void
}

export const Comments = ({comments,firstComments,getComments}:CommentsProps) => {
  const scrollBottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scrollBottomRef.current) {
      scrollBottomRef.current.scrollIntoView({ behavior: "auto" });
    }
  }, [comments, firstComments]);

  return (
    <>
      <section className="flex flex-col gap-2 overflow-y-auto h-[400px]">
        {firstComments?.map((comment: CommentType) => <Comment key={`comment-${comment.id}-${comment.createdAt}`} comment={comment.text} />) }
        {comments?.map((comment: CommentType) => <Comment key={`comment-${comment.id}-${comment.createdAt}`} comment={comment.text} />) }
        <div ref={scrollBottomRef}/>
        <button className="p-3 bg-red-300 cursor-pointer text-xs leading-5" onClick={getComments}>コメント取得</button>
      </section>
    </>
  );
};