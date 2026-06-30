import React, { useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Avatar from "../ui/Avatar";

export default function Comments({ blogId }) {
  // Local state initialized with the wireframe comments
  const [comments, setComments] = useState([
    {
      id: "comment-1",
      authorName: "Sarah Chen",
      authorInitials: "SC",
      role: "Lead Researcher",
      time: "2 hours ago",
      text: "Fascinating insights on predictive journeys. I'm curious about the trade-off between model accuracy and processing speed. Any recommendations on tech stacks for mid-market?",
      likes: 4,
      likedByUser: false,
      replies: [
        {
          id: "reply-1",
          authorName: "Arjun Mehta",
          authorInitials: "AM",
          role: "Author",
          isAuthor: true,
          time: "1 hour ago",
          text: "Great question, Sarah. For mid-market, we often look at headless CDP architectures like Segment or RudderStack paired with modern warehouse-native tools.",
          likes: 2,
          likedByUser: false
        }
      ]
    }
  ]);

  const [newCommentText, setNewCommentText] = useState("");
  const [replyInputs, setReplyInputs] = useState({});

  const handlePostComment = (e) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment = {
      id: `comment-${Date.now()}`,
      authorName: "Guest User",
      authorInitials: "GU",
      role: "Reader",
      time: "Just now",
      text: newCommentText,
      likes: 0,
      likedByUser: false,
      replies: []
    };

    setComments((prev) => [newComment, ...prev]);
    setNewCommentText("");
  };

  const handleLikeComment = (commentId, replyId = null) => {
    setComments((prevComments) =>
      prevComments.map((c) => {
        if (replyId) {
          // If we are liking a reply
          if (c.id === commentId) {
            return {
              ...c,
              replies: c.replies.map((r) => {
                if (r.id === replyId) {
                  return {
                    ...r,
                    likes: r.likedByUser ? r.likes - 1 : r.likes + 1,
                    likedByUser: !r.likedByUser
                  };
                }
                return r;
              })
            };
          }
        } else {
          // If we are liking a top-level comment
          if (c.id === commentId) {
            return {
              ...c,
              likes: c.likedByUser ? c.likes - 1 : c.likes + 1,
              likedByUser: !c.likedByUser
            };
          }
        }
        return c;
      })
    );
  };

  const handleToggleReplyInput = (commentId) => {
    setReplyInputs((prev) => ({
      ...prev,
      [commentId]: prev[commentId] !== undefined ? undefined : ""
    }));
  };

  const handlePostReply = (commentId) => {
    const text = replyInputs[commentId];
    if (!text || !text.trim()) return;

    const newReply = {
      id: `reply-${Date.now()}`,
      authorName: "Guest User",
      authorInitials: "GU",
      role: "Reader",
      time: "Just now",
      text: text,
      likes: 0,
      likedByUser: false
    };

    setComments((prevComments) =>
      prevComments.map((c) => {
        if (c.id === commentId) {
          return {
            ...c,
            replies: [...c.replies, newReply]
          };
        }
        return c;
      })
    );

    setReplyInputs((prev) => ({
      ...prev,
      [commentId]: undefined
    }));
  };

  // Count total comments including replies
  const totalComments = comments.reduce((acc, c) => acc + 1 + c.replies.length, 0);

  return (
    <section className="mt-stack-lg border-t border-outline-variant/30 py-stack-lg max-w-[720px] text-left">
      <h3 className="font-headline-md text-headline-md text-primary mb-gutter font-bold">
        Comments ({totalComments})
      </h3>

      {/* Main Comment Entry Form */}
      <form onSubmit={handlePostComment} className="bg-surface-container-lowest p-stack-sm rounded-xl border border-outline-variant/20 mb-stack-lg flex flex-col gap-4">
        <textarea
          value={newCommentText}
          onChange={(e) => setNewCommentText(e.target.value)}
          placeholder="Write a comment..."
          className="w-full bg-transparent border-none outline-none focus:ring-0 text-body-md min-h-[100px] resize-none text-primary placeholder:text-on-surface-variant/40"
          aria-label="Write your comment"
        />
        <div className="flex justify-end border-t border-outline-variant/10 pt-3">
          <Button type="submit" variant="primary" size="sm" className="bg-primary text-white hover:bg-action-orange transition-colors">
            Post Comment
          </Button>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-stack-md">
        {comments.map((comment) => (
          <div key={comment.id} className="border-b border-outline-variant/15 pb-6 last:border-b-0">
            {/* Top-Level Comment */}
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center font-bold text-primary flex-shrink-0 select-none">
                {comment.authorInitials}
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-primary">{comment.authorName}</span>
                  <span className="text-label-sm text-on-surface-variant">{comment.time}</span>
                </div>
                <p className="text-body-md text-on-surface-variant leading-relaxed font-light">{comment.text}</p>
                <div className="flex gap-4 mt-2 items-center">
                  <Button
                    variant="text"
                    onClick={() => handleLikeComment(comment.id)}
                    className={`flex items-center gap-1 font-label-md text-label-md hover:text-action-orange p-1 ${
                      comment.likedByUser ? "text-action-orange" : "text-on-surface-variant"
                    }`}
                    ariaLabel={`Like comment by ${comment.authorName}`}
                  >
                    <span 
                      className="material-symbols-outlined text-[18px]"
                      style={{ fontVariationSettings: comment.likedByUser ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      thumb_up
                    </span>
                    <span>{comment.likes > 0 ? comment.likes : ""} Like</span>
                  </Button>
                  <Button
                    variant="text"
                    onClick={() => handleToggleReplyInput(comment.id)}
                    className="text-action-orange font-label-md text-label-md hover:underline p-1"
                  >
                    Reply
                  </Button>
                </div>

                {/* Inline Reply Form */}
                {replyInputs[comment.id] !== undefined && (
                  <div className="mt-4 flex gap-3 items-start pl-2 border-l-2 border-action-orange/20">
                    <Input
                      placeholder="Write a reply..."
                      value={replyInputs[comment.id]}
                      onChange={(e) =>
                        setReplyInputs((prev) => ({
                          ...prev,
                          [comment.id]: e.target.value
                        }))
                      }
                      className="py-1.5"
                    />
                    <Button
                      onClick={() => handlePostReply(comment.id)}
                      variant="primary"
                      size="sm"
                      className="py-2"
                    >
                      Reply
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Replies Thread */}
            {comment.replies.length > 0 && (
              <div className="space-y-4 mt-4 ml-12 border-l-2 border-outline-variant/15 pl-4">
                {comment.replies.map((reply) => (
                  <div key={reply.id} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center font-bold text-primary text-sm flex-shrink-0 select-none">
                      {reply.authorInitials}
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-primary">
                          {reply.name || reply.authorName}
                          {reply.isAuthor && (
                            <span className="bg-primary text-white text-[10px] px-1.5 py-0.5 rounded ml-1 font-normal font-sans tracking-wide">
                              Author
                            </span>
                          )}
                        </span>
                        <span className="text-label-sm text-on-surface-variant">{reply.time}</span>
                      </div>
                      <p className="text-body-md text-on-surface-variant leading-relaxed font-light">{reply.text}</p>
                      <div className="flex gap-4 mt-2">
                        <Button
                          variant="text"
                          onClick={() => handleLikeComment(comment.id, reply.id)}
                          className={`flex items-center gap-1 font-label-md text-label-md hover:text-action-orange p-1 ${
                            reply.likedByUser ? "text-action-orange" : "text-on-surface-variant"
                          }`}
                          ariaLabel={`Like reply by ${reply.name || reply.authorName}`}
                        >
                          <span 
                            className="material-symbols-outlined text-[16px]"
                            style={{ fontVariationSettings: reply.likedByUser ? "'FILL' 1" : "'FILL' 0" }}
                          >
                            thumb_up
                          </span>
                          <span>{reply.likes > 0 ? reply.likes : ""} Like</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
