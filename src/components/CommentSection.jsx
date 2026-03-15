import UserAvatar from "@/components/UserAvatar";
import SubmitButton from "@/components/SubmitButton";

export default function CommentSection({ animal, comments, handleAction }) {
  return (
    <div className="mt-8">
      <h2 className="text-xl mb-3">Leave a comment</h2>
      <form className="mb-10" action={handleAction}>
        <input type="hidden" name="animalId" value={animal.id} />
        <textarea
          name="content"
          placeholder="Write a comment..."
          required
          className="w-full border rounded p-3 resize-none h-24"
        />
        <SubmitButton>Submit</SubmitButton>
      </form>
      <h2 className="text-xl mb-3">Comments</h2>
      {comments.length === 0 ? (
        <p className="opacity-50">No comments yet.</p>
      ) : (
        <ul className="space-y-4">
          {comments.map((comment) => (
            <li key={comment.id} className="flex gap-4 border-b pb-4">
              <UserAvatar src={comment.image} fallbackText={comment.username} />
              <div className="flex-1">
                <p className="font-medium">@{comment.username}</p>
                <p className="opacity-70 mt-1">{comment.comment_text}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
