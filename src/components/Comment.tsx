type CommentProps = {
  comment: string;
};

export type CommentType = {
  id: number,
  text: string
  createdAt: number,
  updatedAt: number
}

export const Comment = ({comment}: CommentProps) => {
  return (
  <p className="p-3 bg-gray-50 text-xs leading-5 break-words whitespace-pre-wrap">{comment}</p>
  );
};